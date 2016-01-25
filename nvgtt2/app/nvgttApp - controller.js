angular.module('nvgttApp')

.controller('NvgttAppController', function($scope, nvgttAlert, nvgttProfile, $location,$mdDialog, $window, nvgttLocation, alertify) {
    //Configure alertify
    alertify.logPosition("bottom right");
    alertify.maxLogItems(10);

    //Get page username
    $scope.username = nvgttLocation.search().user || 'lucas';

    $scope.profile = '';

    $scope.$on("$routeChangeSuccess", function(ev, route) {

    	if(route && route.params.hasOwnProperty('profile')) {
            if($scope.profile != route.params.profile) {
	    	    $scope.profile = route.params.profile;    
                $scope.$broadcast('profileChanged', $scope.profile);
            }

            //$scope.profile = $routeParams.profile;

	    	//$scope.$emit('profileChanged', $scope.profile);

	    	/*nvgttProfile.get($routeParams.profile).then(function(resp) {
	    		console.log(resp);


	    	});*/
    	}


    });

    //must check how content will be displayed and what content
    //when we click open the block stuff with projections and data attched to it but with references from the user you are on

    //mouse over, circulate the path

    //keep user info minimizede

});