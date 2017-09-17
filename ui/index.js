function searchQuery() {
	var textInput, filter;
	textInput = document.getElementById('textInput');
	filter = textInput.value.toUpperCase();
	var nodes = document.getElementsByClassName("outlet-card");

	for (i = 0; i < nodes.length; i++) {
		var node = nodes[i].getElementsByClassName("title");
		if (node[0].innerHTML.toUpperCase().indexOf(filter) > -1) {
			show(nodes[i]);
		} else {
			hide(nodes[i]);
		}
	}
}

function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}

function show (elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || 'block';
  }
}