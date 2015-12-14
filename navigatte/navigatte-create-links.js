//Anonymous object to execute task for new link creation
(new function() {

	var onCreationLink = null;

	Navigatte.Nodes.on("output_click", function(d) {
		onCreationLink = { source_id: d.node_id }				
	});

	Navigatte.Nodes.on("input_click", function(d) {
		if(onCreationLink == undefined)
			return;

		if(onCreationLink.source_id == d.node_id) {
			onCreationLink = null;	
			return;
		}

		onCreationLink.target_id = d.node_id; 

		Navigatte.Links.Create(onCreationLink);
		Navigatte.Links.Refresh();					
	});

	Navigatte.Container.on("click", function() {
		onCreationLink = null;	
	});
});


