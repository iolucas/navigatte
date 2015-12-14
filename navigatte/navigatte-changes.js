//Module to handle changes of any kind 
Navigatte.Changes = new function() {

	//Array to store objects changes
	var notSavedChanges = {};

	//flag to signalize whether a save is in progress
	var saveInProgress = false;

	//Array storing the properties allowed to be changed
	var changebleProperties = [
		"name","x","y","bgcolor","fgcolor"
	];

	this.Push = function(nodeId, action, changedAttr) {

		//If the action is delete
		if(action == "delete") {
			//If a entry for this nodeId has already been setted and it was a create action
			if(notSavedChanges[nodeId] != undefined && notSavedChanges[nodeId].action == "create") {
				//Just remove the "to create" node entry and return
				delete notSavedChanges[nodeId];
			} else { //If not, just create new object saying deletation , neverthless an entry for it exists or not
				notSavedChanges[nodeId] = { node_id: nodeId, action: action }
			}

		} else {	//If any other action (create, update)

			//Just update their "to change objects"

			//If the node id is not computed, create a new object to store its changes
			if(notSavedChanges[nodeId] == undefined)
				notSavedChanges[nodeId] = { node_id: nodeId, action: action }


			for(prop in changedAttr){
				//If the propertie is allowed, set it to the change array
				if(changebleProperties.indexOf(prop) != -1)
					notSavedChanges[nodeId][prop] = changedAttr[prop];	
			}
		}
	}

	this.Save = function() {

		//If there is nothing to change, return false
		if(checkNoProperties(notSavedChanges) || saveInProgress)
			return false;

		saveInProgress = true;

		//Getting post data
		var changesArray = []
		for(prop in notSavedChanges) {
			changesArray.push(notSavedChanges[prop]);
		}

		var changesString = JSON.stringify(changesArray);

		alertify.delay(5000).log("Saving changes...");

		$.post("save_nodelinks_changes.php", { action: "save_node_changes", changes: changesString })
			.done(function(responseObj) {
				
				responseObj = JSON.parse(responseObj);

				if(responseObj.result == "success") {
					alertify.delay(5000).success("Changes saved!");

					for(var i = 0; responseObj.createdIds && i < responseObj.createdIds.length; i++) {

						//Get the id of the created node (of the format new#)
						var createdNodeId = responseObj.createdIds[i].node_id;

						Navigatte.Nodes.UpdateId(responseObj.createdIds[i].node_id, responseObj.createdIds[i].newId);

						delete notSavedChanges[responseObj.createdIds[i].node_id];
					}

				} else {
					alertify.delay(5000).error("Unknown error while saving.");
				}
				
				//Reset changes object storage
				notSavedChanges = {};
			})
			.fail(function() {
				alertify.delay(5000).error("Error while saving. Please try again.");
			})
			.always(function(){
				saveInProgress = false;
			});
	}

	function checkNoProperties(obj) {
		for(var key in obj) {
		      if (obj.hasOwnProperty(key)) {
		         return false;
		      }
		   }
		return true;
	}
}