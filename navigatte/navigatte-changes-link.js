//Module to compute link changes

Navigatte.Links.on("delete", function(link) {

	//Push the change to the change manager
	//Navigatte.Changes.Push(node.node_id, "delete");
	Navigatte.Changes.Add({ 
		id: link.source_id + link.target_id,
		element: "link", 
		action: "delete",
		source_id: link.source_id,
		target_id: link.target_id
	});
});

Navigatte.Links.on("create", function(link) {

	//Push the change to the change manager
	//Navigatte.Changes.Push(node.node_id, "create", node);

	Navigatte.Changes.Add({ 
		id: link.source_id + link.target_id,
		element: "link", 
		action: "create",
		source_id: link.source_id,
		target_id: link.target_id
	});
});