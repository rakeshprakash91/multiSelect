var selectedVal = [];

//initialization
(function () {

	var selectElement = document.querySelectorAll('.multiDropDown');
	for (var i = 0; i < selectElement.length; i++) {

		//create top ul li
		var ul = document.createElement("ul");
		ul.setAttribute('class', 'multiDropDownSelect');
		var li = document.createElement('li');
		li.innerHTML = "Select"
		ul.appendChild(li);

		selectElement[i].parentElement.insertBefore(ul, selectElement[i]);


		var caretElem = document.createElement('span');
		caretElem.setAttribute('class', 'multicaret');
		ul.setAttribute('index', i);
		selectedVal[i] = {};
		ul.parentElement.insertBefore(caretElem, ul);
		ul.addEventListener('click', showHideOptions);

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
		elm.parentElement.previousElementSibling.children[0].innerHTML = html.replace(/,\s*$/, "");
	} else {
		elm.parentElement.previousElementSibling.children[0].innerHTML = "Select";
	}
}
