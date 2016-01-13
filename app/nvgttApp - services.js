'use strict';

angular.module('nvgttApp')
	.service('searchValues', function($window) {

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
	});