'use strict';

angular.module('nvgttApp.chart')
	.service("nvgttBlocks", function($http) {

		var nvgttBlocks = this;

		nvgttBlocks.get = function(username) {
			return $http.get("rest/user_data.php?user=" + username + "&nodes&links");		
		}


	})

	.service("nvgttChart", function($http, $q, alertify) {

		var nvgttChart = this;

	    //Get the target node content
	    //$.get("rest/user_data.php", { user: username, nodes: true, links: true })
	    /*this.get = function(username, successCallback, errorCallback) {
	        //Get the current content
	        var getPromise = $http.get("rest/user_data.php?nodes&links&user=" + username).then(function(response) {
	            
	            if(!angular.isFunction(successCallback))
	                return;

	            //Prepare result object

	            //Call success callback
	            successCallback(response.data);

	        }, function(error) {
	            if(angular.isFunction(errorCallback))
	                errorCallback(error);
	        });
	    }*/

	    //Function to project nodes
	    this.Project = function(localId) {
	    	nvgttChart.GetBlockPath(localId)
	    		.then(function(response) {
	    			Navigatte.Project(response);
	    		}, function(error){
	    			console.log(error);
	    			alertify.alert("Error while projecting nodes.", 5000);
	    		});
	    }

	    this.GetBlockPath = function(localId) {

	    	var defer = $q.defer();

	    	$http.get("rest/node_path.php?id=" + localId)
	    		.then(function(response) {
	    			defer.resolve(response.data);
	    		}, defer.reject);

	    	return defer.promise;
	    }



	});