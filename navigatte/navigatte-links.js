//Module to handle and compute links creation, deletation and update
Navigatte.Links = new function() {
	var self = this;

	var links = [];

	var eventHandler = new EventHandler();

	this.on = function() {
		eventHandler.on.apply(null, arguments);
	}

	//Set event to delete links attached to a deleted node
	Navigatte.Nodes.on("delete", function(node) {
		//Get the node attached links and delete them
		var nodeLinks = Navigatte.Links.Get({ nodeId: node.globalId, source:true, target:true });
		for(var i = 0; i < nodeLinks.length; i++)
			Navigatte.Links.Delete(nodeLinks[i]);

	});

	//Variable to hold the next node create id
	var nextLinkId = 1;

	//Set the event in case the nodes move, refresh the links attached to it
	Navigatte.Nodes.on("drag", function(d) {
		var nodeLinks = self.Get({ nodeId: d.globalId, source: true, target: true });

		for(var i = 0; i < nodeLinks.length; i++){
			var currLink = nodeLinks[i];
			
			currLink.d3Select.attr("d", createLinkPath(currLink.sourceId, currLink.targetId));	
		}
	});

	this.Init = function(linksArray) {
		//Copy nodes array members
		for(var i = 0; i < linksArray.length; i++)
			links.push(linksArray[i]);

		//Refresh the links
		self.Refresh();
	}

	this.Find = function(linkAttr) {
		return getLink(linkAttr);
	}

	function getLink(linkAttr) {
		for(var i = 0; i < links.length; i++) {
			if(links[i].sourceId == linkAttr.sourceId && 
				links[i].targetId == linkAttr.targetId)
				return links[i];
		}
		return null;		
	}

	this.Create = function(linkAttr) {

		if(linkAttr.sourceId == undefined || linkAttr.targetId == undefined)
			return null;

		//Check if the node exist 
		var linkRef = getLink(linkAttr)
		if(linkRef != null)
			return linkRef;

		/*for(var i = 0; i < links.length; i++) {
			if(links[i].sourceId == linkAttr.sourceId && 
				links[i].targetId == linkAttr.targetId)
				return links[i];
		}*/


		//Create new link object
		var newLink = {
			sourceId: linkAttr.sourceId,
			targetId: linkAttr.targetId
		}

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
				if(getAttr.source && links[i].sourceId == getAttr.nodeId)
					nodeLinks.push(links[i]);
				else if(getAttr.target && links[i].targetId == getAttr.nodeId)
					nodeLinks.push(links[i]);
			}
		}

		return nodeLinks;
	}

	this.Refresh = function() {

		var linksSelection = Navigatte.Container.Select().selectAll(".navi-links")
			.data(links, function(d) {
				//Match link maps member with the data bind in the selection of the classes
				return d.sourceId + d.targetId;
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

				return createLinkPath(link.sourceId, link.targetId);
			})
			.on("click", function(d) {
				eventHandler.fire("click", d);
			});
	}

	//Return the path created to link the source and target nodes
	function createLinkPath(sourceId, targetId) {
		var sourceNode = Navigatte.Nodes.Get(sourceId),
			targetNode = Navigatte.Nodes.Get(targetId);

		if(sourceNode == undefined || targetNode == undefined)
			return "";

		return drawLinkPath({
			source: sourceNode,
			target: targetNode
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


	//Link projection stuff
	var projArray = null;
	this.Project = function(linkArr) {
		clearProjection();
		self.Refresh();

		projArray = linkArr;

		for(var i = 0; i < projArray.length; i++) {
			var cLink = projArray[i];

			if(getLink(cLink) == null)
				links.push(cLink);	
		}	

	}


	this.ClearProjection = function() { return clearProjection() }

	function clearProjection() {
		if(projArray == null)
			return;

		for(var i = 0; i < projArray.length; i++) {
			var linkIndex = links.indexOf(projArray[i]);
			if(linkIndex >= 0)
				links.splice(linkIndex, 1);
		}

		projArray = null;
	}
}
