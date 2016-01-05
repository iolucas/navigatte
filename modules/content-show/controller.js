'use strict';

angular.module('nvgtt.content',['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/content/:localId', {
        controller: 'ContentController',
        templateUrl: 'modules/content-show/view.html',
    });
});

angular.module('nvgtt.content').controller('ContentController', function($scope, $http, $location, $routeParams) {
    
    $http.get("get_content.php?local_id=" + $routeParams.localId)
        .then(function(response) {

            //response.data.owner = false;
            //console.log(response);

            $scope.contentData = response.data;

        }, function(error) {
            $scope.contentData = JSON.stringify(error);
        });

    $scope.removeItem = function(array, index) {
        array.splice(index, 1);
    }

    $scope.addItem = function(array, item) {
        if(item == "")
            return;

        array.push(item);
        item = "";
    }

    $scope.saveChanges = function() {
        console.log($scope.contentData);

        var saveObj = {
            courses: $scope.contentData.courses,
            books: $scope.contentData.books,
            sites: $scope.contentData.sites,
            notes: $scope.contentData.notes
        }

        var saveString = JSON.stringify(saveObj);

        alertify.log("Saving editions...", 5000);

        $http({
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
        });
    }

});