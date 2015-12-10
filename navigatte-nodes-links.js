function loadNodesAndLinks(nodesArray, linksArray, nodesClass) {

	//Create the nodes group to hold nodes svg objects
	var nodesGroup = d3.select("#nodes-container").selectAll("." + nodesClass).data(nodesArray).enter()
		.append("g")
		.attr("class", nodesClass)
		.style("cursor", "pointer")
		.attr("transform", function(d) {
			//Set node svg object reference
			d.svgObject = d3.select(this);

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
}

//Create object to handle nodes drag
var nodeDragger = d3.behavior.drag()
	.origin(function(d) { return d; })
	.on("drag", function(d) {
		d.x = d3.event.x < 1 ? 1 : d3.event.x;
		d.y = d3.event.y < 1 ? 1 : d3.event.y;

		d.x = d3.event.x;
		d.y = d3.event.y;

		//Update dragged node parent and child links paths
		/*for(var i = 0; i < d.parentLinks.length ; i++) {
			var currLink = d.parentLinks[i];
			currLink.linkObj.attr("d", createLinkPath(currLink));
		}

		for(var i = 0; i < d.childLinks.length; i++) {
			var currLink = d.childLinks[i];
			currLink.linkObj.attr("d", createLinkPath(currLink));
		}*/

		d.svgObject.attr("transform", "translate(" + d.x + " " + d.y + ")");	
	});