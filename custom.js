var selectedVal = {};

function showHideOptions() {
	if (window.getComputedStyle(document.querySelectorAll('.multiDropDown')[0]).display == "none") {
		document.querySelectorAll('.multiDropDown')[0].style.display = "block";
	} else {
		document.querySelectorAll('.multiDropDown')[0].style.display = "none";
	}
}


(function () {
	var selectElement = document.querySelectorAll('.multiDropDownSelect');
	var caretElem = document.createElement('span');
	caretElem.setAttribute('class', 'multicaret');
	for (var i = 0; i < selectElement.length; i++) {
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
	updateSelectedValues(lbl, this);
}

function updateSelectedValues(val, elm) {
	var html = "";
	if (selectedVal["" + val]) {
		delete selectedVal["" + val];
		elm.className = "unchecked";
	} else {
		selectedVal["" + val] = val;
		elm.className = "checked";
	}
	debugger
	if (Object.keys(selectedVal).length) {
		for (key in selectedVal) {
			html += key + ",";
		}
		elm.parentElement.previousElementSibling.children[0].innerHTML = html.replace(/,\s*$/, "");
	} else {
		elm.parentElement.previousElementSibling.children[0].innerHTML = "Select";
	}
}
