var selectedVal = [];

//initialization
(function () {

	var selectElement = document.querySelectorAll('.multiDropDown');
	for (var i = 0; i < selectElement.length; i++) {

		//create top text field
		var txtField = document.createElement("input");
		txtField.setAttribute("type", "text");
		txtField.setAttribute('class', 'multiDropDownSelect');
		txtField.setAttribute("readonly", "readonly");
		txtField.setAttribute("value", "Select");
		selectElement[i].parentElement.insertBefore(txtField, selectElement[i]);

		//dropdown arrow creation
		var caretElem = document.createElement('span');
		caretElem.setAttribute('class', 'multicaret');
		txtField.setAttribute('index', i);
		selectedVal[i] = {};
		txtField.parentElement.insertBefore(caretElem, txtField);
		txtField.addEventListener('click', showHideOptions);

		var liArray = selectElement[i].children;
		for (var j = 0; j < liArray.length; j++) {
			liArray[j].className = "unchecked"
			liArray[j].addEventListener('click', processClick);
		}
	}
})();

function showHideOptions() {
	if (window.getComputedStyle(this.nextElementSibling).display == "none") {
		this.nextElementSibling.style.display = "block";
	} else {
		this.nextElementSibling.style.display = "none";
	}
}

function processClick() {
	var lbl = this.children[0].innerHTML;
	updateSelectedValues(lbl, this, Number(this.parentElement.previousElementSibling.getAttribute('index')));
}

function updateSelectedValues(val, elm, index) {
	var html = "";
	if (selectedVal[index]["" + val]) {
		delete selectedVal[index]["" + val];
		elm.className = "unchecked";
	} else {
		selectedVal[index]["" + val] = val;
		elm.className = "checked";
	}
	if (Object.keys(selectedVal[index]).length) {
		for (key in selectedVal[index]) {
			html += key + ", ";
		}
		elm.parentElement.previousElementSibling.value = html.replace(/,\s*$/, "");
	} else {
		elm.parentElement.previousElementSibling.value = "Select";
	}
}
