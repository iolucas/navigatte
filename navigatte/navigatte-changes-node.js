//Module to compute node changes
Navigatte.Nodes.on("dragend", function(node) {

	//Push the change to the change manager
	Navigatte.Changes.Push(node.node_id, "update", { x: node.x, y: node.y });
});

Navigatte.Nodes.on("delete", function(node) {

	//Push the change to the change manager
	Navigatte.Changes.Push(node.node_id, "delete");
});

Navigatte.Nodes.on("create", function(node) {

	//Push the change to the change manager
	Navigatte.Changes.Push(node.node_id, "create", node);
});