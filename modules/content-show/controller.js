'use strict';

angular.module('nvgttApp.content',['ngRoute', 'ngAlertify']).config(function($routeProvider) {
    $routeProvider.when('/content/:localId', {
        controller: 'ContentController',
        templateUrl: 'modules/content-show/content.html',
    }).when('/discussion/:id', {
        controller: 'DiscussionController',
        templateUrl: 'modules/content-show/discussion.html',
    });
});


angular.module('nvgttApp.content').service("blockContent", function($http) {

    //Get the target node content
    this.get = function(nodeLocalId, successCallback, errorCallback) {
        //Get the current content
        var getPromise = $http.get("get_content.php?local_id=" + nodeLocalId).then(function(response) {
            
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

            //Get the current content
    /*$http.get("get_content.php?local_id=" + $routeParams.localId)
        .then(function(response) {

            $scope.contentData = response.data;

            $scope.contentData.courses = $scope.contentData.courses || [];
            $scope.contentData.books = $scope.contentData.books || [];
            $scope.contentData.sites = $scope.contentData.sites || [];
            $scope.contentData.notes = $scope.contentData.notes || "";

        }, function(error) {
            alertify.error("ERROR WHILE LOADING CONTENT.");
            console.log(error);
        });*/
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
        
        $.post("set_content.php", { saveString: saveString, localId: contentData.localId })
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

});

angular.module('nvgttApp.content').service("blockDiscussions", function($timeout) {

    this.getAll = function(blockGlobalId, success, error) {

        var discussions = [
            {
                title: "Teste discussion"
            },
                        {
                title: "Teste discussion"
            },
                        {
                title: "Teste discussion"
            },
                        {
                title: "Teste discussion"
            },
                        {
                title: "Teste discussion"
            },
                        {
                title: "Teste discussion"
            }

        ];


        $timeout(function() {
            if(angular.isFunction(success))
                success(discussions);  


        }, 2000);        


    }
});

angular.module('nvgttApp.content').controller('DiscussionController', function($scope) {

    $scope.discussion = {
        name: "Is there a way of doing something?",
        author: "Lucas V. Oliveira",
        content: "Is there a way of doing something? I mean, do anything.",
        comments: [
            {
                author: "Luke Skywalker",
                content: "Yes, I guess it is"
            },
            {
                author: "Han Solo",
                content: "Sure man, go ahead!"
            }
        ]
    }



});

angular.module('nvgttApp.content').controller('ContentController', function($scope,$routeParams,$location,blockContent,blockDiscussions,alertify) {

    //Config alertify
    alertify.logPosition("bottom right");
    alertify.maxLogItems(10);

    $scope.editing = false;

    $scope.username = pageName;

    $scope.contentData = null;
    $scope.discussions = null;

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