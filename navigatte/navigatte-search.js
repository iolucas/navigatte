//Module to handle all the kinds if searchs

Navigatte.Search = new function() {

	this.Query = function(data, callback) {
		$.get("search.php", data).always(callback);
	}





}