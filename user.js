	const scraperObject = async (browser, url) => {
	let page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0); 
	console.log(`Navigating to ${url}...`);
	await page.goto(url);

	// Wait for the required DOM to be rendered;
	await page.waitForSelector('.AccountHeader--title');
	await page.waitForFunction(() => document.readyState === "complete");
	await page.waitForTimeout(3000);

	await page.evaluate(() => {

		// the data schemes
		const user = {
			"name":"",
			"username":"",
			"followers": "",
			"following": "",
			"bio":"",
			"banner_image":"",
			"profile_image":"",
			"facebook" : "",
			"instagram": "",
			"twitter": "",
			"invited_by": "",
			"collections": "",
			"created": "",
			"collected": "",
			"isVerified": false
			}
console.log(`I just love NFTs and that's the reason I joined this cool Marketplace. Looking forward to engaging with all of you guys. Cheers!`);
		    user.banner_image =  document.querySelector('.Image--image')[0]   && document.querySelector('.Image--image')[0].src
			user.profile_image = document.querySelectorAll('.Image--image')[1] && document.querySelectorAll('.Image--image')[1].src
			user.name =          document.querySelector('.AccountHeader--title')         && document.querySelector('.AccountHeader--title')                      .textContent.trim()
			user.username =      document.querySelector('.AccountHeader--title')    && "@" + document.querySelector('.AccountHeader--title').textContent.trim()
			user.bio =           `I just love NFTs and that's the reason I joined this cool Marketplace. Looking forward to engaging with all of you guys. Cheers!`
			user.instagram =     document.querySelectorAll('.AccountLinksBar--icon-button')[1]     && document.querySelectorAll('.AccountLinksBar--icon-button')[1].href
			user.twitter =       document.querySelectorAll('.AccountLinksBar--icon-button')[2]   && document.querySelectorAll('.AccountLinksBar--icon-button')[2].href
			// user.followers =     document.querySelectorAll('.hBkTwE')[1]  && document.querySelectorAll('.hBkTwE')[1]               .textContent.trim()
			// if (user.followers.includes("K")) {
			// 	user.followers = user.followers.split("K")[0] + "000"
			// }
			// user.following =     document.querySelectorAll('.hBkTwE')[2]  && document.querySelectorAll('.hBkTwE')[2]           .textContent.trim()
			// user.isVerified = document.querySelector(".bi-patch-check-fill") ? true : false
			// document.querySelectorAll(".dfRghT").forEach((li)=>{
			// 	if (li.textContent.trim().includes("Created")) {
			// 		user.created = li.textContent.split("Created")[1].trim() * 1
			// 		if (!user.created) {
			// 			user.created = ""
			// 		}
			// 	}
			// })

			for (const i in user) {
				console.log( i, user[i])
			}

	//    fetch("https://wazirnft.herokuapp.com/users",
	// 		{
	// 			headers: {
	// 			  'Accept': 'application/json',
	// 			  'Content-Type': 'application/json'
	// 			},
	// 			method: "POST",
	// 			body: JSON.stringify(user)
	// 		})
	// 		.then(response => response.json())
	// 		.then(data => console.log(data.message))
	// 		.catch(function (err){ console.log(err) })
	  });
	//   await page.close()
}

module.exports = scraperObject;