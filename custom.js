var selectedVal = [];

function showHideOptions() {
	if (window.getComputedStyle(this.nextElementSibling).display == "none") {
		this.nextElementSibling.style.display = "block";
	} else {
		this.nextElementSibling.style.display = "none";
	}
}


(function () {
	var selectElement = document.querySelectorAll('.multiDropDownSelect');
	for (var i = 0; i < selectElement.length; i++) {
		var caretElem = document.createElement('span');
		caretElem.setAttribute('class', 'multicaret');
		selectElement[i].setAttribute('index', i);
		selectedVal[i] = {};
		selectElement[i].parentElement.insertBefore(caretElem, selectElement[i]);
		selectElement[i].addEventListener('click', showHideOptions);

		var liArray = selectElement[i].nextElementSibling.children;
		for (var j = 0; j < liArray.length; j++) {
			liArray[j].className = "unchecked"
			liArray[j].addEventListener('click', processClick);
		}
	}
})();

function processClick() {
	var lbl = this.children[0].innerHTML;
	updateSelectedValues(lbl, this, Number(this.parentElement.previousElementSibling.getAttribute('index')));
}

function updateSelectedValues(val, elm, index) {
	var html = "";
	debugger
	if (selectedVal[index]["" + val]) {
		delete selectedVal[index]["" + val];
		elm.className = "unchecked";
	} else {
		selectedVal[index]["" + val] = val;
		elm.className = "checked";
	}
	if (Object.keys(selectedVal[index]).length) {
		for (key in selectedVal[index]) {
			html += key + ",";
		}
		elm.parentElement.previousElementSibling.children[0].innerHTML = html.replace(/,\s*$/, "");
	} else {
		elm.parentElement.previousElementSibling.children[0].innerHTML = "Select";
	}
}
