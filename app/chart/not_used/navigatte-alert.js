//Module to handle function to fire alerts
if(Navigatte == undefined)
	var Navigatte = {}

Navigatte.Alert = new function() {

	//Types: success, info, warning, danger

	var alertContainer = null,
		timeoutRef = null;

	this.Show = function(message, type, closeTimeout) {
		if(alertContainer != undefined)
			alertContainer.remove();

		if(timeoutRef != undefined)
			clearTimeout(timeoutRef);

		switch(type) {
			case "success":
				break;
			
			case "info":
				break;

			case "warning":
				break;

			case "danger":
				break;

			default:
				type = "info";
		}

		var alertWidth = 800;

		alertContainer = d3.select("body").append("div")
			.classed("alert", true)
			.classed("alert-" + type, true)
			.attr("role", "alert")
			.style({
				'text-align': 'center',
				position: "absolute", 
				top: "1px", 
				left: (window.innerWidth - alertWidth) / 2 + "px", 
				'min-width': alertWidth + "px"
			})
			.html(message);

		if(closeTimeout == undefined)
			return;

		timeoutRef = setTimeout(function() {
			alertContainer.transition().duration(500)
				.style("opacity", 0)
				.remove();

			alertContainer = null;
			timeoutRef = null;

		}, closeTimeout)
	}

}