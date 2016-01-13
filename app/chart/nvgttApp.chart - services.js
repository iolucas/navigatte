'use strict';

angular.module('nvgttApp.chart')
	.service("chartData", function($http) {
	    //Get the target node content
	    //$.get("rest/user_data.php", { user: username, nodes: true, links: true })
	    this.get = function(username, successCallback, errorCallback) {
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
	    }
	});