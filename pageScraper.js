const created = require("./created");
const collected = require("./collected.js");
const user = require("./user.js");
const collection = require("./collection.js");

const scraperObject = {
  async scraper(browser, url) {
    // console.log("creating user");
    // await user(browser, url);
    // console.log("done!!!!!!!");
    // console.log("creating collections");
    // await collection(browser, url + "/collections");
    // console.log("done!!!!!!!");
    console.log("creating creations");
    await created(browser, url + "/created?sort=created-desc");
    console.log("done!!!!!!!");
    console.log("creating collected nfts");
    await collected(browser, url + "/collected?sort=sold-desc");
    console.log("done!!!!!!!!");
    console.log("am done running good night");
  },
};

module.exports = scraperObject;
