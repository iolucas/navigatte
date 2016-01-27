'use strict';

angular.module('nvgttApp')
	.config(function($routeProvider, $mdThemingProvider) {

        $routeProvider.when('/:profile/', {
            template :''
            /*keep doing profile stuff, blocks load once the profile changes
            and projections be made once a block doesn't exists*/
        })

        .when('/:profile/content/:localId', {
            controller: 'ContentDisplayController',
            templateUrl: 'app/content-display/nvgttApp.content-display - view4.html',
        })

        .when('/:profile/content/:localId/discussion/:id', {
            controller: 'DiscussionsController',
            templateUrl: 'app/discussions/nvgttApp.discussions - view.html',
        });

        //Configuration of the theme
        /*$mdThemingProvider.theme('default')
            .primaryPalette('blue-grey',{
                'default': '900'
            })
            .accentPalette('teal')
            .backgroundPalette('teal');*/
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
