'use strict';

//Controller of the main module nvgttApp

angular.module('nvgttApp')
	.controller('NvgttAppController', function($scope, nvgttAlert, $location,$mdDialog, $window, queryStringMap, alertify) {
			//Configure alertify
			alertify.logPosition("bottom right");

			//Get page username
			$scope.username = queryStringMap.get().user || pageName;

	        //Flag signalizing whether a content is being show
	        $scope.contentActiveFlag = $location.path() != "";

	        //Check routing changes and update the content active flag
	        $scope.$on("$routeChangeSuccess", function() {
	            $scope.contentActiveFlag = $location.path() != "";
	        });

	        $scope.loaded = false;

	        /*$scope.loadURL = function(url) {
	        	$window.location.href = url;
	        }*/

	        $scope.signOut = function() {
	        	document.getElementById('signOutForm').submit();
	        }

	        $scope.toast = function() {
				nvgttAlert.show("message");	
	        }

	        $scope.createBlock = function(ev) {

	        	Navigatte.CreateModal.Open();
	        	/*return;

	        	var dialog = $mdDialog.confirm().title("Create Block...")
	        		.textContent("<strong>{{testText}}</strong>")
	        		.ok("Create")
	        		.cancel("Cancel")
	        		.theme("default")
	        		.targetEvent(ev);

	        	console.log(dialog);


	        	$mdDialog.show(dialog).then(function(success){
	        		console.log(success);
	        	}, function(error) {
	        		console.log(error);
	        	});*/



	        	/*var alert = $mdDialog.alert({
		        	title: 'Attention',
		        	textContent: 'This is an example of how easy dialogs can be!',
		        	ok: 'Close'
		      	});
	
		      	$mdDialog.show(alert)
		        	.finally(function() {
		          		alert = undefined;
		        	});*/
/*console.log(this);
				console.log(ev);

				$mdDialog.show({
					templateUrl: 'app/nvgttApp - createBlockView.html',
					//openFrom: {top:10, left:10, width:10, height:10},
					//closeTo: {top:10, left:10, width:10, height:10},
					controller:'NvgttAppController'


				});*/
				   // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    /*$mdDialog.show(
      $mdDialog.alert()
        //.parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );*/
	        }

	        $scope.saveChanges = function() {
	        	nvgttAlert.show("Saving changes...")
	        	Navigatte.Changes.Save();
	        }


	    });
