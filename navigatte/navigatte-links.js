//Module to handle and compute links creation, deletation and update
Navigatte.Links = new function() {
	var self = this;

	var links = [];

	var eventHandler = new EventHandler();

	//Variable to hold the next node create id
	var nextLinkId = 1;

	//Set the event in case the nodes move, refresh the links attached to it
	Navigatte.Nodes.on("drag", function(d) {
		var nodeLinks = self.Get({ nodeId: d.node_id, source: true, target: true });

		for(var i = 0; i < nodeLinks.length; i++){
			var currLink = nodeLinks[i];
			
			currLink.d3Select.attr("d", createLinkPath(currLink.source_id, currLink.target_id));	
		}
	});

	this.Init = function(linksArray) {
		//Copy nodes array members
		for(var i = 0; i < linksArray.length; i++)
			links.push(linksArray[i]);

		//Refresh the links
		self.Refresh();
	}

	this.Create = function(linkAttr) {
		
		//Create new link object
		var newLink = {
			id: "newLink" + nextLinkId,
			source_id: linkAttr.source_id,
			target_id: linkAttr.target_id
		}

		//Increase the next index for a created link
		nextLinkId++

		//Push the node to the user nodes
		links.push(newLink);

		eventHandler.fire("create", newLink);

		return newLink;
	}

	this.Delete = function(link) {
		var linkIndex = links.indexOf(link);
		
		if(linkIndex == -1)
			return;

		links.splice(linkIndex, 1);

		eventHandler.fire("delete", link);
	}

	//Function to return an array of reference to all links attached to the specified node
	this.Get = function(getAttr) {
		var nodeLinks = [];

		if(getAttr.nodeId != undefined && (getAttr.source || getAttr.target)) {
			for(var i = 0; i < links.length; i++) {
				if(getAttr.source && links[i].source_id == getAttr.nodeId)
					nodeLinks.push(links[i]);
				else if(getAttr.target && links[i].target_id == getAttr.nodeId)
					nodeLinks.push(links[i]);
			}
		}

		return nodeLinks;
	}

	this.Refresh = function() {

		var linksSelection = Navigatte.Container.Select().selectAll(".navi-links")
			.data(links, function(d) {
				//Match link maps member with the data bind in the selection of the classes
				return d.id;
			});

		//Get the links data which has no DOM binded, create the DOMs and bind them
		var createSelection = linksSelection.enter();
		createLinks(createSelection);

		//Get the links DOMs which has not data binded and remove them
		linksSelection.exit().remove();

	}


	function createLinks(createSelection) {

		var linksSelection = createSelection.insert("path", ":first-child")
			.classed("navi-links", true)
			.attr("d", function(link) {
				link.d3Select = d3.select(this);	//get the link obj reference
				//console.log(link);

				return createLinkPath(link.source_id, link.target_id);
			})
			.attr("fill", "none")
			.attr("stroke", "#000")
			.attr("stroke-width", 2);
	}

	//Return the path created to link the source and target nodes
	function createLinkPath(sourceId, targetId) {
		return drawLinkPath({
			source: Navigatte.Nodes.Get(sourceId),
			target: Navigatte.Nodes.Get(targetId)
		});
	}

	//Function to draw the path of a diagonal line (x and y are inverted for right line projection)
	var drawLinkPath = d3.svg.diagonal()
		.source(function(link) { 
			return { x: link.source.y + 20, y: link.source.x + link.source.containerWidth }; 
		})            
		.target(function(link) { 
			return { x: link.target.y + 20, y: link.target.x }; 
		})
		.projection(function(d) { 
			return [d.y, d.x]; 
		});



	/*var newLinkNextId = 0;


	this.StartCreate = function(nodeData) {


	}

	this.FinishCreate = function(nodeData) {



	}*/
}
