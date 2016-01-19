'use strict';

angular.module('nvgttApp.chart')
	
.controller('ChartController', function($scope, $window, $location, nvgttChart, nvgttBlocks, alertify) {
	
	/*var columns = [];

	$scope.blocks = [
		{
			name: "Teste",
			column: 0
		},
		{
			name:"teste2",
			column: 1
		}
	];

	var refreshBlocks = function() {


	}*/


	/*nvgttBlocks.get($scope.username)
		.then(function(response) {
			if(response.data.result == "SUCCESS")
				$scope.blocks = response.data.nodes;
		});*/

	


	/*$scope.chartHeight = $window.innerHeight;
	$scope.chartWidth = $window.innerWidth;

	$window.onresize = function(){
		console.log("test");
		$scope.chartHeight = $window.innerHeight;
		$scope.chartWidth = $window.innerWidth;
		console.log($scope.chartHeight);
	}*/



	/*$scope.nodes = [];


	chartData.get($scope.username, function(response){
		console.log(response);
		$scope.nodes = response.nodes;

	}, function(error){
		console.log(error);
		alertify.error("Error while getting user information");
	});*/

});