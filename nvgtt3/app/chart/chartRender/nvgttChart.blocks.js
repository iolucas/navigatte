'use strict';

nvgttChart.blocks = new function() {
	
	//Object to handle the nodes events
	var eventHandler = new EventHandler();
	this.on = function(event, callback) {
		eventHandler.on(event, callback);
		return self;
	}

	//Variable signalizing whether or not a full refresh is needed
	var needFullRefresh = true;
	var lastContainerHeight = 0;
	window.addEventListener("resize", function() {
		needFullRefresh = true;
	});

	//Private variables
	var blocks = [];
	var blocksGlobalMap = [];	//Array to find nodes thru their globalId
	var blocksLocalMap = [];	//Array to find nodes thru their localId

	//Private Methods
	var addBlock = function(block) {
		//Check if the block exists
		var existBlock = getBlock({ globalId: block.globalId });

		//If the block already exists, return
		if(existBlock)
			return;

		//TODO: Function to validate blocks data before add them

		var newBlock = new NvgttBlock(block);

		//Push the block to the blocks array, global map and local map
		blocks.push(newBlock);
		blocksGlobalMap[newBlock.globalId] = newBlock;
		blocksLocalMap[newBlock.localId] = newBlock;

		return newBlock;
	}

	var deleteBlockByIndex = function(blockIndex) {

		//Delete the current block @ target index
		var deletedBlock = blocks[blockIndex];

		blocks.splice(blockIndex, 1);

		delete blocksGlobalMap[deletedBlock.globalId];
		delete blocksLocalMap[deletedBlock.localId];

		eventHandler.fire("delete", deletedBlock);

		return deletedBlock;	
	}

	var deleteBlockByRef = function(blockRef) {
		var refIndex = blocks.indexOf(blockRef);
		
		if(refIndex == -1)
			return null;

		return deleteBlockByIndex(refIndex);
	}

	var clearAll = function() {
		while(blocks.length > 0)
			deleteBlockByIndex(0);		
	}

	var getBlock = function(searchObject) {

		if(searchObject.hasOwnProperty('localId')) {
			return blocksLocalMap[searchObject.localId]
			/*for(var i = 0; i < blocks.length; i++) {
				if(blocks[i].localId == searchObject.localId)
					return blocks[i];
			}*/

		} else if(searchObject.hasOwnProperty('globalId')) {
			return blocksGlobalMap[searchObject.globalId];
			/*for(var i = 0; i < blocks.length; i++) {
				if(blocks[i].globalId == searchObject.globalId)
					return blocks[i];
			}*/
		}

		//If the search object is invalid, or no block were found, return null
		return null;
	}

	var refreshBlocks = function() {

		//Match blocks with DOMs by the blocks global ids
		var blocksSelection = nvgttChart.container.select().selectAll(".nvgtt-block")
			.data(blocks, function(d) { return d.globalId; });

		//Create DOM for new blocks
		createDOMs(blocksSelection.enter());

		//Remove DOM for deleted blocks
		blocksSelection.exit().each(function() {
			needFullRefresh = true;
		}).remove();
	
		//Set block positions
		refreshBlocksPositions();
	}

	var createDOMs = function(createSelection) {

		var debugColors = ["#337ab7","#5cb85c","#5bc0de","#f0ad4e","#d9534f"];

		function getRandColor() {
			return debugColors[(Math.random()*(debugColors.length-1)).toFixed()];
		}

		var blockGroup = createSelection.append("g")
			.classed("nvgtt-block", function(d) {
				needFullRefresh = true;

				d.d3Select = d3.select(this);
				return true;
			});

		var blockPathGroup = blockGroup.append("g")
			.on("click", function(d) {
				eventHandler.fire("click", d);
			})
			.on("dblclick", function(d) {
				eventHandler.fire("dblclick", d);
			});

		var blockPath = blockPathGroup.append("rect")
			.classed("nvgtt-block-rect", true);

		//Block name text
		var blockText = blockPathGroup.append("text")
			.classed("nvgtt-block-text", true)
			.attr("text-anchor", "middle")
			.text(function(d) { return d.name; })
			.attr("x", function(d) {

				d.textBox = this.getBBox();

				//Set block width and height
				var textMargin = 30;

				if(d.textBox.width < 40)
					d.textBox.width = 40;

				d.width = d.textBox.width + textMargin * 2;

				d.height = 100;

				return d.width / 2;
			})
			.attr("y", function(d) {

				var newY = (d.height - d.textBox.height) / 2 - d.textBox.y;

				return newY;
			})
			.attr("fill", function(d) {
				return d.fgcolor || "#000";
			});

		//Set block path coordinates
		blockPath
			.attr("height", function(d){ return d.height })
			.attr("width", function(d){ return d.width })
			.attr("fill", function(d) {
				return d.bgcolor || "#fff";
				//return getRandColor();
			});
	}

	function refreshBlocksPositions() {

		//If no full refresh is needed, just redraw and return
		if(!needFullRefresh) {
			redraw();
			return;
		}

		var chartWidth = nvgttChart.container.getWidth();

		//Generate rows
		var rows = [];
		var rowIndex = 0;
		var blockMargin = 2;

		for(var i = 0; i < blocks.length; i++) {
			var block = blocks[i];
			var row = rows[rowIndex];
			var createRow = false;	

			if(row) {
				if(row.width + block.width + blockMargin > chartWidth) {
					rowIndex++;
					createRow = true;
				}
			} else {
				createRow = true;
			}

			if(createRow) {
				rows[rowIndex] = {
					members: [],
					width: 0,
					height: block.height
				}

				row = rows[rowIndex];		
			}	

			row.members.push(block);
			row.width += block.width + blockMargin;
		}

		//Render rows
		var colPointer = blockMargin;
		for(var i = 0; i < rows.length; i++) {
			var rowPointer = blockMargin;
			var row = rows[i];

			var rowAddGap = i < rows.length - 1 ? (chartWidth - row.width - blockMargin) / row.members.length : 0;

			for(var j = 0; j < row.members.length; j++) {
				var block = row.members[j];

				block.rowAddGap = rowAddGap;

				//block.d3Select.select(".nvgtt-block-path").classed("nvgtt-transition", true);
				//block.d3Select.select(".nvgtt-block-text").classed("nvgtt-transition", true);

				//block.d3Select.select(".nvgtt-block-path").attr("width", block.width + rowAddGap);
				//block.d3Select.select(".nvgtt-block-text").attr("transform", "translate(" + rowAddGap/2 + ")");

				block.x = rowPointer;
				block.y = colPointer;

				rowPointer += block.width + blockMargin + rowAddGap;
			}

			colPointer += row.height + blockMargin;
		}

		lastContainerHeight = colPointer;

		redraw();

		//Clear full refresh flag
		needFullRefresh = false;

		function redraw() {

			d3.selectAll('.nvgtt-block')
				.style("display", null)
				.transition('blocksRefresh').duration(1000)
				.style("opacity", 1)
				.attr("transform", function(d) {
					return "translate(" + d.x + " " + d.y + ")";
				}).each('end', function() {
					//Fix bug in case return to this screen and things are all hide
					d3.select(this).style("display", null);
				});

			d3.selectAll('.nvgtt-block').select(".nvgtt-block-text")
				.transition('blocksRefresh').duration(1000)
				.attr("transform", function(d) {
					return "translate(" + d.rowAddGap / 2 + "0)";
				});	

			d3.selectAll('.nvgtt-block').select(".nvgtt-block-rect")
				.transition('blocksRefresh').duration(1000)
				.attr("height", function(d) { return d.height; })
				.attr("width", function(d) {
					return d.width + d.rowAddGap;
				});	

			nvgttChart.container.setHeight(lastContainerHeight, {name:'blocksRefresh', duration:1000});
		}
	}

	//Private Class
	var NvgttBlock = function(blockData) {
		var nvgttBlock = this;

		nvgttBlock.name = blockData.name;

		nvgttBlock.globalId = blockData.globalId;
		nvgttBlock.localId = blockData.localId;

		nvgttBlock.bgcolor = blockData.bgcolor;
		nvgttBlock.fgcolor = blockData.fgcolor;

		//nvgttBlock.x = parseInt(blockData.x) || 0;
		//nvgttBlock.y = parseInt(blockData.y) || 0;
		nvgttBlock.width = 0;
		nvgttBlock.height = 0;

		nvgttBlock.dependences = blockData.dependences;
	}

	NvgttBlock.prototype.GetDependences = function() {
		var depenBlocks = [];

		for(var i = 0; i < this.dependences.length; i++)
			depenBlocks.push(blocksGlobalMap[this.dependences[i]]);
			
		return depenBlocks;
	}

	NvgttBlock.prototype.GetColumn = function() {
		var column = 0;

		var dependences = this.GetDependences();

		for(var i = 0; i < dependences.length; i++) {
			var inputColumn = dependences[i].GetColumn();

			if(column <= inputColumn)
				column = inputColumn + 1;
		}

		return column;
	} 

	//Public methods
	this.add = function(blockObj) {
		//Check if the arguments is and array
		if(blockObj.constructor === Array) {

			for(var i = 0; i < blockObj.length; i++)
				addBlock(blockObj[i]);	

		} else {
			return addBlock(blockObj);
		}
	}

	//bbi = block Or Blocks Or Index
	this.delete = function(bbi) {
		return deleteBlockByRef(bbi);

		/*switch(bbi.constructor) {

			case 'Number':
				return deleteBlockByIndex(bbi);

			case 'Object':
				return deleteBlockByRef(bbi);

			case 'Array':
				var deletedBlocks = []
				for(var i = 0; i < bbi.length; i++)
					deletedBlocks.push(deleteBlockByRef(bbi[i]));
				return deletedBlocks;
		}*/
	}

	this.clearAll = function() {
		return clearAll();
	}

	this.get = function(searchObject) {
		return getBlock(searchObject);
	}

	this.refresh = function() {
		return refreshBlocks();
	}

	this.setLocalId = function(globalId, localId) {
		for(var i = 0; i < blocks.length; i++) {
			if(blocks[i].globalId == globalId && !blocks[i].localId) {
				blocks[i].localId = localId;
				return;
			}
		}
	}	
}