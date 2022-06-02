const pageScraper = require("./pageScraper.js");

async function scrapeAll(browserInstance, url) {
  try {
    const browser = await browserInstance;
    		await pageScraper.scraper(browser, url);
//    console.log(browser);
    return;
    // await browser.close()
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = scrapeAll;
