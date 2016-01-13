<!DOCTYPE html>
<html ng-app="nvgttApp">
	<head>
		<meta charset="UTF-8">
        <link href='https://fonts.googleapis.com/css?family=Muli|Josefin+Sans|Maven+Pro|Righteous|Fredoka+One' rel='stylesheet' type='text/css'>
        
        <!-- Angular Material CSS now available via Google CDN; version 0.9.4 used here -->
        <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.css">

        <link rel="stylesheet" href="assets/css/nvgtt-navbar.css"/>
	    <link rel="stylesheet" href="assets/css/style.css"/>
        <link rel="stylesheet" href="assets/css/sidemenu.css"/>
        <link rel="stylesheet" href="assets/css/box-container.css"/>
        <link rel="stylesheet" href="app/chart/style.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

        <!--    Begin Angular Modules -->


        

        <!-- Angular Material Dependencies -->
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-animate.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-aria.min.js"></script>

        <!-- Angular Material Javascript now available via Google CDN; version 0.9.4 used here -->
        <script src="//ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.js"></script>

        

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular-route.js"></script>

        <script src="https://cdn.rawgit.com/alertifyjs/alertify.js/v1.0.6/dist/js/ngAlertify.js"></script>        

        <script src="app/nvgttApp - module.js"></script>
        <script src="app/nvgttApp - controller.js"></script>
        <script src="app/nvgttApp - config.js"></script>
        <script src="app/nvgttApp - services.js"></script>

        <!--<script src="app/chart/nvgttApp.chart - module.js"></script>
        <script src="app/chart/nvgttApp.chart - services.js"></script>
        <script src="app/chart/nvgttApp.chart - controller.js"></script>-->

        <script src="app/content-display/nvgttApp.content-display - module.js"></script>
        <script src="app/content-display/nvgttApp.content-display - services.js"></script>
        <script src="app/content-display/nvgttApp.content-display - controller.js"></script>

        <script src="app/discussions/nvgttApp.discussions - module.js"></script>
        <script src="app/discussions/nvgttApp.discussions - services.js"></script>
        <script src="app/discussions/nvgttApp.discussions - controller.js"></script>

        <!--    End Angular Modules -->

        <title><?php if(isset($username)) htmlout($userInfo['screen_name'] . " | "); ?>Navigatte</title> 
        <style>
            table,td,tr {
                border: 0px solid #000;
                height: 100%;
            }

            .fixed-top {
                position: fixed;
                top:0;
            }

            .full-height {
                height: 100%;
            }

             /**
             * Hide when Angular is not yet loaded and initialized
             */
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
              display: none !important;
            }

        </style>
	</head>

	<body ng-controller="NvgttAppController" ng-cloak>

        <!--Blocks Container-->
        <?php include 'chart.html.php'; ?>
        <!--<div ng-include="'app/chart/nvgttApp.chart - view.html'"></div>-->

        <!--Top Navigate Bar Container-->
        <?php include 'navbar2.html.php'; ?>

        <?php include 'sidemenu2.html.php'; ?>

        <!--<div ng-hide="contentActiveFlag">
            
        </div>-->

        <section ng-view class="nvgtt-content-window"></section>

        <!--Content and lateral menu container-->
        <table style="position:relative;" ng-if="contentActiveFlag && false">
            <tbody>
                <tr style="vertical-align:top;" >
                    <td>
                        <?php include 'sidemenu.html.php'; ?>
                    </td>
                    
                    <td style="text-align:center;vertical-align:top;width:100%;" 
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
        <script src="assets/js/jquery-2.1.4.min.js"></script>
        <script src="assets/js/eventhandler.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		<script src="assets/js/d3.v3.min.js"></script>
        <script src="assets/js/g-query.js"></script>
        <script src="assets/js/grow-modal.js"></script>
        <!--<script src="modules/content-show/controller.js"></script>-->

        <script src="assets/js/navigatte/navigatte.js"></script>
        <script src="assets/js/navigatte/navigatte-container.js"></script>
        <script src="assets/js/navigatte/navigatte-nodes.js"></script>
        <script src="assets/js/navigatte/navigatte-links.js"></script>
        <script src="assets/js/navigatte/navigatte-select.js"></script>
        <script src="assets/js/navigatte/navigatte-content.js"></script>
        <script src="assets/js/navigatte/navigatte-content-modal.js"></script>

        <?php if (!isset($username)): ?>
            <script src="assets/js/navigatte/navigatte-node-finder.js"></script>
            <script src="assets/js/navigatte/navigatte-project.js"></script>
            <script src="assets/js/navigatte/navigatte-search.js"></script>
            <script src="assets/js/navigatte/navigatte-changes.js"></script>
            <script src="assets/js/navigatte/navigatte-changes-node.js"></script>
            <script src="assets/js/navigatte/navigatte-create-modal.js"></script>
            <script src="assets/js/navigatte/navigatte-create-links.js"></script>
            <script src="assets/js/navigatte/navigatte-changes-link.js"></script>
            <script src="assets/js/navigatte/navigatte-keyactions.js"></script>
        <?php endif ?>         

        <script src="assets/js/app.js"></script>
        <script>
            'use strict';

            var pageName = '<?php htmlout($userInfo['page_name']); ?>';   

            <?php if (!isset($username)): ?>
                $("#createNodeButton").click(Navigatte.CreateModal.Open);
            <?php endif ?>    

            initApp(pageName);        

        </script>
	</body>
</html>