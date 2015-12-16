//Module to handle keyboard actions
Navigatte.KeyActions = new function() {

	d3.select("body").on("keyup", function() {

		switch(d3.event.keyCode) {

			//Handle delete key
			case 46:
				deleteSelection(Navigatte.Select.GetSelection());
				break;

			//Handle esc key
			case 27:
				Navigatte.Select.DeselectAll();
				break;
		}
	});

	function deleteSelection(selection) {
		if(selection == null)
			return;

		//if the selection is a node
		if(selection.node_id != undefined) {
			Navigatte.Nodes.Delete(selection);
			Navigatte.Nodes.Refresh();
			Navigatte.Links.Refresh();
		} 

		//if the selection is a link
		else if(selection.source_id != undefined) { 
			Navigatte.Links.Delete(selection);
			Navigatte.Links.Refresh();
		}

		Navigatte.Select.DeselectAll();
	}	
}