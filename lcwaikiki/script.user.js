// ==UserScript==
// @name         LCWaikiki CUCO
// @description  Automatic currency converter for LCWaikiki from turkish lira (TL) to new israeli shekel (ILS)
// @version      0.3
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

var selectors = [
    "span[class*='product-price__price']:not(.processed)",
    "span[class='price-regular']",
    "span[class='price']",
    "div[class='basket-discount']",
    "span[class='cart-info--total']",
    "span[class='cart-item__details__info']>p:nth-child(3):not(.processed)",
    "span[class='cart-old-price']",
    "span[class*='rd-cart-item-price']:not(.processed)",
    "span[class='pull-right']"
];

function process() {
    selectors.map(selector => {
        document.querySelectorAll(selector).forEach(element => {
            let matches = element.innerText.match(/[+-]?\d+(\.\d+)?/g);
            if(matches && matches[0]) {
                let priceILS = parseFloat(matches[0]) * exchangeRateTL;
                element.innerText = Number(priceILS / exchangeRateUSD).toFixed(1) + "$ (" + Number(priceILS).toFixed(1) + "₪)";
                element.classList.add("processed");
            }
        });
    });
}

setInterval(process, 5000);
