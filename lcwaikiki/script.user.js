// ==UserScript==
// @name         LCWaikiki CUCO
// @description  Automatic currency converter for LCWaikiki from turkish lira (TL) to new israeli shekel (ILS)
// @version      0.2
// @match        https://www.lcwaikiki.com/*
// @icon         https://www.lcwaikiki.com/Resource/Images/favicon.ico
// @connect      bankhapoalim.co.il
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var exchangeRateTL = 0;
var exchangeRateUSD = 0;

GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.bankhapoalim.co.il/he/_foreign/chart/387",
    onload: function(response) {
        let json = JSON.parse(response.responseText);
        exchangeRateTL = json[0]["week"][json[1]];
    }
});
GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.bankhapoalim.co.il/he/_foreign/chart/19",
    onload: function(response) {
        let json = JSON.parse(response.responseText);
        exchangeRateUSD = json[0]["week"][json[1]];
    }
});

function process() {
    document.querySelectorAll("span[class*='price-regular'], div[class*='basket-discount']").forEach(element => {
        let text = element.innerText;
        if(text.endsWith("TL")) {
            let priceILS = parseFloat(text.split(" ")[0]) * exchangeRateTL;
            element.innerText = Number(priceILS / exchangeRateUSD).toFixed(1) + "$ (" + Number(priceILS).toFixed(1) + "₪)";
        }
    });
}

setInterval(process, 5000);
