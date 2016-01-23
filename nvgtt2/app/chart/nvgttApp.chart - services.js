angular.module('nvgttApp.chart')

.service('userBlocks', function($http) {

	this.get = function(username) {
		return $http.get("../rest/user_data.php?nodes&links&user=" + username);
	}

});