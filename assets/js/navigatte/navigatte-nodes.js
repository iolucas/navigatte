/*-First we need to create a way to store the inputs and outputs references in the nodes,maybe store only the links
-Then use the inputs references to recursively get the block column (or degree)
-use the input/outputs reference to calculate the nodes format base on number of i/o s*/



function NvgttBlock(blockData) {
	var nvgttBlock = this;

	nvgttBlock.name = blockData.name;

	nvgttBlock.globalId = blockData.globalId;
	nvgttBlock.localId = blockData.localId;

	nvgttBlock.bgcolor = blockData.bgcolor;
	nvgttBlock.fgcolor = blockData.fgcolor;

	nvgttBlock.x = blockData.x;
	nvgttBlock.y = blockData.y;

	nvgttBlock.inputs = [];
	nvgttBlock.outputs = [];

	nvgttBlock.GetColumn = function() {
		var column = 0;

		for(var i = 0; i < nvgttBlock.inputs.length; i++) {
			var inputColumn = nvgttBlock.inputs[i].GetColumn();

			if(column <= inputColumn)
				column = inputColumn + 1;
		}

		return column;
	}

	//Getters

	/*var _name = blockData.name;
	nvgttBlock.GetName = function() {
		return _name;
	}

	var _globalId = blockData.globalId;
	nvgttBlock.GetGlobalId = function() {
		return _globalId;
	}

	var _localId = blockData.localId;
	nvgttBlock.GetLocalId = function() {
		return _localId;
	}

	var _bgColor = blockData.bgcolor;
	nvgttBlock.GetBgColor = function() {
		return _bgColor;
	}

	var _fgColor = blockData.fgcolor;
	nvgttBlock.GetFgColor = function() {
		return _fgColor;
	}

	var _position = { x: blockData.x, y: blockData.y }
	nvgttBlock.GetPosition = function() {
		return { X:_position.x, Y:_position.y };
	}*/
}


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
			//nodes.push(nodesArray[i]);
			nodes.push(new NvgttBlock(nodesArray[i]));

		//Refresh the nodes
		self.Refresh();
	}

	this.Get = function(searchObject) {

		if(searchObject.hasOwnProperty('localId')) {
			
			for(var i = 0; i < nodes.length; i++) {
				if(nodes[i].localId == searchObject.localId)
					return nodes[i];
			}

		} else if(searchObject.hasOwnProperty('globalId')) {

			for(var i = 0; i < nodes.length; i++) {
				if(nodes[i].globalId == searchObject.globalId)
					return nodes[i];
			}
		}

		//If the search object is invalid, or no block were found, return null
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

		var nextY = [];

		Navigatte.Container.Select().selectAll(".navi-nodes")
			.each(function(d) {

				var column = d.GetColumn();

				if(nextY[column] == undefined)
					nextY[column] = 10;

				var newX = column*500 + 10;
				var newY = nextY[column];

				nextY[column] += 60;
					
				if(d.x != newX || d.y != newY) {

					d.x = newX;
					d.y = newY;

					//Update node position
					d.d3Select.attr("transform", "translate(" + d.x + " " + d.y + ")");	

					eventHandler.fire("drag", d);
				}
			});
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




		var innerRect = innerRectGroup.append("path")
			.attr("class", "node-inner-rect", true)
			.attr("fill", function(d){ return d.bgcolor; });


		//Append the node rectangle to the inner rect group
		/*var innerRect = innerRectGroup.append("rect")
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
			});*/

		/*var innerRectGrad = innerRectGroup.append("rect")
			.attr("height", function(d) {
				return d.containerHeight;
			})
			.attr("fill", "url(#linGrad)");*/

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

				var margin = 60;

				d.containerWidth = textBox.width + margin;

				return margin/2;

			})
			.attr("y", function(d) {
				//Set y position in function of container height
				
				var textBox = this.getBBox();

				d.containerHeight = 50;
				
				//d.containerWidth = textBox.width < 40 ? 100 : textBox.width + 60;
				//d.containerWidth = textBox.width + 40;

				return (d.containerHeight - textBox.height) / 2 - textBox.y;
			})
			.attr("fill", function(d) {
				//return "#fff";
				return d.fgcolor;
			});


		//Hexagon path generator
		var hexbin = d3.hexbin();


		var createCircle = d3.svg.arc().innerRadius(0)
			.outerRadius(function(d){return d;})
			.startAngle(0)
			.endAngle(3.15*2);

		//Create block shape
		innerRect.attr("d", function(d) {

			//return createCircle(d.containerWidth/2);

			//return "M" + d.containerWidth/2 + "," + d.containerHeight/2 + hexbin.hexagon(d.containerWidth/1.732050);

			return "M0,0 h" + d.containerWidth + 
				"v" + d.containerHeight + 
				"h-" + d.containerWidth + "z";

		}).attr("transform", function(d) {
			//return "translate(" + d.containerWidth/2 + " " + d.containerHeight/2 +")";
		});

		//Set node inner rect width now the text has been placed and we got its size
		innerRect.attr("width", function(d) { return d.containerWidth; });


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
		
		var newBlock = new NvgttBlock(newNode);

		//Push the node to the user nodes
		nodes.push(newBlock);

		eventHandler.fire("create", newBlock);

		return newBlock;
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
				nodes.push(new NvgttBlock(cNode));	
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