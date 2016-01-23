'use strict';

must create system for draw links in a proper way to show them better

nvgttChart.path = new function() {

	var margin = 2;
	var blockHeight = 50;

	var currPath = null;

	this.isShowing = function() { return currPath != null }

	nvgttChart.blocks.on("click", function(block) {
		if(currPath)
			return;

		generatePath(block);
	});

	nvgttChart.container.on("click", function() {
		if(currPath == null)
			return;

		clearPath();
	});	

	function generatePath(block) {

		//Array to keep columns pointers for positioning
		var columnsPointers = [];

		//Set the current path block variable
		currPath = block;

		//Mark all blocks involved with the path class
		recurseMarkPath(block);

		d3.selectAll(".nvgtt-block").transition('t1').duration(1000)
			.attr("transform", function(d) {
				var select = d3.select(this);

				if(!select.classed('nvgtt-path'))
					return select.attr("transform");

				var column = d.GetColumn();

				if(columnsPointers[column] == undefined)
					columnsPointers[column] = margin;
					
				var newX = column*300 + margin;
				var newY = columnsPointers[column];

				columnsPointers[column] += blockHeight + margin;

				return 'translate(' + newX + " " + newY + ")";
			})
			.style("opacity", function() {
				if(d3.select(this).classed('nvgtt-path'))
					return 1;

				return 0;
			}).each('end', function() {
				var select = d3.select(this);
				
				if(!select.classed('nvgtt-path'))
					select.style("display", "none");				
			});

		d3.selectAll(".nvgtt-path").select(".nvgtt-block-rect")
			.transition('t1').duration(1000)
			.attr("height", blockHeight)
			.attr("width", function(d) {
				return d.width;
			});

		d3.selectAll(".nvgtt-path").select(".nvgtt-block-text")
			.transition('t1').duration(1000)
			.attr("transform", "translate(0 -" + blockHeight/2 + ")");


	}

	function clearPath() {

		//Clear blocks marked with path class
		d3.selectAll(".nvgtt-path")
			.classed("nvgtt-path", false);

		//Refresh blocks and container screens
		nvgttChart.blocks.refresh();

		//TODO: fix bug in case various press make everything disapear

		//Clear curr path
		currPath = null;
	}

	//Function for recursively mark blocks with the path class to modify them
	function recurseMarkPath(block) {
		block.d3Select.classed("nvgtt-path", true);
		var blockDependences = block.GetDependences();
		for(var i = 0; i < blockDependences.length; i++)
			recurseMarkPath(blockDependences[i]);
	}
}