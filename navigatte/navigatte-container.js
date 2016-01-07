//Container class to manage container stuff

Navigatte.Container = new function() {

	var self = this;

	//Public variable holding the current scale and translate attributes
	this.Scale = 1;
	this.Position = { X: 0, Y: 0 }

	var container;
	var svgContainer;
	var svgMouseArea;	

	//Create object to handle nodes container zooming/draging
	var containerZoom = d3.behavior.zoom()
		.scaleExtent([0.1, 1])
		.on("zoom", function() {

			container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

			self.Position.X = d3.event.translate[0];
			self.Position.Y = d3.event.translate[1];

			self.Scale = d3.event.scale;
		});

	this.Translate = function(x, y) {
		return containerZoom.translate([x, y]).event(svgMouseArea);	
	}

	this.Scale = function(scaleFactor) {
		return containerZoom.scale(scaleFactor).event(svgMouseArea);	
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
		//Append svg container
		/*svgContainer = d3.select(parentId).append("svg")
			.attr("id", "svg-container");*/	

		svgContainer = d3.select(".svg-container");

		//Append rectangle to receive mouse events such void click or screen zooming/moving
		/*svgMouseArea = svgContainer.append("rect")
			.attr("id", "node-container-mouse-area")
			.attr("fill", "transparent")*/

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

		//Append nodes main container
		container = svgContainer.append("g");


		//Add the function to refresh the screen size to the event list of window resize
		window.addEventListener("resize", function(){
			refreshContainerSize(window.innerWidth, window.innerHeight);
		});

		//Execute the function once to set the initial screen size
		refreshContainerSize(window.innerWidth, window.innerHeight);
	
		//Enable the nodes container to be zoomed/dragged
		svgMouseArea.call(containerZoom);
	}

	//Function to handle screen size change
	function refreshContainerSize(newWidth, newHeight) {

		//Update svg view window size
		svgContainer.attr("height", newHeight)
			.attr("width", newWidth);

		//Update svg mouse area size
		svgMouseArea.attr("height", newHeight)
			.attr("width", newWidth);

		//Update the zoom behavior size for smooth transitions
		containerZoom.size([newWidth, newHeight]);
	}

}




/*
//Var to store nodes container current attributes
var nodesContainerAttr = { scale: 1, translate: [0,0] };

function initNodesContainer(parentId) {
	//Append svg container
	var svgContainer = d3.select(parentId).append("svg")
		.attr("id", "svg-container");	

	//Append rectangle to receive mouse events such void click or screen zooming/moving
	var svgMouseArea = svgContainer.append("rect")
		.attr("id", "node-container-mouse-area")
		.attr("fill", "transparent")
		.on("mousedown", function() {
			d3.select(this).style("cursor", "move");		
		})
		.on("mouseup", function() {
			d3.select(this).style("cursor", "");		
		})
		.on("click", clearAllSelections);

	//Append nodes main container
	var nodesContainer = svgContainer.append("g")
		.attr("id", "nodes-container");

	//Create object to handle nodes container zooming/draging
	var nodesContZoom = d3.behavior.zoom()
		.scaleExtent([0.1, 1])
		.on("zoom", function() {

			nodesContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

			nodesContainerAttr.translate = d3.event.translate;
			nodesContainerAttr.scale = d3.event.scale;
		});

	//Function to handle screen size change
	var refreshScreenSize = function() {

		//Update svg view window size
		svgContainer.attr("height", window.innerHeight)
			.attr("width", window.innerWidth);

		//Update svg mouse area size
		svgMouseArea.attr("height", window.innerHeight)
			.attr("width", window.innerWidth);

		//Update the zoom behavior size for smooth transitions
		nodesContZoom.size([window.innerWidth, window.innerHeight]);
	}

	//Add the function to refresh the screen size to the event list of window resize
	window.addEventListener("resize", refreshScreenSize);

	//Execute the function once to set the initial screen size
	refreshScreenSize();
	
	//Enable the nodes container to be zoomed/dragged
	svgMouseArea.call(nodesContZoom);
}
*/


