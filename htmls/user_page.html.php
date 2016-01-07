<!DOCTYPE html>
<html ng-app="nvgttApp">
	<head>
		<meta charset="UTF-8">
	    <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="css/sidemenu.css"/>
        <link rel="stylesheet" href="css/box-container.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular-route.js"></script>    

        <title><?php if(isset($username)) htmlout($userInfo['screen_name'] . " | "); ?>Navigatte</title> 

	</head>

	<body>

        <!--Nodes Container-->
        <svg class="svg-container">
            <rect id="node-container-mouse-area"></rect>
        </svg>

        <?php include 'navbar.html.php'; ?>

        <!--Node Content View-->
        <section ng-view class="nvgtt-content-window"></section>

        <!--Side menu-->
        <nav class="side-menu">
            <a href="." id="logo">Navigatte</a>

            <input name="search" id="search-field" type="text" placeholder="Pesquisar..." />

            <div class="divisor"></div>  

            <div class="user-navigation">

                <?php if (isset($username)): ?>

                    <div id="user-profile-container">
                        <div class="user-img" style="background-image:url('<?php htmlout('img/' . $userInfo['profile_pic']); ?>');"></div>
                        <div id="user-name" class="black-font"><?php htmlout($userInfo['screen_name']); ?></div>
                        <!--<div id="user-trackers" class="black-font">Trackers 1000</div>
                        <div id="user-tracking" class="black-font">Tracking 1000</div>-->
                        <div id="user-description" class="black-font"><?php htmlout($userInfo['screen_description']); ?></div>
                    </div>

                <?php else: ?>

                    <button id="createNodeButton" class="btn btn-info btn-lg" 
                        type="button" 
                        style="height:50px;width:300px;border-radius:0;position:absolute;left:0; top:180px;">
                        Criar Bloco
                    </button>

                    <button id="saveChangesButton" class="btn btn-success btn-lg" 
                        type="button" 
                        style="height:50px;width:300px;border-radius:0;position:absolute;left:0; top:250px;" 
                        onclick="Navigatte.Changes.Save();">
                        Salvar
                    </button>

                <?php endif ?>
            </div>

            <div class="search-results" style="display:none"></div>

            <footer>
                <div id="pta" class="black-font">Privacy | Terms | About</div>
                <div id="copyright" class="black-font">Copyright 2015 - Navigatte</div>
            </footer>

        </nav>

        <!--Profile Button-->
        <div class="btn-group btn-group-md" style="position:absolute;top:5px;right:5px;">
            
            <?php if ($signedInFlag): ?>
                
                <button type="button" 
                        class="btn dropdown-toggle btn-primary" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"> 
                        <?php htmlout($userInfo['screen_name']); ?> <span class="caret"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">

                    <?php if (isset($username)): ?>
                        <li><a href="./">Home</a></li>
                    <?php else: ?>
                        <li><a href="./?user=<?php htmlout($userInfo['page_name']); ?>">Profile</a></li>
                    <?php endif ?>

                    <li role="separator" class="divider"></li>
                    <li><a href="javascript:void(0)" onclick="document.getElementById('signOutForm').submit();">Sign Out</a></li>
                    <form method="post" id="signOutForm"><input type="hidden" name="action" value="signout"></form>
                </ul>                

            <?php else: ?>
                <button type="button" class="btn btn-primary" onclick="location.href='./';">Sign In</button>
                <!--<button type="button" class="btn btn-info">Register</button>-->
            <?php endif ?>

        </div>

        <!--General Content - Generated by PHP-->
        <!--<section id="general-content">
        
            <div class="navi-content-window">
                <div class="navi-content-close-button">x</div>
                <div class="navi-content-data"></div>
            </div>

        </section>-->
        
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
        <!--<script src="navigatte/navigatte-search.js"></script>-->

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
            angular.module('nvgttApp',['nvgttApp.content']);

            var pageName = '<?php htmlout($userInfo['page_name']); ?>';   

            <?php if (!isset($username)): ?>
                $("#createNodeButton").click(Navigatte.CreateModal.Open);
            <?php endif ?>    

            initApp(pageName);        

        </script>
	</body>
</html>