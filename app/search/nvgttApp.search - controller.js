'use strict';

//Controller of the search module nvgttApp

angular.module('nvgttApp.search')
	.controller('SearchController', function($scope, $window, $http, $q) {
		$scope.searchItems = ['lucas','oliveira'];

		$scope.querySearch = function() {

			//Create new promise to be passed to the query requester
			var queryPromise = $q.defer();

			//Get the current content
	        $http.get("rest/find_nodes.php?node_name=" + $scope.searchText).then(function(response) {
	            
	            queryPromise.resolve(response.data);  

	        }, function(error) {

	        	queryPromise.resolve([]);  

	        });

	        return queryPromise.promise;

			return ['lucas','oliveira'];
		}




		//Function to be called once a 
		$scope.searchTextChange = function() {
			console.log("Search text changed: " + $scope.searchText);
			//$scope.searchItems.push('new');
		}

		$scope.selectedItemChange = function() {
			console.log("Item selected: " + $scope.selectedItem);
			//$window.location.href = '#/content/49';
		}


	});