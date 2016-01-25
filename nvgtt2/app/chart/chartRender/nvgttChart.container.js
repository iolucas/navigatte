'use strict';

nvgttChart.container = new function() {

	//Object to handle the nodes events
	var eventHandler = new EventHandler();
	this.on = function(event, callback) {
		eventHandler.on(event, callback);
		return self;
	}

	//Private variables

	var minHeight = 50;

	var margin = {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0
	}

	var svgContainer;
	var chart;

	//Public methods

	this.init = function() {
		//Find svg container
		svgContainer = d3.select(".nvgtt-chart");

		if(svgContainer.empty())
			throw "Chart container not found. Add a 'nvgtt-chart' class to a SVG object.";

		svgContainer
			.style("background-color", "#e0e0e0")
			//.style("background-color", "#111")
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

		chart = svgContainer.append("g")
			.attr("transform", "translate(" + margin.left + " " + margin.top + ")");
	}
	
	this.setHeight = function(height, transition) {
		if(height == undefined)
			height = chart.node().getBBox().height;

		height = height < minHeight ? minHeight : height;

		if(transition)
			svgContainer.transition(transition.name).duration(transition.duration)
				.attr("height", height);
		else
			svgContainer.attr("height", height);
	}

	this.getWidth = function() {
		return svgContainer.node().clientWidth - (margin.left + margin.right);
	}

	this.select = function() {
		return chart;
	}
}