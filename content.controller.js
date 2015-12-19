angular.module("naviApp").controller("ContentController", function($scope, testService) {
    $scope.editing = false;

    $scope.content = testService.getContent();

    $scope.removeItem = function(array, index) {
        array.splice(index, 1);
    }

    $scope.addItem = function(array, item) {
        if(item == "")
            return;

        array.push(item);
        item = "";
    }

    $scope.save = function() {
        $scope.editing = false;
    }

    $scope.edit = function() {
        $scope.editing = true;
    }

});