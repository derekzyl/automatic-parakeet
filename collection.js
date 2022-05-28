const collectionLoader = require("./collectionLoader.js")

const scraperObject = async (browser, url) => {
	let page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0); 
	console.log(`Navigating to ${url}...`);
	await page.goto(url);
	await page.waitForSelector('.gwSdeh')
	await page.waitForFunction(() => document.readyState === "complete");
	async function scrollToBottom() {
		await new Promise(resolve => {
		  const distance = 100; // should be less than or equal to window.innerHeight
		  const delay = 100;
		  const timer = setInterval(() => {
			document.scrollingElement.scrollBy(0, distance);
			if (document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight) {
			  clearInterval(timer);
			  resolve();
			}
		  }, delay);
		});
	  }
	await page.evaluate(scrollToBottom);

	let elements = await page.$$('.ckgUnd a')
	let links = elements.map(async (el)=> await page.evaluate(el => el.href, el))
	for (let i = 0; i < links.length; i++) {
		const nft = links[i];
		let nftPage = await browser.newPage();
		await nftPage.goto( await nft);	
		await page.waitForTimeout(3000);
		await nftPage.waitForFunction(() => document.readyState === "complete");
		await collectionLoader(nftPage);
		// await nftPage.close()
	}
	// await page.close()
}

module.exports = scraperObject;