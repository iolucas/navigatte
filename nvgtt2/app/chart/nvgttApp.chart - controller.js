angular.module('nvgttApp.chart')

//TODO: maybe consider use of flat design instead of material
//TODO: pinterest for content


.controller('ChartController', function($scope, $timeout, nvgttLocation, $routeParams, $window, userBlocks, alertify) {

	//Execute all bootstrap functions here, events registrations etc...
	nvgttChart.container.init();

	nvgttChart.blocks.on('click', function(block) {
		nvgttLocation.go('#/content/' + block.localId);
	});

	//Methods to execute screen refresh when resize
	//User timeout for performance issues
	var timeOutRef = null;
	$window.addEventListener("resize", function() {
		if(timeOutRef)
			$timeout.cancel(timeOutRef);

		timeOutRef = $timeout(function(){
			timeOutRef = null;

			//If there is no path been showing
			if(!nvgttChart.path.isShowing())
				nvgttChart.blocks.refresh();

		}, 200);
	});

	//Get this user blocks
	userBlocks.get($scope.username).then(function(resp) {
		if(resp.data.result == 'SUCCESS') {

			onBlocksLoad(resp.data.nodes, resp.data.links);

		} else {
			console.log(resp);
			throw 'Error while loading user blocks';
		}
	});

	function onBlocksLoad(blocks, links) {
		populateLinksOnBlocks(blocks, links);

		nvgttChart.blocks.add(blocks);
		nvgttChart.blocks.refresh();

		//Register event to be throw when a route change occurrs
		$scope.$on("$routeChangeSuccess", function(ev, route) {

			if(route) {	//if there is any route

				var localId = route.params.localId;
				var pathBlock = nvgttChart.blocks.get({ localId: localId });
				nvgttChart.path.generatePath(pathBlock);

			} else {	//if there is no route, clear the current path
				nvgttChart.path.clearPath();
			}

		});

		//Check if there is any route, if so, generate its path
		if($routeParams.hasOwnProperty('localId')) {
			var localId = $routeParams.localId;
			var pathBlock = nvgttChart.blocks.get({ localId: localId });
			nvgttChart.path.generatePath(pathBlock);
		}
	}
});

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