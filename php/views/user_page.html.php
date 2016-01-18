<!DOCTYPE html>
<html ng-app="nvgttApp">
	<head>
		<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link href='https://fonts.googleapis.com/css?family=Muli|Josefin+Sans|Maven+Pro|Righteous|Fredoka+One' rel='stylesheet' type='text/css'>
        
        <link rel="stylesheet" href="assets/css/angular-material.css">

        <link rel="stylesheet" href="assets/css/nvgtt-navbar.css"/>
	    <!--<link rel="stylesheet" href="assets/css/style.css"/>-->
        <link rel="stylesheet" href="assets/css/sidemenu.css"/>
        <link rel="stylesheet" href="assets/css/box-container.css"/>
        <!--<link rel="stylesheet" href="app/chart/style.css"/>-->
        <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">-->

        <!--    Begin Angular Modules -->


        <!-- Angular Material Dependencies -->
        <script src="assets/js/angular.js"></script>
        <script src="assets/js/angular-animate.js"></script>
        <script src="assets/js/angular-aria.js"></script>
        <script src="assets/js/angular-material.js"></script>
        <script src="assets/js/angular-route.js"></script>


        

        <script src="https://cdn.rawgit.com/alertifyjs/alertify.js/v1.0.6/dist/js/ngAlertify.js"></script>        

        <script src="app/nvgttApp - module.js"></script>
        <script src="app/nvgttApp - controller.js"></script>
        <script src="app/nvgttApp - config.js"></script>
        <script src="app/nvgttApp - services.js"></script>

        <script src="app/chart/nvgttApp.chart - module.js"></script>
        <script src="app/chart/nvgttApp.chart - services.js"></script>
        <script src="app/chart/nvgttApp.chart - controller.js"></script>

        <script src="app/content-display/nvgttApp.content-display - module.js"></script>
        <script src="app/content-display/nvgttApp.content-display - services.js"></script>
        <script src="app/content-display/nvgttApp.content-display - controller.js"></script>

        <script src="app/discussions/nvgttApp.discussions - module.js"></script>
        <script src="app/discussions/nvgttApp.discussions - services.js"></script>
        <script src="app/discussions/nvgttApp.discussions - controller.js"></script>

        <script src="app/search/nvgttApp.search - module.js"></script>
        <script src="app/search/nvgttApp.search - services.js"></script>
        <script src="app/search/nvgttApp.search - controller.js"></script>

        <!--    End Angular Modules -->

        <title><?php if(isset($username)) htmlout($userInfo['screen_name'] . " | "); ?>Navigatte</title> 
        <style>
            /*table,td,tr {
                border: 0px solid #000;
                height: 100%;
            }

            .fixed-top {
                position: fixed;
                top:0;
            }

*/

            .user-img {
                background-image:url('<?php htmlout('assets/img/' . $userInfo['profile_pic']); ?>');
            }

             /**
             * Hide when Angular is not yet loaded and initialized
             */
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
              display: none !important;
            }

            body {
                padding-top: 70px;
                word-wrap: break-word;
            }

            .full-height {
                height: 100%;
            }

            .fixed {
                position: fixed;
            }

        </style>
	</head>

	<body layout="column" ng-controller="NvgttAppController" ng-cloak>

        <div id="nvgtt-content-area" class="full-height" flex layout="row">
            <div id="nvgtt-content-menu" hide show-gt-md class="full-height md-whiteframe-2dp" flex="20">
                <?php include 'sidemenu3.html.php'; ?>
            </div>

            <div id="nvgtt-content-display" class="full-height" flex>
                <?php include 'chart.html.php'; ?>
                <section ng-view></section>
            </div>
        </div>

        <div flex="none" class="md-whiteframe-3dp fixed" style="width:100%;height:70px;top:0;" id="nvgtt-main-navbar">
            <?php include 'navbar3.html.php'; ?>
        </div>


        <?php if(false): ?>

        <!--Blocks Container-->
        <?php include 'chart.html.php'; ?>
        <!--<div ng-include="'app/chart/nvgttApp.chart - view.html'"></div>-->

        <section ng-view class="nvgtt-content-window"></section>

        <?php include 'sidemenu2.html.php'; ?>

        <?php include 'navbar3.html.php'; ?>

        <!--<div ng-hide="contentActiveFlag">
            
        </div>-->
        <?php endif; ?>
        

  
        
        <!---->
        <script src="assets/js/jquery-2.1.4.min.js"></script>
        <script src="assets/js/eventhandler.js"></script>
        <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>-->
		<script src="assets/js/d3.v3.min.js"></script>
        <script src="assets/js/hexbin.js"></script>
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

        <script src="assets/js/navigatte/navigatte-project.js"></script>

        <?php if (!isset($username)): ?>
            <!--<script src="assets/js/navigatte/navigatte-node-finder.js"></script>-->
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