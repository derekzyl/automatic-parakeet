const nftLoader = require("./cnft.js");

const scraperObject = async (browser, url) => {
  let page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  console.log(`Navigating to ${url}...`);
  await page.goto(url);
  // Wait for the required DOM to be rendered
  await page.waitForSelector(".Asset--anchor");
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(1000);

  // getting and saving owner details before the next page
  await page.evaluate(() => {
    window.localStorage.setItem(
      "ownerImg",
      document.querySelector("[imagevariant=profile]").src
    );
    window.localStorage.setItem("owner", window.location.href.split("/")[3]);
  });

  let links = [];

  async function scrollToBottom() {
    await new Promise((resolve) => {
      let distance = window.localStorage.getItem("distance");
      if (distance) {
        distance *= 1;
        window.localStorage.setItem("distance", distance + 200);
      } else {
        distance = 200;
        window.localStorage.setItem("distance", distance);
      }
      const delay = 400;
      const timer = setInterval(() => {
        document.scrollingElement.scrollBy(0, distance);
        clearInterval(timer);
        resolve();
      }, delay);
    });
  }

  for (let nextMove = 0; nextMove < 80; nextMove++) {
    await page.evaluate(scrollToBottom);
    await page.waitForTimeout(2000);
    let elements = await page.$$(".Asset--anchor");
    links = [
      ...links,
      ...elements.map(async (el) => await page.evaluate((el) => el.href, el)),
    ];

    for (let j = 0; j < links.length; j++) {
      links[j] = await links[j];
    }
    links = Array.from(new Set(links));
  }

  links = Array.from(new Set(links));
  console.log(links.length);
  for (let i = 0; i < links.length; i++) {
    const nft = await links[i];
    let nftPage = await browser.newPage();
    await nftPage.setDefaultNavigationTimeout(0);
    await nftPage.goto(nft);
    await nftPage.waitForFunction(() => document.readyState === "complete");
    await page.waitForTimeout(3000);
    await nftPage.evaluate(scrollToBottom);
    await nftPage.waitForSelector(".Price--amount");
    await nftLoader(nftPage, url);
  }
};

module.exports = scraperObject;
