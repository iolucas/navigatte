'use strict';

angular.module('nvgttApp.content-display')
	.service("blockContent", function($http) {

	    //Get the target node content
	    this.get = function(nodeLocalId, successCallback, errorCallback) {
	        //Get the current content
	        var getPromise = $http.get("rest/get_content.php?local_id=" + nodeLocalId).then(function(response) {
	            
	            if(!angular.isFunction(successCallback))
	                return;

	            //Prepare result object

	            response.data.localId = nodeLocalId;
	            response.data.courses = response.data.courses || [];
	            response.data.books = response.data.books || [];
	            response.data.sites = response.data.sites || [];
	            response.data.notes = response.data.notes || "";

	            //Call success callback
	            successCallback(response.data);

	        }, function(error) {
	            if(angular.isFunction(errorCallback))
	                errorCallback(error);
	        });
	    }

	    //Function to post nodes user content changes to the server
	    this.set = function(contentData, successCallback, errorCallback) {

	        var saveObj = {
	            courses: contentData.courses,
	            books: contentData.books,
	            sites: contentData.sites,
	            notes: contentData.notes
	        }

	        var saveString = JSON.stringify(saveObj);
	        
	        $.post("rest/set_content.php", { saveString: saveString, localId: contentData.localId })
	            .done(function(response) {

	                if(response == "SUCCESS") {
	                    if(angular.isFunction(successCallback))
	                        successCallback(response);

	                } else if(angular.isFunction(errorCallback)) {
	                    errorCallback(arguments);  
	                }

	            }).fail(function(error) {
	                if(angular.isFunction(errorCallback))
	                    errorCallback(arguments); 
	            });
	                /*var saveObj = {
	            courses: $scope.contentData.courses,
	            books: $scope.contentData.books,
	            sites: $scope.contentData.sites,
	            notes: $scope.contentData.notes
	        }

	        var saveString = JSON.stringify(saveObj);

	        alertify.log("Saving editions...", 5000);
	        $scope.editing = false;

	        $.post("set_content.php", { saveString: saveString, nodeId: $scope.contentData.globalId })
	            .done(function(response) {
	                if(response == "SUCCESS")
	                    if(response == "SUCCESS") {
	                        alertify.success("Changes saved!", 5000);
	                    } else {
	                        alertify.error("Error while saving.", 5000);
	                        console.log(response.data);    
	                    }
	                else {
	                    alertify.error("Error while saving.", 5000);
	                    console.log(response.data);    
	                }   
	            });*/

	        /*

	        ANGULAR HTTP POST NOT WORKING WITH PHP

	        $http.post("set_content.php", { saveString: saveString, nodeId: $scope.contentData.globalId })
	            .success(function(data, status, headers, config) {
	                alertify.success(data, 5000);
	            }).error(function(data, status, headers, config) {
	                alertify.error(data, 5000);
	            });*/


	        /*$http({
	            method: "POST",
	            url: "set_content.php",
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            data: "saveString=" + saveString + "&nodeId=" + $scope.contentData.globalId

	        }).then(function(response) {
	            if(response.data == "SUCCESS") {
	                alertify.success("Changes saved!", 5000);
	            } else {
	                alertify.error("Error while saving.", 5000);
	                console.log(response.data);    
	            }

	        },function(error) {
	            alertify.error("Error while saving.", 5000);
	            console.log(error);
	        });*/
	    }

	})

	.service('baseBlocks', function($http) {

	    //Get the target block links and nodes related
	    this.get = function(nodeLocalId, successCallback, errorCallback) {
	        //Get the current content
	        var getPromise = $http.get("rest/node_path.php?id=" + nodeLocalId).then(function(response) {
	            
	            if(!angular.isFunction(successCallback))
	            	return;

	            var baseBlocks = [];

	            var mainBlockId = response.data.nodes[0].globalId;

	            //Iterate thry the links to find the ones with has the target id as the mainblock id
	            for(var linkIndex = 0; linkIndex < response.data.links.length; linkIndex++) {

	            	if(response.data.links[linkIndex].targetId != mainBlockId)
	            		continue;

	            	var currentSourceId = response.data.links[linkIndex].sourceId;

	            	//Find the block reference of this link source id and add to the baseblocks
	            	for(var blockIndex = 0; blockIndex < response.data.nodes.length; blockIndex++) {
	            		if(response.data.nodes[blockIndex].globalId == currentSourceId) {
	            			baseBlocks.push(response.data.nodes[blockIndex]);
	            			break;
	            		}
	            	}
	            }

	            successCallback(baseBlocks);	            

	        }, function(error) {
	            if(angular.isFunction(errorCallback))
	                errorCallback(error);
	        });
	    }

	});