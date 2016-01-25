'use strict';

angular.module('nvgttApp.search')
	.service("nvgttSearch", function($http) {

		this.query = function(queryString) {

			//Create new promise to be passed to the query requester
			//var queryPromise = $q.defer();

			//Get the current content
	        return $http.get("../rest/find_nodes.php?node_name=" + queryString);
		        
		        /*.then(function(response) {

		            queryPromise.resolve(response.data); 

		        }, queryPromise.reject);

	        return queryPromise.promise;*/
		}	    

	});