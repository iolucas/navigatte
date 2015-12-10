function initApp() {

	//Init the nodes container appended to the general content section
	initNodesContainer("#general-content");

	//Load the user nodes on the nodes container
	var uNodes = loadNodesAndLinks(userNodes, userLinks, "user-nodes");

	//Append to the nodes modal windows to display nodes content 
	appendContentModal(uNodes);



}

function createNewNode() {

	var pseudoNode = {
		containerWidth: 300,
		containerHeight: 50,
		x:0,
		y:180,
		bgcolor: "lightblue"
	}

	GOT TO FIX BUG IN CASE WE MOVE THE NODES CONTAINER, THE NEW NODE MODAL ARE AFFECTED TOO

	openNodeModal(pseudoNode, [500,500], function(nodeModal) {

		nodeModal.datum().x = 500;
		nodeModal.datum().y = 500;
	});


}