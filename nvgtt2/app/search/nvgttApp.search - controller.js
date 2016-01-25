'use strict';

//Controller of the search module nvgttApp

angular.module('nvgttApp.search')
	.controller('SearchController', function($scope, $q, nvgttSearch) {

		//Function to perform a server search request and filter the results
		$scope.querySearch = function(queryString) {

			//Create new promise to be passed to the query requester
			var queryDefer = $q.defer();

			nvgttSearch.query(queryString)
				.then(function(response) {
					//Must remove from the results the nodes which we already have
					//TODO: GAMBIARRA MUST BE FIXED CAUSE IT SHOULD BE DONE BY A SERVICE

					var resultArray = [];

					//Filter nodes that already exists
            		for(var i = 0; i < response.data.length; i++){
                		//If the block exist, proceed next iteration, if not, put it into the result array

                		if(nvgttChart.blocks.get({ globalId:response.data[i].globalId }))
                			continue;

                    	resultArray.push(response.data[i]);
            		}

            		queryDefer.resolve(resultArray);

				}, function(error) {
					//console.log(error);
					//queryDefer.reject(error);
					queryDefer.resolve([]);
				});

	        return queryDefer.promise;
		}

        //TODO: FIND THE BETTER WAY TO FILTER RESULTS OF LOCAL STUFF,MAYBE IS BEST TO FILTER ON THE PAGE, SINCE WE CAN FILTER THE ALREADY PLACED NODES



		//Function to be called once the search text changes
		$scope.searchTextChange = function(searchText) {

			if(searchText == false) {
				nvgttChart.project.clear();
			}
		}

		$scope.selectedItemChange = function(selectedItem) {
			console.log(selectedItem);
			//If a valid selected item, project it
			if(selectedItem)
				nvgttChart.project.create(selectedItem);
		}


	});