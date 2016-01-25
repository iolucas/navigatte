'use strict';

angular.module('nvgttApp')
	.service('nvgttLocation', function($window) {

		this.go = function(url) {
			var tempLink = document.createElement('a');
			tempLink.setAttribute('href', url);
			document.body.appendChild(tempLink);
			tempLink.click();
			document.body.removeChild(tempLink);
		}

		this.search = function() {
			var values = {}

			var searchValues = $window.location.search.substr(1).split("&");

			for(var i = 0; i < searchValues.length; i++) {
				var currValue = searchValues[i];
				var equalIndex = currValue.indexOf("=");

				if(equalIndex == -1) {
					values[currValue] = true;	
				} else {
					values[currValue.substring(0,equalIndex)] = currValue.substring(equalIndex+1);
				}
			}

			return values;
		}
	})

	//
	.service('nvgttProfile', function($http) {

		this.get = function(username) {
			return $http.get('../rest/user_profile.php?user=' + username);
		}

	})

	//Service to encapsulates toasts to be shown on the application
	.service('nvgttAlert', function($mdToast) {

		this.show = function(message) {
			$mdToast.show({
				template: '<md-toast>' + message + '</md-toast>',
				position: 'bottom right'
			});
		}
	});