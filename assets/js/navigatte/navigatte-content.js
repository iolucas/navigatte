//Module to handle navigatte content window routines

Navigatte.Content = new function() {


	//Set window resize event
	d3.select(window).on("resize", function() {
		refreshContentWindowSize(window.innerWidth - 300, window.innerHeight);
	});

	//Set event to close button click
	d3.select(".navi-content-close-button").on("click", close);

	//Execute functions to init the window
	hide();
	refreshContentWindowSize(window.innerWidth - 300, window.innerHeight);

	//Public functions

	this.Open = function(callback) {
		show();

		if($.isFunction(callback))
			callback(d3.select(".navi-content-data"));
	}

	function close() {
		hide();
		//d3.select(".navi-content-data").selectAll("*").remove();
	}

	//Private functions

	function refreshContentWindowSize(newWidth, newHeight) {
		d3.select(".navi-content-window")
			.style({
				"min-height": newHeight + "px",
				"width": newWidth + "px"
			});
	}

	function hide() {
		d3.select(".navi-content-window").style({ "display": "none" });
		//d3.select("body").style({ "position": "fixed" });
	}

	function show() {
		d3.select(".navi-content-window").style({ "display": "" });

		//d3.select("body").style({ "position": "initial" });
	}
}