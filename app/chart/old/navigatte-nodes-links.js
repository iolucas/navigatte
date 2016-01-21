function refreshNodes(nodesArray, nodesClass) {

	var dataSelection = d3.select("#nodes-container").selectAll("." + nodesClass)
		.data(nodesArray, function(d) {
			//Match nodes array member with the data bind in the selection of the classes
			return d.node_id;
		});

	//Get the nodes which has node element appended and create them
	var createSelection = dataSelection.enter();
	createNodes(createSelection, nodesClass);

	//Get the nodes which has data appended and remove them
	dataSelection.exit().remove();
}

function createNodes(createSelection, nodesClass) {

	var nodeGroup = createSelection.append("g")
		.classed(nodesClass, true)
		.attr("transform", function(d) {
			//Set node d3 selection reference
			d.d3Select = d3.select(this);

			d.x = parseInt(d.x || "100");
			d.y = parseInt(d.y || "100");

			return "translate(" + d.x + " " + d.y +")";
		});

	var innerRectGroup = nodeGroup.append("g")
		.classed("node-inner-rect-group", true)
		.on("click", selectNodePath);	

	//Append the node rectangle to the inner rect group
	var innerRect = innerRectGroup.append("rect")
		.attr("class", "node-inner-rect", true)
		.attr("height", function(d) {
			//d.containerHeight = 12 * d.outputs.length + 28;
		
			d.containerHeight = 40;

			return d.containerHeight;
		})
		.attr("fill", function(d) {
			return d.bgcolor;
		})
		;

	//Darker Margin to display the logo type
	var innerRectDarkerMargin = innerRectGroup.append("rect")
		.attr("class", "node-inner-rect-darker-margin", true)
		.attr("x", 1)
		.attr("y", 1)
		.attr("width", 28)
		.attr("height", function(d) {
			return d.containerHeight - 2;	
		});

	//Node name text
	var innerRectText = innerRectGroup.append("text")
		.attr("class", "node-inner-rect-text")
		.text(function(d) { return d.name; })
		.attr("x", 38)
		.attr("y", function(d) {
			//Set y position in function of container height
			
			var textBox = this.getBBox();
			
			d.containerWidth = textBox.width < 40 ? 100 : textBox.width + 60;

			return (d.containerHeight - textBox.height) / 2 - textBox.y;
		})
		.attr("fill", function(d) {
			return d.fgcolor;
		});

	//Set node inner rect width now the text has been placed and we got its size
	innerRect.attr("width", function(d) { return d.containerWidth; });

	//Draw input symbol
	nodeGroup.append("path")
		.classed("node-io-symbol", true)
		.attr("d", "M0,0 14,7 L0,14z")
		.attr("transform", function(d) {
			return "translate(-5 " + (d.containerHeight - 14) / 2 + ")";
		});

	//Draw output symbol
	nodeGroup.append("path")
		.classed("node-io-symbol", true)
		.attr("d", "M0,0 14,7 L0,14z")
		.attr("transform", function(d) {
			return "translate(" + (d.containerWidth - 5) + " " + (d.containerHeight - 14) / 2 + ")";
		})
		.on("mousedown", function() {
			//Cancel event bubble to avoid another actions to occurr on mouse this area
			d3.event.cancelBubble = true;
		})
		.on("click", function() {

			
		});

	//Enable nodes to be dragged
	nodeGroup.call(enableNodeDrag);

	//Enable nodes to display content on double click
	innerRectGroup.call(enableNodeContentDisplay);
}

function deleteNodes(deleteSelection) {
	deleteSelection.remove();
}


//Create object to open node content display
var enableNodeContentDisplay = function(nodesSelection) {

	//Enable nodes to display content on double click
	nodesSelection.on("dblclick", function(nodeData) {

		//Cancel event bubble to avoid another actions to occurr on double click 
		d3.event.cancelBubble = true;

		OpenContentModal(nodeData);
	});
}

//Create object to handle nodes drag
var enableNodeDrag = d3.behavior.drag()
	.origin(function(d) { return d; })
	.on("drag", function(d) {

		//Update node attribute
		Navigatte.NodeManager.Update(d, {
			x: d3.event.x,
			y: d3.event.y
		});

		//Update node position
		d.d3Select.attr("transform", "translate(" + d.x + " " + d.y + ")");	

		//Update dragged node parent and child links paths
		for(var i = 0; d.parentLinks && i < d.parentLinks.length ; i++) {
			var currLink = d.parentLinks[i];
			currLink.d3Select.attr("d", createLinkPath(currLink));
		}

		for(var i = 0; d.childLinks && i < d.childLinks.length; i++) {
			var currLink = d.childLinks[i];
			currLink.d3Select.attr("d", createLinkPath(currLink));
		}		
	});




