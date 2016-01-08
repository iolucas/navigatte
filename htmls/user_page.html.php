<!DOCTYPE html>
<html ng-app="nvgttApp">
	<head>
		<meta charset="UTF-8">
        <link rel="stylesheet" href="css/nvgtt-navbar.css"/>
	    <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="css/sidemenu.css"/>
        <link rel="stylesheet" href="css/box-container.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular-route.js"></script>    

        <title><?php if(isset($username)) htmlout($userInfo['screen_name'] . " | "); ?>Navigatte</title> 
        <style>
            table,td,tr {
                border: 0px solid #000;
            }

        </style>
	</head>

	<body ng-controller="NvgttController">

        <!--Blocks Container-->
        <svg class="svg-container" style="visibility:{{ contentActiveFlag ? 'hidden' : 'visible' }};">
            <rect id="node-container-mouse-area"></rect>
        </svg>

        <!--Top Navigate Bar Container-->
        <?php include 'navbar.html.php'; ?>

        <!--Content and lateral menu container-->
        <table style="position:relative;">
            <tbody>
                <tr style="vertical-align:top;" >
                    <td>
                        <?php include 'sidemenu.html.php'; ?>
                    </td>
                    
                    <td ng-show="contentActiveFlag" style="text-align:center;vertical-align:top;width:100%;" 
                        class="nvgtt-border">
                        <!--Node Content View-->
                        <section ng-view class="nvgtt-content-window"></section>
                    </td>

                    <td ng-show="contentActiveFlag">
                        <div style="width:300px;"></div>
                    </td>
                </tr>
            </tbody>
        </table>       
        
        <!---->
        <script src="js/jquery-2.1.4.min.js"></script>
        <script src="js/eventhandler.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <script src="https://cdn.rawgit.com/alertifyjs/alertify.js/v1.0.6/dist/js/ngAlertify.js"></script>
		<script src="js/d3.v3.min.js"></script>
        <script src="js/g-query.js"></script>
        <script src="js/grow-modal.js"></script>
        <script src="modules/content-show/controller.js"></script>

        <script src="navigatte/navigatte.js"></script>
        <script src="navigatte/navigatte-container.js"></script>
        <script src="navigatte/navigatte-nodes.js"></script>
        <script src="navigatte/navigatte-links.js"></script>
        <script src="navigatte/navigatte-select.js"></script>
        <script src="navigatte/navigatte-content.js"></script>
        <script src="navigatte/navigatte-content-modal.js"></script>
        <script src="navigatte/navigatte-node-finder.js"></script>
        <script src="navigatte/navigatte-project.js"></script>
        <script src="navigatte/navigatte-search.js"></script>

        <?php if (!isset($username)): ?>
            <script src="navigatte/navigatte-changes.js"></script>
            <script src="navigatte/navigatte-changes-node.js"></script>
            <script src="navigatte/navigatte-create-modal.js"></script>
            <script src="navigatte/navigatte-create-links.js"></script>
            <script src="navigatte/navigatte-changes-link.js"></script>
            <script src="navigatte/navigatte-keyactions.js"></script>
        <?php endif ?>         

        <script src="app.js"></script>
        <script>
            'use strict';

            //Init nvgtt app with its dependent modules
            angular.module('nvgttApp',['ngRoute','nvgttApp.content'])

            .config(function($routeProvider) {
                    $routeProvider.when('/content/:localId', {
                        controller: 'ContentController',
                        templateUrl: 'modules/content-show/content.html',
                    }).when('/discussion/:id', {
                        controller: 'DiscussionController',
                        templateUrl: 'modules/content-show/discussion.html',
                    });
                })

            .controller('NvgttController', function($scope, $location) {
                    //Flag signalizing whether a content is being show
                    $scope.contentActiveFlag = $location.path() != "";

                    //Check routing changes and update the content active flag
                    $scope.$on("$routeChangeSuccess", function() {
                        $scope.contentActiveFlag = $location.path() != "";
                    });

                });

            var pageName = '<?php htmlout($userInfo['page_name']); ?>';   

            <?php if (!isset($username)): ?>
                $("#createNodeButton").click(Navigatte.CreateModal.Open);
            <?php endif ?>    

            initApp(pageName);        

        </script>
	</body>
</html>