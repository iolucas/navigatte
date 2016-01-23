angular.module('nvgttApp.chart')

//maybe consider use of flat design instead of material
//pinterest for content


.controller('ChartController', function($location, userBlocks) {
	var username = $location.search().user || 'lucas';

	userBlocks.get(username).then(function(resp) {
		if(resp.data.result == 'SUCCESS')
			nvgttChart.load(resp.data.nodes, resp.data.links)
		else {
			console.log(resp);
			throw 'Error while loading user blocks';
		}
	});
});