var refreshLinks = function(nodesArray, linksArray, linksClass) {

	//Create nodes map and register parents and childs links arrays
	var nodesMap = [];
	for(var i = 0; i < nodesArray.length; i++) {
		var cNode = nodesArray[i];

		nodesMap[cNode.node_id] = cNode;

		cNode.parentLinks = [];	//Define parent links array
		cNode.childLinks = [];	//Define child links array
	}

	var linksMap = [];
	for(var i = 0; i < linksArray.length; i++) {
		var currLink = linksArray[i];

		var sourceNode = nodesMap[currLink.source_id];
		var targetNode = nodesMap[currLink.target_id];

		//Create new link object
		var newLink = { id: currLink.id, source: sourceNode, target: targetNode }
		linksMap.push(newLink);

		//Pass the link reference to the nodes
		targetNode.parentLinks.push(newLink);
		sourceNode.childLinks.push(newLink);
	}

	//console.log(linksMap);
	//return;


	var dataSelection = d3.select("#nodes-container").selectAll("." + linksClass)
		.data(linksMap, function(d) {
			//Match link maps member with the data bind in the selection of the classes
			return d.id;
		});

			//Get the nodes which has node element appended and create them
	var createSelection = dataSelection.enter();
	createLinks(createSelection, linksClass);

	//Get the nodes which has data appended and remove them
	//var deleteSelection = dataSelection.exit();
	//deleteNodes(deleteSelection);
}

var createLinks = function(createSelection, linksClass) {


	var linksSelection = createSelection.insert("path", ":first-child")
		.attr("class", linksClass)
		.attr("d", function(link) {
			link.d3Select = d3.select(this);	//get the link obj reference

			//Return the path created by the source and target nodes
			return createLinkPath(link);
		})
		.attr("fill", "none")
		.attr("stroke", "#000")
		.attr("stroke-width", 2);
}



//Function to create the path of a diagonal line (x and y are inverted for right line projection)
var createLinkPath = d3.svg.diagonal()
	.source(function(link) { 
		return { x: link.source.y + 20, y: link.source.x + link.source.containerWidth }; 
	})            
	.target(function(link) { 
		return { x: link.target.y + 20, y: link.target.x }; 
	})
	.projection(function(d) { 
		return [d.y, d.x]; 
	});




/*function loadNodesAndLinks(nodesArray, linksArray, nodesClass) {

	//Create the nodes group to hold nodes svg objects
	var nodesGroup = d3.select("#nodes-container").selectAll("." + nodesClass).data(nodesArray).enter()
		.append("g")
		.attr("class", nodesClass)
		.style("cursor", "pointer")
		.attr("transform", function(d) {
			//Set node svg object reference
			d.d3Select = d3.select(this);

			d.x = parseInt(d.x || "100");
			d.y = parseInt(d.y || "100");

			return "translate(" + d.x + " " + d.y +")";
		});


	//Append the node rectangle to the node group
	var nodesRect = nodesGroup.append("rect")
		.style("stroke-width", 2)
		.style("stroke", "#fff")
		.attr("height", function(d) {
			//d.containerHeight = 12 * d.outputs.length + 28;
		
			d.containerHeight = 40;

			return d.containerHeight;
		})
		.attr("fill", function(d) {
			return d.bgcolor;
		});


	nodesGroup.append("rect")
		.attr("x", 1)
		.attr("y", 1)
		.attr("width", 28)
		.attr("height", function(d) {
			return d.containerHeight - 2;	
		})
		.attr("stroke", "none")
		.attr("fill-opacity", 0.2)
		.attr("fill", "#000");


	nodesGroup.append("text")
		.attr("class", "skill-node-label")
		.text(function(d) { return d.name; })
		.attr("x", 38)
		.attr("y", function(d) {
			//Set y position in function of container height
			
			var textBox = this.getBBox();
			
			d.containerWidth = textBox.width < 40 ? 100 : textBox.width + 60;

			return (d.containerHeight - textBox.height) / 2 - textBox.y;
		})
		.attr("fill", function(d) {
			return d.fgcolor;
		});

	//Set skill container width now the text has been placed
	nodesRect.attr("width", function(d) { return d.containerWidth; });

	//Draw input symbol
	nodesGroup.append("path")
		.attr("d", "M0,0 14,7 L0,14z")
		.attr("fill", "#aaa")
		.attr("stroke", "#fff")
		.attr("stroke-width", 2)
		.attr("transform", function(d) {
			return "translate(-5 " + (d.containerHeight - 14) / 2 + ")";
		});

	//Draw output symbol
	nodesGroup.append("path")
		.attr("d", "M0,0 14,7 L0,14z")
		.attr("fill", "#aaa")
		.attr("stroke", "#fff")
		.attr("stroke-width", 2)
		.attr("transform", function(d) {
			return "translate(" + (d.containerWidth - 5) + " " + (d.containerHeight - 14) / 2 + ")";
		});

	nodesGroup.call(nodeDragger);

	//Return the nodes D3 selection
	return nodesGroup;
}*/

