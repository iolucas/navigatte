function initApp() {

	//Init the nodes container appended to the general content section
	initNodesContainer("#general-content");

	//Load the nodes DOM objects based on the user nodes array
	refreshNodes(userNodes, "user-nodes");

}