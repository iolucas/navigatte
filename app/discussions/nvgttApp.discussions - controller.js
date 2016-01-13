'use strict';

angular.module('nvgttApp.discussions')
	.controller('DiscussionsController', function($scope) {

    $scope.discussion = {
        name: "Is there a way of doing something?",
        author: "Lucas V. Oliveira",
        content: "Is there a way of doing something? I mean, do anything.",
        comments: [
            {
                author: "Luke Skywalker",
                content: "Yes, I guess it is"
            },
            {
                author: "Han Solo",
                content: "Sure man, go ahead!"
            }
        ]
    }
});