const scraperObject = async (browser, url) => {
	
	let page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0); 
	console.log(`Navigating to ${url}...`);
	await page.goto(url);

	// Wait for the required DOM to be rendered;

	await page.waitForSelector(".Image--image");
	await page.waitForFunction(() => document.readyState === "complete");
	await page.waitForTimeout(3000);
    
	await page.evaluate(() => {
    const papa = document.querySelector(".Image--isImageLoaded")
    const lor = document.createElement("div")
	document.querySelector(".iuByzZ").style.opacity = 0
    lor.className = "mycustomconsolelogpanel"
    lor.style.width = "100vw"
    lor.style.position = "absolute"
	lor.style.padding = "20px 5%"
	lor.style.zIndex = 1000000000000
	lor.style.border = "5px aqua solid"
    lor.style.display = "flex"
    lor.style.flexDirection = "column"
    papa.appendChild(lor)
	lor.parentElement.style.position = "fixed"

    const log = (...logs) =>{

	const papa = document.querySelector(".mycustomconsolelogpanel")
	const lor = document.createElement("p")
	lor.style.fontSize = "12px"
	lor.style.fontWeight = "600"
	lor.style.width = "100%"
	lor.style.margin = "0px"
	lor.style.height = "100%"
	const data = logs.join("-- ")
	lor.innerText = lor.innerText + data; 
    papa.appendChild(lor)

   }
	
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

try {

	user.banner_image =  document.querySelectorAll(".Image--image")[0]  && document.querySelectorAll(".Image--image")[0].src
	user.profile_image = document.querySelector(".fAiLaI") && document.querySelector(".fAiLaI").src
	user.name =          document.querySelector(".fvfbGH") && document.querySelector(".fvfbGH").textContent.trim()
	user.username =      user.name && "@" + user.name
	user.bio = `  `

	// user.instagram = document.querySelector(".Listreact__FramedList-sc-6eey6c-1").children[1]  &&  document.querySelector(".Listreact__FramedList-sc-6eey6c-1").children[1].href
	// user.twitter =   document.querySelector(".Listreact__FramedList-sc-6eey6c-1").children[2] &&  document.querySelector(".Listreact__FramedList-sc-6eey6c-1").children[2].href
	user.followers =   Math.round(Math.random() * 89350)
	user.following = Math.round(Math.random() * 21150)
	
	user.isVerified = document.querySelector(".cnnZcH") ? true : false
	user.created = document.querySelectorAll(".jryXGg")[1].textContent.trim()
// log(...document.querySelectorAll(".jryXGg"))
	if (user.created.includes("K")) {
				user.created = user.created.split("K")[0].trim() * 1
	}

	user.collected = document.querySelectorAll(".jryXGg")[2].textContent.trim()
	if (user.collected.includes("K")) {
				user.collected = user.collected.split("K")[1].trim() * 1
	}
} catch (err) {
	log(err);
}

			for (const i in user) {
			log( i, user[i])
			}

    	//    fetch("https://wazirnft.herokuapp.com/users",
		// 	{
		// 		headers: {
		// 		  'Accept': 'application/json',
		// 		  'Content-Type': 'application/json'
		// 		},
		// 		method: "POST",
		// 		body: JSON.stringify(user)
		// 	})
		// 	.then(response => response.json())
		// 	.then(data => console.log(data.message))
		// 	.catch(function (err){ console.log(err) })
	  });
	//   await page.close()
}

module.exports = scraperObject;