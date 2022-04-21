// ==UserScript==
// @name         LCWaikiki CUCO
// @description  Automatic currency converter for LCWaikiki from turkish lira (TL) to new israeli shekel (ILS)
// @version      0.1
// @match        https://www.lcwaikiki.com/*
// @icon         https://www.lcwaikiki.com/Resource/Images/favicon.ico
// @connect      bankhapoalim.co.il
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var exchangeRate = 0;

GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.bankhapoalim.co.il/he/_foreign/chart/387",
    onload: function(response) {
        let json = JSON.parse(response.responseText);
        exchangeRate = json[0]["week"][json[1]];
    }
});

function process() {
    document.querySelectorAll("span[class*='price']").forEach(item => {
        let text = item.innerText;
        if(text.endsWith("TL")) {
            item.innerText = (Number((parseFloat(text.split(" ")[0]) * exchangeRate)).toFixed(1)) + "₪";
        }
    });
}

setInterval(process, 5000);
