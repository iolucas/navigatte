'use strict';

angular.module('nvgttApp.content-display')
	.controller('ContentDisplayController', function($scope, $routeParams, $location, blockContent, blockDiscussions, baseBlocks, alertify) {

    $scope.editing = false;

    //$scope.username = pageName;

    //Load the user content data
    blockContent.get($routeParams.localId, function(contentData) {
        $scope.contentData = contentData;
    }, function(error) {
        alertify.error("ERROR WHILE LOADING CONTENT.");
        console.log(error);
    });

    //Load the block discussions
    blockDiscussions.getAll("", function(discussions) {
        $scope.discussions = discussions;
    }, function(error) {
        alertify.error("ERROR WHILE LOADING DISCUSSIONS.");
        console.log(error);
    });

    //Load baseBlocks
    baseBlocks.get($routeParams.localId, function(baseBlocks) {
        $scope.baseBlocks = baseBlocks;
    }, function(error) {
        alertify.error("ERROR WHILE GETTING BASE BLOCKS.");
        console.log(error);
    });

    //Function to remove an item from an array
    $scope.removeItem = function(array, index) {
        //array.splice(index, 1);
    }

    //Function to add an element to an array if it doesn't exists
    $scope.addItem = function(array, item) {
        if(item != "") {
            array.push(item);
            item = "";
        }
    }

    //Var to store the content data backup to be restored in case changes are canceled
    var contentDataBackup = null;

    //Function to enable editing content
    $scope.startChanges = function() {
        $scope.editing = true;
        contentDataBackup = JSON.stringify($scope.contentData);     
    }

    //Function to cancel any changes made
    $scope.cancelChanges = function() {
        if(contentDataBackup != null) {
            $scope.contentData = JSON.parse(contentDataBackup);
            contentDataBackup = null;
        }

        $scope.editing = false;
    }

    //Function to post changes
    $scope.saveChanges = function() {

        alertify.log("Saving editions...", 5000);

        blockContent.set($scope.contentData, function() {
            alertify.success("Changes saved!", 5000);
        }, function(error) {
            alertify.error("Error while saving.", 5000);
            console.log(error);    
        });

        contentDataBackup = null;
        $scope.editing = false;
    }

});