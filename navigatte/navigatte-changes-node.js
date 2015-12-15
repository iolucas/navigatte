//Module to compute node changes
Navigatte.Nodes.on("dragend", function(node) {

	//Push the change to the change manager
	//Navigatte.Changes.Push(node.node_id, "update", { x: node.x, y: node.y });
	Navigatte.Changes.Add({ id: node.node_id, element: "node", action: "update", x: node.x, y: node.y });
});

Navigatte.Nodes.on("delete", function(node) {

	//Push the change to the change manager
	//Navigatte.Changes.Push(node.node_id, "delete");
	Navigatte.Changes.Add({ id: node.node_id, element: "node", action: "delete" });
});

Navigatte.Nodes.on("create", function(node) {

	//Push the change to the change manager
	//Navigatte.Changes.Push(node.node_id, "create", node);
	Navigatte.Changes.Add({ 
		id: node.node_id, 
		action: "create",
		element: "node", 
		x: node.x, 
		y: node.y,
		bgcolor: node.bgcolor,
		fgcolor: node.fgcolor
	});
});