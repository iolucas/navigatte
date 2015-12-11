//Module to handle node and link changes
if(Navigatte == undefined)
	var Navigatte = {}

Navigatte.ChangeManager = new function() {
	//Array to store objects changes
	var changes = {};

	//Array storing the properties allowed to be changed
	var changebleProperties = [
		"name","x","y","bgcolor","fgcolor"
	];

	this.Push = function(nodeId, action, changedAttr) {

		//If the action is delete
		if(action == "delete") {
			//If a entry for this nodeId has already been setted and it was a create action
			if(changes[nodeId] != undefined && changes[nodeId].action == "create") {
				//Just remove the "to create" node entry and return
				delete changes[nodeId];
			} else { //If not, just create new object saying deletation , neverthless an entry for it exists or not
				changes[nodeId] = { id: nodeId, action: action }
			}

		} else {	//If any other action (create, update)

			//Just update their "to change objects"

			//If the node id is not computed, create a new object to store its changes
			if(changes[nodeId] == undefined)
				changes[nodeId] = { id: nodeId, action: action }


			for(prop in changedAttr){
				//If the propertie is allowed, set it to the change array
				if(changebleProperties.indexOf(prop) != -1)
					changes[nodeId][prop] = changedAttr[prop];	
			}
		}
	}

	this.SaveChanges = function() {

		//If there is nothing to change, return false
		if(checkNoProperties(changes))
			return false;

		//Getting post data
		var changesArray = []
		for(prop in changes) {
			changesArray.push(changes[prop]);
		}

		var changesString = JSON.stringify(changesArray);

		console.log("Saving...");

		$.post("", { action: "save_node_changes", changes: changesString })
			.done(function(response) {
				console.log(response);
				console.log("Changes saved!");
			})
			.fail(function() {
				console.log("Error while saving.");
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