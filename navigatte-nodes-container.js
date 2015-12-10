//ROUTINES TO HANDLE THE NODES CONTAINER MANAGEMENT

//Var to store nodes container current attributes
var nodesContainerAttr = { scale: 1, translate: [0,0] };

function initNodesContainer(parentId) {
	//Append svg container
	var svgContainer = d3.select(parentId).append("svg")
		.attr("id", "svg-container");	

	//Append rectangle to receive mouse events such void click or screen zooming/moving
	var svgMouseArea = svgContainer.append("rect")
		.attr("fill", "transparent")
		.on("mousedown", function() {
			d3.select(this).style("cursor", "move");		
		})
		.on("mouseup", function() {
			d3.select(this).style("cursor", "");		
		});	

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



