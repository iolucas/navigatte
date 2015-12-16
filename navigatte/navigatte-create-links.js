//Anonymous object to execute task and set eventsfor new link creation
(new function() {

	var onCreationLink = {};

	Navigatte.Nodes.on("output_click", function(d) {

		//If there is no target id, just crate the source id
		if(onCreationLink.target_id == undefined) {
			onCreationLink.source_id = d.node_id;
		
		//If the existing target id is different from the new target
		} else if(onCreationLink.target_id != d.node_id) {
			onCreationLink.source_id = d.node_id;
			Navigatte.Links.Create(onCreationLink);
			Navigatte.Links.Refresh();
			onCreationLink = {};					

		//If the target id and source id is the same, clear all, cause a recursive link is not allowed		
		} else {
			onCreationLink = {};
		}

	});

	Navigatte.Nodes.on("input_click", function(d) {

		//If there is no source id, just crate the source id
		if(onCreationLink.source_id == undefined) {
			onCreationLink.target_id = d.node_id;
		
		//If the existing source id is different from the new target id
		} else if(onCreationLink.source_id != d.node_id) {
			onCreationLink.target_id = d.node_id;
			Navigatte.Links.Create(onCreationLink);
			Navigatte.Links.Refresh();
			onCreationLink = {};					

		//If the siurce id and source id is the same, clear all, cause a recursive link is not allowed		
		} else {
			onCreationLink = {};
		}
							
	});

	//On container click, clear all on creation links
	Navigatte.Container.on("click", function() {
		onCreationLink = {};	
	});
});


