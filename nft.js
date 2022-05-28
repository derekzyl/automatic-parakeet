async function nftLoader(page, url) {
  await page.evaluate(() => {
    // getting user details
    let owner = window.localStorage.getItem("owner");
    owner = owner.split("?")[0];
    const ownerImg = window.localStorage.getItem("ownerImg");

    let lor, log;
    let papa =
      document.querySelector(".item--collection-info") &&
      document.querySelector(".item--collection-info");

    lor = document.createElement("div");
    lor.className = "mycustomconsolelogpanel";
    lor.style.width = "100vw";
    lor.style.minHeight = "100vh";
    lor.style.position = "absolute";
    lor.style.padding = "20px";
    lor.style.zIndex = 1000000000000;
    lor.style.border = "2px red solid";
    lor.style.display = "flex";
    lor.style.backgroundColor = "black";
    lor.style.flexDirection = "column";
    papa && papa.appendChild(lor);

    log = (...logs) => {
      const papa = document.querySelector(".mycustomconsolelogpanel");
      const lor = document.createElement("p");
      lor.style.fontSize = "12px";
      lor.style.fontWeight = "600";
      lor.style.width = "100%";
      lor.style.margin = "0px";
      lor.style.height = "100%";
      lor.style.color = "white";
      const data = logs.join("-- ");
      lor.innerText = lor.innerText + data;
      papa && papa.appendChild(lor);
    };

    // the data schemes
    const nft = {
      name: "",
      nft_image: "",
      isImage: false,
      price_in_USD: "",
      price_in_BNB: "",
      collection_id: "",
      collection_name: "",
      nft_name: "",
      owner: "",
      owner_image: "",
      creator_image: "",
      creator: "",
      isCollected: true,
      isCreated: false,
      isBid: false,
      ipfs: "",
      bsScan: "",
      description: "",
      history: [
        {
          minted: null,
          transferred: [],
          listed: [],
        },
      ],
    };

    const trooping = function (img, date, name, price) {
      return {
        history_image: img,
        date: date,
        price_in_BNB: price ? price : "",
        price_in_USD: "",
        username: name,
      };
    };

    nft.collection_name =
      document.querySelector(".CollectionLink--link") &&
      document.querySelector(".CollectionLink--link").href.split("/")[2];
    nft.price_in_BNB =
      document.querySelector(".Price--amount") &&
      document.querySelector(".Price--amount").innerText.trim() * 1;

    nft.name = nft.nft_name =
      document.querySelector(".item--title") &&
      document.querySelector(".item--title").innerText;

    nft.nft_image =
      document.querySelector(".Image--image") &&
      document.querySelector(".Image--image").src;

    nft.creator = owner;

    nft.creator_image = nft.nft_image && nft.nft_image;
    nft.owner_image = ownerImg && ownerImg;
    nft.description = nft.nft_name && nft.nft_name;
    nft.owner = owner;
    nft.isBid = false;
    nft.isImage = true;
    nft.ipfs = "https://ipfs.io";
    const p = window.location.href;
    nft.bsScan =
      "https://bscscan.com/token/" + p.split("/")[4] + "?a=" + p.split("/")[5];
    const historyPack = document.querySelectorAll(".EventHistory--row") || [];

    historyPack.forEach((el) => {
      const img = ownerImg;
      const transferred =
        el.children[0].children[1] &&
        el.children[0].children[1].innerText.includes("ran");

      const price = 12.5;

      const name =
        el.children[3].children[0].children[0] &&
        el.children[3].children[0].children[0].innerText;

      const minted =
        el.children[0].children[1] &&
        el.children[0].children[1].innerText.includes("int");

      const listed =
        el.children[0].children[1] &&
        el.children[0].children[1].innerText.includes("is");
      const date = `${Math.round(Math.random() * 20)} May 2022 ${Math.round(
        Math.random() * 20
      )}:${Math.round(Math.random() * 20)}:${Math.round(
        Math.random() * 20
      )}  PM`;

      if (minted) {
        nft.history[0].minted = trooping(img, date, name, price);
      }
      if (listed) {
        nft.history[0].listed.push(trooping(img, date, name, price));
      }
      if (transferred) {
        nft.history[0].transferred.push(trooping(img, date, name, price));
      }
    });

    for (const i in nft) {
      if (Array.isArray(nft[i])) {
        log(JSON.stringify(nft[i]));
        continue;
      }
      if (log) {
        log(i, nft[i]);
      }
    }

    fetch("https://wazirnft.herokuapp.com/nft", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(nft),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch(function (res) {
        console.log(res.message);
      });
  });
}

module.exports = nftLoader;
