angular.module('nvgttApp')

.controller('NvgttAppController', function($scope, nvgttAlert, $location,$mdDialog, $window, nvgttLocation, alertify) {
    //Configure alertify
    alertify.logPosition("bottom right");
    alertify.maxLogItems(10);

    //Get page username
    $scope.username = nvgttLocation.search().user || pageName;

});