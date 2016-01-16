'use strict';

//Controller of the search module nvgttApp

angular.module('nvgttApp.search')
	.controller('SearchController', function($scope, $q, nvgttSearch, nvgttChart) {

		//Function to perform a server search request and filter the results
		$scope.querySearch = function(queryString) {

			//Create new promise to be passed to the query requester
			var queryDefer = $q.defer();

			nvgttSearch.query(queryString)
				.then(function(response) {
					//Must remove from the results the nodes which we already have
					//GAMBIARRA MUST BE FIXED CAUSE IT SHOULD BE DONE BY A SERVICE

					var resultArray = [];

					//Filter nodes that already exists
            		for(var i = 0; i < response.data.length; i++){
                		//If the id do not exists, push the item to the result array
                		if(Navigatte.Nodes.Get(response.data[i].globalId) == null) {
                    		resultArray.push(response.data[i]);
                		}  
            		}

            		queryDefer.resolve(resultArray);

				}, function(error) {
					//console.log(error);
					//queryDefer.reject(error);
					queryDefer.resolve([]);
				});

	        return queryDefer.promise;
		}




		//Function to be called once a 
		$scope.searchTextChange = function(searchText) {

			if(searchText == false) {
				Navigatte.Nodes.ClearProjection();
				Navigatte.Links.ClearProjection();
				Navigatte.Nodes.Refresh();
				Navigatte.Links.Refresh();
			}


			//console.log("Search text changed: " + $scope.searchText);
			//$scope.searchItems.push('new');
		}

		$scope.selectedItemChange = function(selectedItem) {
			//console.log("Item selected: " + $scope.selectedItem);

			//$window.location.href = '#/content/49';

			//If a valid selected item, project it
			if(selectedItem)
				nvgttChart.Project(selectedItem.localId);

		}


	});