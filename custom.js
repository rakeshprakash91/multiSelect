$(function () {
	var selectedVal = {};
	$('.multiDropDownSelect, .multicaret').on('click', function () {
		$('.multiDropDown').toggle('fast');
	})
	$('.multiDropDown li, input[type=checkbox]').on('click', function (e) {
		var lbl = $(this).find("label").text() || $(this).siblings("label").text();
		//stop duplicate trigger
		e.stopImmediatePropagation();
		//get the current checkbox
		var currCB = $(this).find('input[type=checkbox]');
		//toggle the checkbox tick
		if (currCB.is(":checked")) {
			currCB.prop('checked', false);
		} else {
			currCB.prop('checked', true);
		}
		updateSelectedValues(lbl);
	});

	function updateSelectedValues(val) {
		var html = "";
		if (selectedVal["" + val]) {
			delete selectedVal["" + val];
		} else {
			selectedVal["" + val] = val;
		}
		if (Object.keys(selectedVal).length) {
			for (key in selectedVal) {
				html += key + ",";
			}
			$('.multiDropDownSelect li').text(html.replace(/,\s*$/, ""));
		} else {
			$('.multiDropDownSelect li').text("Select");
		}
	}
});
