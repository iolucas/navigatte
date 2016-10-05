<!DOCTYPE html>
<html ng-app="nvgttApp">
	<head>
		<meta charset="UTF-8">

        <link rel="stylesheet" href="assets/css/angular-material.css">
        <link rel="stylesheet" href="app/chart/chartRender/style.css">

        <style>
            html,body {
                background-color: #e0e0e0;
                /*padding-top: 70px;*/
            }

            .fixed {
                position: fixed;
            }

            .user-img {
                width: 100px;
                height: 100px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                display: inline-block;
                border: 2px solid #fff;
                border-radius: 100px;
            }

            .black-font {
                color: #000;
            }

            #user-name {
                font-size: 28px;
                margin: 10px;
            }

            #user-trackers {
                font-size: 20px;
                margin: 3px;
            }

            #user-tracking {
                font-size: 20px;
                margin: 3px;
            }

            #user-description {
                font-size: 16px;
                margin-bottom: 25px;
                text-align: justify;
                text-justify: inter-word;
            }

        </style>

        <script src="assets/js/angular.js"></script>
        <script src="assets/js/angular-animate.js"></script>
        <script src="assets/js/angular-aria.js"></script>
        <script src="assets/js/angular-material.js"></script>
        <script src="assets/js/angular-route.js"></script>

        <script src="assets/js/g-query.js"></script>
        <script src="assets/js/d3.v3.min.js"></script>
        <script src="assets/js/eventhandler.js"></script> 

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

        <script src="app/chart/nvgttApp.chart - module.js"></script>
        <script src="app/chart/nvgttApp.chart - controller.js"></script>
        <script src="app/chart/nvgttApp.chart - services.js"></script>

        <script src="app/chart/chartRender/nvgttChart.js"></script>
        <script src="app/chart/chartRender/nvgttChart.container.js"></script>
        <script src="app/chart/chartRender/nvgttChart.blocks.js"></script>
        <script src="app/chart/chartRender/nvgttChart.path.js"></script>
        <script src="app/chart/chartRender/nvgttChart.project.js"></script>

        <title>Navigatte</title> 
	</head>

    <body ng-controller="NvgttAppController">
            <div flex="none" class="fixeds" style="width:100%;height:70px;top:0;" id="nvgtt-main-navbar">
                <?php include 'navbar3.html.php'; ?>
            </div>

            <div layout="row" style="height:280px;">
                <!--<button onclick="check();">Teste</button>-->
                <div flex="20"></div>
                <div flex layout="column" layout-align="center center">
                    <div class="user-img" ng-attr-style="background-image:url('{{userProfilePic}}');"></div>
                    <div id="user-name" class="black-font">{{ userProfileName }}</div>
                    <div id="user-description" class="black-font">{{ userDescription }}</div>
                    <div id="user-trackers" class="black-font">Trackers 1000 Tracking 1000</div>
                    
                </div>
                <div flex="20"></div>
            </div>
            <svg class="nvgtt-chart" ng-controller="ChartController"></svg>
            <br>
            <section ng-view ng-hide="false"></section>

             <!--           

             -read about unit test and write them for this app to avoid keep checking stuff all the time
            -maybe add something like medium to the content or scoop it(although you dont know much what it is)
            -add lot of filters to organize blocks by level, subject, area and keep the levels (this would be usefull for mobile, although it took out some of the core funcionality)
                        -rethink the name navigatte to ensure the vision and idea is clear to everyone
            -recompile everything a decide best next steps to avoid waste time and gather results, maybe is start study how data will be gathered (maybe start craw wikipedia)
            -filter best contents

            FOCUS ON CONTENT AND HOW CONTENT WILL BE DISPLAYED
    
        -->
	</body>
</html>