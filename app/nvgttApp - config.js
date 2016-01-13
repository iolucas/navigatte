'use strict';

angular.module('nvgttApp')
	.config(function($routeProvider, $mdThemingProvider) {

        $routeProvider.when('/content/:localId', {
            controller: 'ContentDisplayController',
            templateUrl: 'app/content-display/nvgttApp.content-display - view.html',
        })

        .when('/discussion/:id', {
            controller: 'DiscussionsController',
            templateUrl: 'app/discussions/nvgttApp.discussions - view.html',
        });

        //Configuration of the theme
          $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('brown');

/* candidates 

purple
blue
light-blue
cyan
green
brown
blue-gray



*/


    });
