// ==UserScript==
// @name         Wildberries IL
// @version 0.1
// @namespace    https://github.com/TheQmaks
// @description  Wildberries RU to Israel product availability checker
// @author       AnatoliyFeed
// @match        https://www.wildberries.ru/*
// @icon         https://www.wildberries.ru/favicon.ico
// ==/UserScript==

(function() {
    function process() {
        document.querySelectorAll(".block-dop-info:not(.processed)").forEach(item => {
            let id = item.parentNode.parentNode.getAttribute("data-popup-nm-id");
            let part = id.slice(0, -6);

            let request = new XMLHttpRequest();
            request.open('GET', `https://wbxcatalog-eu.wildberries.ru/part/${part}/catalog?locale=il&product=${id}&regions=1,4,30,38,40,48,65,68,69,78&stores=507,117501`);
            request.onload = function() {
                if (!item.classList.contains("processed") && request.status == 200 && request.response.includes("stocks\":[{")) {
                    let il = document.createElement("a");

                    il.target = "_blank";
                    il.href = "https://wildberries.co.il/product?card=" + id;
                    il.className = "spec-actions-catalog i-spec-action";
                    il.style.background = "linear-gradient(90deg,#9da3e6 0,#eaeaea 95.32%)";
                    il.innerHTML = "ISRAEL";

                    item.appendChild(il);
                }
                item.classList.add("processed");
            }
            request.send();
        });
    }

    setInterval(process, 5000);
})();
