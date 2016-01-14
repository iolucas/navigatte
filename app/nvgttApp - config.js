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
            .primaryPalette('blue-grey',{
                'default': '900'
            })
            .accentPalette('teal')
            .backgroundPalette('teal');
/*
Palette
Primary:blue-grey 900
Accent: Teal: 900, A200




*/



/* candidates 

red
pink
purple
deep-purple
indigo
blue
light-blue
cyan
teal
green
light-green
lime
yellow
amber
orange
deep-orange
brown
grey
blue-grey



*/


    });
