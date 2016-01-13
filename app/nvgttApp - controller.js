'use strict';

//Controller of the main module nvgttApp

angular.module('nvgttApp')
	.controller('NvgttAppController', function($scope, $location, searchValues) {
			//Get page username
			$scope.username = searchValues.get().user;

	        //Flag signalizing whether a content is being show
	        $scope.contentActiveFlag = $location.path() != "";

	        //Check routing changes and update the content active flag
	        $scope.$on("$routeChangeSuccess", function() {
	            $scope.contentActiveFlag = $location.path() != "";
	        });

	        $scope.loaded = false;
	    });