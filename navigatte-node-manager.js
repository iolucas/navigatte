var NodeManager = new function() {

	var nodeCreatedId = 1;

	this.Create = function(nodeAttr) {

		//Create new node object
		var newNode = {
			newNode: 1,	//flag to signalize a new node
			name: nodeAttr.name,
			x: nodeAttr.x,
			y: nodeAttr.y,
			bgcolor: nodeAttr.bgcolor,
			fgcolor: nodeAttr.fgcolor,
			id: "created" + nodeCreatedId
		}

		//Increase the index for created nodes
		nodeCreatedId++

		//Push the node to the user nodes
		userNodes.push(newNode);

		return newNode;
	}


	this.Delete = function(nodeData) {

		var nodeIndex = userNodes.indexOf(nodeData);

		if(nodeIndex == -1)
			return false;
						
		//Delete the node data from the user nodes array
		userNodes.splice(nodeIndex, 1);

		return true;
	}

	this.Update = function(node, nodeAttr) {



	}

}





/*
function createNewNode(nodeAttr, nodesArray, ) {

	var newNode = {
		name:"Test Node",
		x: 500,
		y: 500,
		bgcolor:"#ccc",
		fgcolor:"#000000",
		id: "created" + createdId
	}

	createdId++;




}*/