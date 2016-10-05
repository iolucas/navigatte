'use strict';

angular.module('nvgttApp.discussions')
    .service("blockDiscussions", function($timeout) {

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