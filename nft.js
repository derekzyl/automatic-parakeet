async function nftLoader (page) {

	await page.evaluate(() => {

		// the data schemes
	const nft =	{
			"name": "",
			"nft_image":"",
			"isImage": false,
			"price_in_USD": "",
			"price_in_BNB": "",
			"collection_name": "",
			"nft_name":"",
			"owner": "",
			"owner_image":"",
			"creator_image":"",
			"creator":"",
			"isCollected": false,
			 "isCreated": true,
			 "isBid": false,
			 "ipfs":"",
			"bsScan":"",
			"description": "",
			   "history": [
				   {
					   "minted": null,
					   "transferred": [],
						 "listed": []
				   }
			   ]
			}

			const trooping = function (img, date, name, price) {
				return {
					"history_image": img,
					"date": date,
					"price_in_BNB": price ? price : "",
					"price_in_USD": "",
				   "username": name
				}
			}
			
      nft.collection_name = document.querySelector(".bid-token__details--title-2") && document.querySelector(".bid-token__details--title-2").innerText;
      nft.name =  document.querySelector(".bid-token__details--title") && document.querySelector(".bid-token__details--title").innerText;
	  nft.nft_name =  document.querySelector(".bid-token__details--title") && document.querySelector(".bid-token__details--title").innerText;
	  nft.price_in_BNB = document.querySelector(".koAsrp") && document.querySelector(".koAsrp").innerText.split(" ")[0] * 1
      nft.nft_image = document.querySelector(".bid-token__asset-wrapper--asset-fit") && document.querySelector(".bid-token__asset-wrapper--asset-fit").src
	  nft.creator = document.querySelectorAll(".avatar__info--title-wrapper")[0] && document.querySelector(".avatar__info--title-wrapper").innerText
	  nft.owner = document.querySelectorAll(".avatar__info--title-wrapper")[1] && document.querySelectorAll(".avatar__info--title-wrapper")[1].innerText
	  nft.description = document.querySelector(".short-text").innerText && document.querySelector(".short-text").innerText
	  nft.creator_image = document.querySelectorAll(".avatar__img")[0] && document.querySelectorAll(".avatar__img")[0].src
	  nft.owner_image = document.querySelectorAll(".avatar__img")[1] && document.querySelectorAll(".avatar__img")[1].src
	  nft.isBid = document.querySelector(".cdtNHw span") && document.querySelector(".cdtNHw span").innerText.includes("bid")
	  nft.ipfs = "https://ipfs.io"
	  const p = window.location.href
	  nft.bsScan = ("https://bscscan.com/token/" + p.split("/")[4] + "?a=" + p.split("/")[5]);
	  if (document.querySelector(".bid-token__asset-wrapper--asset-fit")) {
		 nft.isImage = document.querySelector(".bid-token__asset-wrapper--asset-fit").tagName = "IMG" ? true : false;
		 nft.isImage =  document.querySelector(".asset-video-wrapper")   ? false : true
	 } 

document.querySelectorAll(".token-list-item").forEach(el => {
const img =		el.children[0].children[0] && el.children[0].children[0].src
const price  =  el.children[1].children[0] && el.children[1].children[0].innerText.split(" ")[0] * 1
const name = el.children[0].children[1].children[0].children[0].children[0] && el.children[0].children[1].children[0].children[0].children[0].innerText
const transferred = el.children[0].children[1].children[0].children[0] && el.children[0].children[1].children[0].children[0].innerText.includes("ran")
const minted = el.children[0].children[1].children[0].children[0] && el.children[0].children[1].children[0].children[0].innerText.includes("int")
const listed = el.children[0].children[1].children[0].children[0] && el.children[0].children[1].children[0].children[0].innerText.includes("is")
const date = el.children[0].children[1].children[1] && el.children[0].children[1].children[1].innerText
 

if (minted) {
	nft.history[0].minted = trooping(img, date, name, price)
}
if (listed) {
		nft.history[0].listed.push( trooping(img, date, name, price))
}
if (transferred) {
	nft.history[0].transferred.push( trooping(img, date, name, price))
}
});



	  for (const i in nft) {
		console.log( i, nft[i])
	  }

	  fetch("https://wazirnft.herokuapp.com/nft",
	  {
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		  method: "POST",
		  body: JSON.stringify(nft)
	  })
	  .then(response => response.json())
	  .then(data => console.log(data.message))
	  .catch(function(res){ console.log(res.message) })
	  });
};

module.exports = nftLoader