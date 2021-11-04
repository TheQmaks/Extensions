let catalogParams = "";
let request = new XMLHttpRequest();
request.open('GET', 'https://wbx-setup.wildberries.ru/api/v1/settings/locales/il');
request.onload = function() {
    catalogParams = JSON.parse(request.response).catalog_params;
}
request.send();

function process() {
    document.querySelectorAll(".product-card__main:not(.processed)").forEach(item => {
        let id = item.parentNode.parentNode.getAttribute("data-popup-nm-id");
        let part = id.slice(0, -6);

        let request = new XMLHttpRequest();
        request.open('GET', `https://wbxcatalog-eu.wildberries.ru/nm-2-card/catalog?lang=ru&locale=il&nm=${id}&${catalogParams}`);
        request.onload = function() {
            if (!item.classList.contains("processed") && request.status == 200 && request.response.includes("stocks\":[{")) {
                let div = document.createElement("div");
                div.className = "product-card__action";

                let il = document.createElement("a");

                il.target = "_blank";
                il.href = "https://wildberries.co.il/product?card=" + id;
                il.className = "spec-action";
                il.style.background = "linear-gradient(90deg,#9da3e6 0,#eaeaea 95.32%)";
                il.style.padding = "6px 12px";
                il.innerHTML = "ISRAEL";
                il.onclick = function(event) {
                    event.stopPropagation();
                };

                item.appendChild(div).appendChild(il);
            }
            item.classList.add("processed");
        }
        request.send();
    });
}

setInterval(process, 5000);
