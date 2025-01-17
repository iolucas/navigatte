//Module to handle and compute nodes creation, deletation and update

Navigatte.NodeManager = new function() {

	var nodeCreatedId = 1;

	this.Create = function(nodeAttr) {

		//Create new node object
		var newNode = {
			name: nodeAttr.name,
			x: nodeAttr.x,
			y: nodeAttr.y,
			bgcolor: nodeAttr.bgcolor,
			fgcolor: nodeAttr.fgcolor,
			node_id: "new" + nodeCreatedId
		}

		Navigatte.ChangeManager.Push(newNode.node_id, "create", newNode);

		//Increase the index for created nodes
		nodeCreatedId++

		//Push the node to the user nodes
		userNodes.push(newNode);

		return newNode;
	}


	this.Delete = function(nodeData) {

		var nodeIndex = Navigatte.nodes.indexOf(nodeData);

		if(nodeIndex == -1)
			return false;

		Navigatte.ChangeManager.Push(nodeData.node_id, "delete");
						
		//Delete the node data from the user nodes array
		Navigatte.nodes.splice(nodeIndex, 1);

		return true;
	}

	this.Update = function(nodeData, nodeAttr) {
		//Pass the changes to the target node
		for(prop in nodeAttr)
			if(nodeData[prop] != undefined)
				nodeData[prop] = nodeAttr[prop];

		//Push the change to the change manager
		Navigatte.ChangeManager.Push(nodeData.node_id, "update", nodeAttr);
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