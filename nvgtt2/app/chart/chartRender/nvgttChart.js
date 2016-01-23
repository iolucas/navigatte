'use strict';

var nvgttChart = new function() {

	this.load = function(blocks, links) {

		populateLinksOnBlocks(blocks, links);

		nvgttChart.blocks.add(blocks);


		nvgttChart.blocks.refresh();


		//Methods to execute screen refresh when resize
		var timeOutRef = null;
		window.addEventListener("resize", function() {
			if(timeOutRef)
				clearTimeout(timeOutRef);

			timeOutRef = setTimeout(function(){
				timeOutRef = null;

				//If there is no path been showing
				if(!nvgttChart.path.isShowing())
					nvgttChart.blocks.refresh();

			}, 200);
		});
	}

	function populateLinksOnBlocks(blocks, links) {
		
		//Create blocks map and dependence array
		var blocksMap = [];
		for(var i = 0; i < blocks.length; i++) {
			var block = blocks[i];
			block.dependences = [];
			blocksMap[block.globalId] = block;
		}

		for(var i = 0; i < links.length; i++) {
			var link = links[i];

			//If any of the blocks do not exist, proceed next iteration
			if(!blocksMap[link.sourceId] || !blocksMap[link.targetId])
				continue;

			blocksMap[link.targetId].dependences.push(link.sourceId)
		}
	}
}


