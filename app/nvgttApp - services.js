'use strict';

angular.module('nvgttApp')
	.service('queryStringMap', function($window) {

		this.get = function() {
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

	//Service to encapsulates toasts to be shown on the application
	.service('nvgttAlert', function($mdToast) {

		this.show = function(message) {
			$mdToast.show({
				template: '<md-toast>' + message + '</md-toast>',
				position: 'bottom right'
			});
		}
	});