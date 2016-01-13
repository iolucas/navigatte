//Module to Handle nodes management
Navigatte.Nodes = new function() {

	var self = this;

	var nodes = [];

	//Variable to hold the next node create id
	var nextNodeId = 1;

	//Object to handle the nodes events
	var eventHandler = new EventHandler();

	this.on = function(event, callback) {
		eventHandler.on(event, callback);
		return self;
	}

	this.Init = function(nodesArray) {
		//Copy nodes array members
		for(var i = 0; i < nodesArray.length; i++)
			nodes.push(nodesArray[i]);

		//Refresh the nodes
		self.Refresh();
	}

	this.Get = function(nodeId) {
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].globalId == nodeId)
				return nodes[i];
		}

		//If the id where not found, return null
		return null;
	}

	this.Refresh = function() {

		//Get the nodes selection and match it with the nodes array
		var nodesSelection = Navigatte.Container.Select().selectAll(".navi-nodes")
		.data(nodes, function(d) {
			//Match nodes array member with the data bind in the selection of the classes
			return d.globalId;
		});

		//Get the nodes data which has no DOM binded, create the DOMs and bind them
		var createSelection = nodesSelection.enter();
		createNodes(createSelection);

		//Get the nodes DOMs which has not data binded and remove them
		nodesSelection.exit().remove();
	}

	function createNodes(createSelection) {

		var nodeGroup = createSelection.append("g")
			.classed("navi-nodes", true)
			.attr("transform", function(d) {
				//Set node d3 selection reference
				d.d3Select = d3.select(this);

				if(d.x == undefined)
					d.x = "100";

				if(d.y == undefined)
					d.y = "100";

				d.x = parseInt(d.x);
				d.y = parseInt(d.y);

				return "translate(" + d.x + " " + d.y +")";
			});

		var innerRectGroup = nodeGroup.append("g")
			.classed("node-inner-rect-group", true)
			.on("click", function(d) {
				eventHandler.fire("click", d);
			})
			.on("dblclick", function(d) {
				eventHandler.fire("dblclick", d);
			});

		var debugColors = ["#337ab7","#5cb85c","#5bc0de","#f0ad4e","#d9534f"];

		//Append the node rectangle to the inner rect group
		var innerRect = innerRectGroup.append("rect")
			.attr("class", "node-inner-rect", true)
			//.attr("rx", 5)
			//.attr("ry", 5)
			//.attr("filter", "url(#f3)")
			.attr("height", function(d) {
				//d.containerHeight = 12 * d.outputs.length + 28;
			
				d.containerHeight = 50;

				return d.containerHeight;
			})
			.attr("fill", function(d) {
				//return "url(#grad1)";
				//return "rgba(10,10,10,.8)";
				//return "rgb(92,184,92)";
				//return debugColors[(Math.random()*(debugColors.length-1)).toFixed(0)];

				return d.bgcolor;
			});

		var innerRectGrad = innerRectGroup.append("rect")
			.attr("height", function(d) {
				return d.containerHeight;
			})
			.attr("fill", "url(#linGrad)");

		//Darker Margin to display the logo type
		/*var innerRectDarkerMargin = innerRectGroup.append("rect")
			.attr("class", "node-inner-rect-darker-margin", true)
			.attr("x", 1)
			.attr("y", 1)
			.attr("width", 28)
			.attr("height", function(d) {
				return d.containerHeight - 2;	
			});*/

		//Node name text
		var innerRectText = innerRectGroup.append("text")
			.attr("class", "node-inner-rect-text")
			.text(function(d) { return d.name; })
			.attr("x", function(d) {
				var textBox = this.getBBox();
				
				if(textBox.width < 40) {
					d.containerWidth = 100;	
					return (d.containerWidth - textBox.width) / 2;
				}

				d.containerWidth = textBox.width + 60;
				return 30;

			})
			.attr("y", function(d) {
				//Set y position in function of container height
				
				var textBox = this.getBBox();
				
				//d.containerWidth = textBox.width < 40 ? 100 : textBox.width + 60;
				//d.containerWidth = textBox.width + 40;

				return (d.containerHeight - textBox.height) / 2 - textBox.y;
			})
			.attr("fill", function(d) {
				//return "#fff";
				return d.fgcolor;
			});

		//Set node inner rect width now the text has been placed and we got its size
		innerRect.attr("width", function(d) { return d.containerWidth; });
		//innerRectGrad.attr("width", function(d) { return d.containerWidth; });

		//Draw input symbol
		nodeGroup.append("path")
			.classed("node-io-symbol", true)
			//.attr("d", "M0,0 14,7 L0,14z")
			.attr("d", "M0,0 h5 v12 h-5z")
			.attr("transform", function(d) {
				return "translate(-5 " + (d.containerHeight - 12) / 2 + ")";
			})
			.on("mousedown", function(d){
				d3.event.cancelBubble = true;
				eventHandler.fire("input_mousedown", d);
			})
			.on("mouseup", function(d){
				d3.event.cancelBubble = true;
				eventHandler.fire("input_mouseup", d);
			})
			.on("click", function(d) {
				d3.event.cancelBubble = true;
				eventHandler.fire("input_click", d);
			});

		//Draw output symbol
		nodeGroup.append("path")
			.classed("node-io-symbol", true)
			//.attr("d", "M0,0 14,7 L0,14z")
			.attr("d", "M0,0 h5 v12 h-5z")
			.attr("transform", function(d) {
				return "translate(" + (d.containerWidth - 0) + " " + (d.containerHeight - 12) / 2 + ")";
			})
			.on("mousedown", function(d){
				d3.event.cancelBubble = true;
				eventHandler.fire("output_mousedown", d);
			})
			.on("mouseup", function(d){
				d3.event.cancelBubble = true;
				eventHandler.fire("output_mouseup", d);
			})
			.on("click", function(d) {
				d3.event.cancelBubble = true;
				eventHandler.fire("output_click", d);				
			});

		//Enable nodes to be dragged
		nodeGroup.call(nodeDrag);

		//Enable nodes to display content on double click
		//innerRectGroup.call(enableNodeContentDisplay);
	}

	//Create object to handle nodes drag
	var nodeDrag = d3.behavior.drag()
		.origin(function(d) { return d; })
		.on("drag", function(d) {

			if(d.x != d3.event.x || d.y != d3.event.y) {

				d.x = d3.event.x;
				d.y = d3.event.y;

				//Update node position
				d.d3Select.attr("transform", "translate(" + d.x + " " + d.y + ")");	

				eventHandler.fire("drag", d);
			}

		})
		.on("dragend", function(d) {
			eventHandler.fire("dragend", d);	
		});


	function indexOf(globalId){
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].globalId == globalId)
				return i;
		}
		return -1;
	}

	this.SetLocalId = function(globalId, localId) {
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].globalId == globalId) {
				nodes[i].localId = localId;
				return;
			}
		}
	}

	this.Create = function(newNode) {
		if(indexOf(newNode.globalId) != -1) {
			alertify.error("This node already exists!");
			return null;
		}
		
		//Push the node to the user nodes
		nodes.push(newNode);

		eventHandler.fire("create", newNode);

		return newNode;
	}

	this.Delete = function(node) {
		var nodeIndex = nodes.indexOf(node);
		
		if(nodeIndex == -1)
			return;

		nodes.splice(nodeIndex, 1);

		eventHandler.fire("delete", node);	
	}


	//Node projection stuff
	var projArray = null;
	this.Project = function(nodeArr) {
		clearProjection();
		self.Refresh();

		projArray = nodeArr;

		for(var i = 0; i < projArray.length; i++) {
			var cNode = projArray[i];

			if(self.Get(cNode.globalId) == null)
				nodes.push(cNode);	
		}	

	}

	this.ClearProjection = function() { return clearProjection() }

	function clearProjection() {
		if(projArray == null)
			return;

		for(var i = 0; i < projArray.length; i++) {
			var nodeIndex = nodes.indexOf(projArray[i]);
			if(nodeIndex >= 0)
				nodes.splice(nodeIndex, 1);
		}

		projArray = null;
	}
}