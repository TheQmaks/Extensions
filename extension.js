function process() {
	document.querySelectorAll(".product-card__main:not(.processed)").forEach(item => {
		let id = item.parentNode.parentNode.getAttribute("data-popup-nm-id");
		let part = id.slice(0, -6);

		let request = new XMLHttpRequest();
		request.open('GET', `https://wbxcatalog-eu.wildberries.ru/part/${part}/catalog?locale=il&product=${id}&regions=1,4,30,38,40,48,65,68,69,78&stores=507,117501`);
		request.onload = function () {
			if (!item.classList.contains("processed") && request.status == 200 && request.response.includes("stocks\":[{")) {
				let div = document.createElement("div");
				div.className = "product-card__action";

				let il = document.createElement("a");

				il.target = "_blank";
				il.href = "https://wildberries.co.il/product?card=" + id;
				il.className = "spec-action";
				il.style.background = "linear-gradient(90deg,#9da3e6 0,#eaeaea 95.32%)";
				il.style.zIndex = Number.MAX_SAFE_INTEGER;
				il.innerHTML = "ISRAEL";

				item.appendChild(div).appendChild(il);
			}
			item.classList.add("processed");
		}
		request.send();
	});
}

setInterval(process, 5000);
