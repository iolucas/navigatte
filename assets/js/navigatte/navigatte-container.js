//Container class to manage container stuff

Navigatte.Container = new function() {

	var self = this;

	//Public variable holding the current scale and translate attributes
	var scale = 1;
	this.Position = { X: 0, Y: 0 }

	var container;
	var svgContainer;
	var svgMouseArea;	

	//Create object to handle nodes container zooming/draging
	var containerZoom = d3.behavior.zoom()
		//.scaleExtent([1, 1])
		.scaleExtent([0.1, 5])
		.on("zoom", function() {

			container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

			self.Position.X = d3.event.translate[0];
			self.Position.Y = d3.event.translate[1];

			scale = d3.event.scale;
		});

	this.Translate = function(x, y) {
		return containerZoom.translate([x, y]).event(svgMouseArea);	
	}

	this.Scale = function(scaleFactor) {
		if(scaleFactor)
			return containerZoom.scale(scaleFactor).event(svgMouseArea);
		else
			return scale;
	}

	var eventHandler = new EventHandler();
	this.on = function(event, callback) {
		eventHandler.on(event, callback);
		return self;	
	}

	//Function to get the d3 selection of the container
	this.Select = function() {
		var containerSelection = container;
		return containerSelection;
	}

	//Function to init the navigatte container class
	this.Init = function(parentId) {

		//Get the svg container reference
		svgContainer = d3.select(".svg-container");

		//Get the blocks container reference
		container = d3.select("#block-container");

		//Add mouse area events
		svgMouseArea = d3.select("#node-container-mouse-area")
			.on("mousedown", function() {
				d3.select(this).style("cursor", "move");		
			})
			.on("mouseup", function() {
				d3.select(this).style("cursor", "");		
			})
			.on("click", function() {
				eventHandler.fire("click");
			});
	
		//Enable the nodes container to be zoomed/dragged
		svgMouseArea.call(containerZoom);
	}

}

