//Modal plugin that exposes the dom container for append wherever you want

var GrowModal = new function() {
	var self = this;

	//Var to store the current modal open reference
	var currentModal = null;

	var darkScreen = null;
	var modalWindow = null;

	//Var to store the node modal attributes
	var modalAttr = null;

	//Add event listener in case window is resized
	window.addEventListener("resize", function() {
		//If a modal does not exists, return false
		if(modalWindow == undefined)
			return false;

		var newXValue = window.innerWidth - modalAttr.endWidth;
		newXValue = newXValue < 1 ? 1 : newXValue / 2;

		self.Refresh({ endX: newXValue });
	});

	this.Show = function(attr, openCallback) {
		//If a modal is opened, return false
		if(modalWindow != undefined)
			return false;
		
		//Set the body position to initial to show the y scroll 
		//d3.select("body").style({position: "initial"});

		//Save the modal attr
		modalAttr = attr || {}

		//Set the modal specified or standard attributes

		modalAttr.topColor = modalAttr.topColor || "#ddd";

		modalAttr.startWidth = modalAttr.startWidth || 100;
		modalAttr.startHeight = modalAttr.startHeight || 100;
		modalAttr.startX = modalAttr.startX || 0;
		modalAttr.startY = modalAttr.startY || 0;

		modalAttr.endWidth = modalAttr.endWidth || 1200;
		modalAttr.endHeight = modalAttr.endHeight || 800;

		modalAttr.endX = modalAttr.endX || 
			(window.innerWidth - modalAttr.endWidth) < 1 ? 1 : (window.innerWidth - modalAttr.endWidth) / 2;

		modalAttr.endY = modalAttr.endY || 50;

		//darken screen
		darkScreen = d3.select("body").append("div")
			.style({
				"width": "100%",
				"height": "100%",
				"background-color": "rgba(0,0,0,.5)",
				"position": "absolute",
				"top": "0",
				"left": "0"
			})
			.on("click", self.Close);

		//Create dialog modal
		modalWindow = darkScreen.append("div")
			.classed("d3modal", true)
			.style({
				"border": "0px solid #fff",
				"position": "absolute",
				"background-color": "#fff",
				"width": modalAttr.startWidth + "px",
				"height": modalAttr.startHeight + "px",
				"top": modalAttr.startY + "px",
				"left": modalAttr.startX + "px"
			});

		modalWindow.on("click", function() {
			//Cancel bubble of the modal window to avoid window to be closed on click
			d3.event.cancelBubble = true;
		});

		modalWindow.transition().duration(500) //Grow modal smoothly to the final position/size
			.style({
				"width": modalAttr.endWidth + "px",
				"height": modalAttr.endHeight + "px",
				"top": modalAttr.endY + "px",
				"left": modalAttr.endX + "px"
			})
			.each("end", function() { //On transition end
				
				//Set Dialog Modal Upper Bar and Close Button
				modalWindow.append("div")
					.classed("d3modal-top", true)
					.style({
						"height": "30px",
						"border-bottom": "1px solid #000",
						"text-align": "right",
						"background-color": modalAttr.topColor
					})
					.append("span")
					.style({
						"color": "rgba(0,0,0,.3)",
						"line-height": "30px",	
						"font-size": "27px",
						"font-weight": "bold",
						"padding-right": "10px",
						"cursor": "pointer"
					})
					.text("x")
					.on("click", self.Close);

				//Fire the open callback with the nodeModal as argument
				if($.isFunction(openCallback))
					openCallback(modalWindow.node()); 
			});

		return true;
	}

	this.Close = function(closeCallback) {
		//If a modal does not exists, return false
		if(darkScreen == undefined)
			return false;

		//Clear the click event listener from the dark screen
		darkScreen.on("click", null);

		//Remove all elements from the content modal
		modalWindow.selectAll("*").remove();

		modalWindow.transition().duration(500)
			.style({
				"width": modalAttr.startWidth + "px",
				"height": modalAttr.startHeight + "px",
				"top": modalAttr.startY + "px",
				"left": modalAttr.startX + "px"
			})
			.each("end", function() {	//At transition end 		
				modalWindow.remove();	//remove the content modal from the screen
				darkScreen.remove();	//remove the dark screen
				
				//Set the body position to initial to hide the y scroll 
				//d3.select("body").style({position: "fixed"});

				if($.isFunction(closeCallback))
					closeCallback();

				//Clear modal and attributess ref
				darkScreen = null;
				modalWindow = null;
				modalAttr = null;
			});
	}

	this.Refresh = function(refreshAttr) {
		//If a modal does not exists, return false
		if(modalWindow == undefined)
			return false;

		//Update all properties passed
		for (var prop in refreshAttr) {
			modalAttr[prop] = refreshAttr[prop];
		}

		//Refresh all properties at the modal
		modalWindow.style({
				"width": modalAttr.endWidth + "px",
				"height": modalAttr.endHeight + "px",
				"top": modalAttr.endY + "px",
				"left": modalAttr.endX + "px"
			});

		modalWindow.select(".d3modal-top")
			.style("background-color", modalAttr.topColor);

		return true;
	}
}


