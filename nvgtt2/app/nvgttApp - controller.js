angular.module('nvgttApp')

.controller('NvgttAppController', function($scope, nvgttAlert, nvgttProfile, $location,$mdDialog, $window, nvgttLocation, alertify) {
    //Configure alertify
    alertify.logPosition("bottom right");
    alertify.maxLogItems(10);

    //Get page username
    //$scope.username = nvgttLocation.search().user || 'lucas';

    $scope.userName = '';
    $scope.userProfileName = '';
    $scope.userDescription = '';
    $scope.userProfilePic = '';

    $scope.$on("$routeChangeSuccess", function(ev, route) {

    	if(route && route.params.hasOwnProperty('profile') && $scope.userName != route.params.profile) {
            
            $scope.$broadcast('profileChanged');

            $scope.userName = route.params.profile;

            nvgttProfile.get($scope.userName).then(function(resp) {
                $scope.$broadcast('profileInfo', resp.data);
            });         
        }
    });

    console.log('must create name for the project');

    $scope.$on('profileInfo', function(ev, profileData) {
        $scope.userProfileName = profileData.screen_name;
        $scope.userDescription = profileData.screen_description;
        $scope.userProfilePic = '../assets/img/' + profileData.profile_pic;   
    });

    $scope.$on('profileChanged', function(ev) {
        $scope.userName = '';
        $scope.userProfileName = '';
        $scope.userDescription = '';
        $scope.userProfilePic = '';
    });





            

            /*if($scope.profile != route.params.profile) {
                $scope.profile = route.params.profile;    
                $scope.$broadcast('profileChanged', $scope.profile);
            }*/

            //$scope.profile = $routeParams.profile;

            //$scope.$emit('profileChanged', $scope.profile);

            /*nvgttProfile.get($routeParams.profile).then(function(resp) {
                console.log(resp);


            });*/

    //must check how content will be displayed and what content
    //when we click open the block stuff with projections and data attched to it but with references from the user you are on

    //mouse over, circulate the path

    //keep user info minimizede

});