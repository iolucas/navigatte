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
        <link rel="stylesheet" href="app/chart/style.css"/>

        <!--    Begin Angular Modules -->

        <script src="assets/js/jquery-2.1.4.min.js"></script>
        <script src="assets/js/d3.v3.min.js"></script>
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

	<body layout="column" ng-controller="NvgttAppController">

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
        
        <script src="assets/js/eventhandler.js"></script>
        <script src="assets/js/hexbin.js"></script>
        <script src="assets/js/g-query.js"></script>
        <script src="assets/js/grow-modal.js"></script>
        <!--<script src="modules/content-show/controller.js"></script>-->

        <script src="app/chart/navigatte.js"></script>
        <script src="app/chart/navigatte-container.js"></script>
        <!--<script src="app/chart/navigatte-nodes.js"></script>-->
        <script src="app/chart/nvgtt-blocks.js"></script>
        <!--<script src="app/chart/navigatte-links.js"></script>-->
        <script src="app/chart/nvgtt-links.js"></script>
        
        <script src="app/chart/navigatte-select.js"></script>
        <!--<script src="app/chart/navigatte-content.js"></script>
        <script src="app/chart/navigatte-content-modal.js"></script>-->
        <script src="app/chart/nvgtt-content.js"></script>

        <script src="app/chart/navigatte-project.js"></script>

        <?php if (!isset($username)): ?>
            <script src="app/chart/nvgtt-create.js"></script>
            <script src="app/chart/navigatte-search.js"></script>
            <script src="app/chart/navigatte-changes.js"></script>
            <script src="app/chart/navigatte-changes-node.js"></script>
            <script src="app/chart/navigatte-create-modal.js"></script>

            <!--<script src="assets/js/navigatte/navigatte-node-finder.js"></script>-->

            <script src="app/chart/navigatte-create-links.js"></script>
            <script src="app/chart/navigatte-changes-link.js"></script>
            <script src="app/chart/navigatte-keyactions.js"></script>
        <?php endif ?>         

        <!--<script src="assets/js/app.js"></script>-->
        <script>
            'use strict';

            var pageName = '<?php htmlout($userInfo['page_name']); ?>';   

            NvgttChart.load(pageName);


            -MUST OBSOLETE THINGS NOT USED
            -use the input/outputs reference to calculate the nodes format base on number of i/o s
            -must generate outputs and inputs numbers and container width and height
            -read about unit test and write them for this app to avoid keep checking stuff all the time
            -maybe add something like medium to the content
            -add lot of filters to organize blocks by level, subject, area and keep the levels (this would be usefull for mobile, although it took out some of the core funcionality)
            -rethink the name navigatte

            //initApp(pageName); 

        </script>
	</body>
</html>