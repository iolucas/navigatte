'use strict';

nvgttChart.container = new function() {

	//Object to handle the nodes events
	var eventHandler = new EventHandler();
	this.on = function(event, callback) {
		eventHandler.on(event, callback);
		return self;
	}

	var minHeight = 100;

	var margin = {
		top: 0,
		bottom: 0,
		right: 22,
		left: 22
	}

	//Find svg container
	var svgContainer = d3.select(".nvgtt-chart");

	if(svgContainer.empty())
		throw "Chart container not found. Add a 'nvgtt-chart' class to a SVG object.";

	svgContainer
		.style("background-color", "#e0e0e0")
		.attr("width", "100%")
		.attr("height", minHeight);

	//Rect to catch mouse events
	svgContainer.append("rect")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("fill", "transparent")
		.on("click", function(){
			eventHandler.fire("click");
		});

	var chart = svgContainer.append("g")
		.attr("transform", "translate(" + margin.left + " " + margin.top + ")");

	//Public methods
	this.setHeight = function(height) {
		if(height == undefined)
			height = chart.node().getBBox().height;

		height = height < minHeight ? minHeight : height;

		svgContainer.attr("height", height);
	}

	this.getWidth = function() {
		return svgContainer.node().clientWidth - (margin.left + margin.right);
	}

	this.select = function() {
		return chart;
	}
}