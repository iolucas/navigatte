'use strict';

//TODO: Must create system for draw links in a proper way to show them better

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
		//var columnsPointers = [];

		var columns = [];

		//Array to store the path links generated
		var pathLinks = [];

		//Set the current path block variable
		currPath = block;

		//Mark all blocks involved with the path class
		recurseMarkPath(block);

		//Set new coordinates for nodes which got path
		d3.selectAll(".nvgtt-path").each(function(d) {

			//Populate columns
			var blockColumn = d.GetColumn();

			if(columns[blockColumn] == undefined)
				columns[blockColumn] = {
					members: [],
					width: 0
				}

			var column = columns[blockColumn];

			column.members.push(d);

			if(d.width > column.width)
				column.width = d.width;

			/*d.path = {
				y: column.members.length*(blockHeight+margin),
				width: d.width,
				height: blockHeight
			}*/


			/*var column = d.GetColumn();
						
			if(columnsPointers[column] == undefined)
				columnsPointers[column] = margin;

			var newX = column*300 + margin;
			var newY = columnsPointers[column];

			columnsPointers[column] += blockHeight + margin;

			d.path = {
				x: newX,
				y: newY,
				width: d.width,
				height: blockHeight
			}*/

			//Populate path links
			for(var i = 0; i < d.dependences.length; i++) {
				var dpGlobalId = d.dependences[i];

				//Get dependence ref
				var dpRef = nvgttChart.blocks.get({ globalId: dpGlobalId });

				pathLinks.push({
					target: d,
					source: dpRef
				});
			}
		});


		//Calculate col gap
		var colsWidth = 0;
		for(var i = 0; i < columns.length; i++) {
			colsWidth += columns[i].width;
		}

		var colGap = (nvgttChart.container.getWidth()-2*margin - colsWidth) / (columns.length-1);

		if(colGap < 100)
			colGap = 100;
		else if(colGap > 500)
			colGap = 500;

		var colsXPointer = margin;

		var higherCol = 0;

		//Iterate thru column to complete members data
		for(var i = 0; i < columns.length; i++) {
			var column = columns[i];

			var colYPointer = margin;

			for(var j = 0; j < column.members.length; j++) {
				var member = column.members[j];

				member.path = {
					x: colsXPointer,
					y: colYPointer,
					width: member.width,
					height: blockHeight
				}

				colYPointer += blockHeight + margin;

				if(colYPointer > higherCol)
					higherCol = colYPointer;
			}

			colsXPointer += column.width + colGap;
		}


		//Create links
		nvgttChart.container.select().selectAll(".nvgtt-link-path")
			.data(pathLinks).enter()
			.insert("path", ":first-child")
			.classed("nvgtt-link-path", true)
			.attr("d", drawLinkPath)
			.attr("opacity", 0)
			.transition('t1').duration(1000)
			.attr("d", function(d) {
				return drawLinkPath({
					source: d.source.path,
					target: d.target.path
				});
			})
			.attr("opacity", 1);


		d3.selectAll(".nvgtt-block").transition('t1').duration(1000)
			.attr("transform", function(d) {
				var select = d3.select(this);

				if(d.path == undefined)
					return select.attr("transform");

				return 'translate(' + d.path.x + " " + d.path.y + ")";
			})
			.style("opacity", function(d) {
				if(d.path)
					return 1;

				return 0;
			}).each('end', function(d) {
				
				if(d.path == undefined)
					d3.select(this).style("display", "none");				
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

		nvgttChart.container.setHeight(higherCol, {name: 't1', duration: 1000});
	}

	function clearPath() {

		//Clear blocks marked with path class
		d3.selectAll(".nvgtt-path")
			.classed("nvgtt-path", false)
			.each(function(d) {
				if(d.path)
					delete d.path;
			});

		d3.selectAll(".nvgtt-link-path")
		.transition().duration(1000)
		.attr("d", drawLinkPath)
		.attr("opacity", 0)
		.remove();

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

	//Function to draw the path of a diagonal line (x and y are inverted for right line projection)
	var drawLinkPath = d3.svg.diagonal()
		.source(function(link) { 
			return { 
				x: link.source.y + link.source.height/2, 
				y: link.source.x + link.source.width 
			}; 
		})            
		.target(function(link) { 
			return { 
				x: link.target.y + link.target.height/2, 
				y: link.target.x 
			}; 
		})
		.projection(function(d) { 
			return [d.y, d.x]; 
		});
}