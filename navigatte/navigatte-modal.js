var d3Modal = function() {

	var self = this;

	//Var to store the current modal open reference
	var currentModal = null;

	//Var to store the node modal attributes
	var modalAttr = null;

	//Add event listener in case window is resized
	window.addEventListener("resize", function() {
		//If a modal does not exists, return false
		if(currentModal == undefined)
			return false;

		var newXValue = window.innerWidth - nodeModalAttr.endWidth;
		newXValue = newXValue < 1 ? 1 : newXValue / 2;

		self.Refresh({ endX: newXValue });
	});

	this.Show = function(attr, openCallback) {
		//If a modal is opened, return false
		if(currentModal != undefined)
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
		currentModal = d3.select("body").append("div")
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
		currentModal.append("div")
			.classed("d3modal", true)
			.style({
				"border": "0px solid #fff",
				"position": "absolute",
				"background-color": "#fff",
				"width": modalAttr.startWidth + "px",
				"height": modalAttr.startHeight + "px",
				"top": modalAttr.startY + "px",
				"left": modalAttr.startX + "px"
			})
			.transition().duration(500) //Grow modal smoothly to the final position/size
			.style({
				"width": modalAttr.endWidth + "px",
				"height": modalAttr.endHeight + "px",
				"top": modalAttr.endY + "px",
				"left": modalAttr.endX + "px"
			})
			.each("end", function() { //On transition end
				
				//Set Dialog Modal Upper Bar and Close Button
				currentModal.select(".d3modal").append("div")
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
					openCallback(currentModal); 
			});

		return true;
	}

	this.Close = function(closeCallback) {
		//If a modal does not exists, return false
		if(currentModal == undefined)
			return false;

		//Clear the click event listener from the dark screen
		currentModal.on("click", null);

		//Remove all elements from the content modal
		currentModal.select(".d3modal").selectAll("*").remove();

		currentModal.select(".d3modal").transition().duration(500)
			.style({
				"width": modalAttr.startWidth + "px",
				"height": modalAttr.startHeight + "px",
				"top": modalAttr.startY + "px",
				"left": modalAttr.startX + "px"
			})
			.each("end", function() {	//At transition end 		
				currentModal.remove();	//remove the content modal from the screen
				
				//Set the body position to initial to hide the y scroll 
				//d3.select("body").style({position: "fixed"});

				if(jQuery.isFunction(closeCallback))
					closeCallback();

				//Clear modal and attributess ref
				currentModal = null;
				modalAttr = null;
			});
	}

	this.Refresh = function(refreshAttr) {
		//If a modal does not exists, return false
		if(currentModal == undefined)
			return false;

		//Update all properties passed
		for (var prop in refreshAttr) {
			modalAttr[prop] = refreshAttr[prop];
		}

		//Refresh all properties at the modal
		currentModal.select("div")
			.style({
				"width": modalAttr.endWidth + "px",
				"height": modalAttr.endHeight + "px",
				"top": modalAttr.endY + "px",
				"left": modalAttr.endX + "px"
			});

		currentModal.select(".d3modal-top")
			.style("background-color", modalAttr.topColor);

		return true;
	}
}






var NodeModal = new function() {

	var self = this;

	//Var to store the current modal open reference
	var currentModal = null;

	//Var to store the node modal attributes
	var nodeModalAttr = null;

	//Ensure darkscreen is hide
	$(".dark-screen").hide();

	//Add event listener in case window is resized
	window.addEventListener("resize", function() {
		//If a modal does not exists, return false
		if(currentModal == undefined)
			return false;

		var newXValue = window.innerWidth - nodeModalAttr.endWidth;
		newXValue = newXValue < 1 ? 1 : newXValue / 2;

		self.Refresh({ endX: newXValue });
	});

	this.Open = function(modalAttr, openCallback) {

		//If a modal is opened, return false
		if(currentModal != undefined)
			return false;

		//Set the body position to initial to show the y scroll 
		//$("body").css("position", "initial");

		//Save the modal attr
		nodeModalAttr = modalAttr;

		//Get modal values
		nodeModalAttr.title = nodeModalAttr.title || "";

		nodeModalAttr.topColor = nodeModalAttr.topColor || "#ddd";

		nodeModalAttr.startWidth = nodeModalAttr.startWidth || 100;
		nodeModalAttr.startHeight = nodeModalAttr.startHeight || 100;
		nodeModalAttr.startX = nodeModalAttr.startX || 0;
		nodeModalAttr.startY = nodeModalAttr.startY || 0;

		nodeModalAttr.endWidth = nodeModalAttr.endWidth || 1200;
		nodeModalAttr.endHeight = nodeModalAttr.endHeight || 800;

		nodeModalAttr.endX = nodeModalAttr.endX || 
			(window.innerWidth - nodeModalAttr.endWidth) < 1 ? 1 : (window.innerWidth - nodeModalAttr.endWidth) / 2;

		nodeModalAttr.endY = nodeModalAttr.endY || 50;

		//Unfocus main screen
		$(".dark-screen").show();

		//Add event listener to the dark screen to close the modal
		$(".dark-screen").click(self.Close);

		//Create dialog modal
		currentModal = d3.select("body").append("div")
			.attr("class", "node-modal")
			.style("width", nodeModalAttr.startWidth + "px")
			.style("height", nodeModalAttr.startHeight + "px")
			.style("top", nodeModalAttr.startY + "px")
			.style("left", nodeModalAttr.startX + "px");

		//Grow modal smoothly to the final position/size
		currentModal.transition().duration(500)
			.style("width", nodeModalAttr.endWidth + "px")
			.style("height", nodeModalAttr.endHeight + "px")
			.style("top", nodeModalAttr.endY + "px")
			.style("left", nodeModalAttr.endX + "px")
			.each("end", function() { //On transition end

				//Set Dialog Modal Upper Bar and Close Button
				currentModal.append("div")
					.attr("class", "node-modal-top")
					.style("background-color", nodeModalAttr.topColor)
					.append("span")
					.attr("class", "node-modal-close-button")
					.text("x")
					.on("click", self.Close);

				//Set modal dialog title
				currentModal.append("div")
					.attr("class", "node-modal-title")
					.text(nodeModalAttr.title);

				//Fire the open callback with the nodeModal as argument
				if(jQuery.isFunction(openCallback))
					openCallback(currentModal); 
			});

		return true;
	}

	this.Close = function(closeCallback) {
		//If a modal does not exists, return false
		if(currentModal == undefined)
			return false;

		//Set the body position to initial to hide the y scroll 
		//$("body").css("position", "fixed");

		//Clear the click event listener from the dark screen
		$(".dark-screen").off("click");

		//Remove all elements from the content modal
		currentModal.selectAll("*").remove();

		currentModal.transition().duration(500)
			.style("width", nodeModalAttr.startWidth + "px")
			.style("height", nodeModalAttr.startHeight + "px")
			.style("top", nodeModalAttr.startY + "px")
			.style("left", nodeModalAttr.startX + "px")
			.each("end", function() {	//At transition end 		
				currentModal.remove();	//remove the content modal from the screen
				$(".dark-screen").hide();	//Hide the dark screen

				if(jQuery.isFunction(closeCallback))
					closeCallback();

				//Clear modal and attributess ref
				currentModal = null;
				nodeModalAttr = null;
			});
	}

	this.Refresh = function(refreshAttr) {
		//If a modal does not exists, return false
		if(currentModal == undefined)
			return false;

		//Update all properties passed
		for (var prop in refreshAttr) {
			nodeModalAttr[prop] = refreshAttr[prop];
		}

		//Refresh all properties at the modal

		currentModal.style("width", nodeModalAttr.endWidth + "px")
			.style("height", nodeModalAttr.endHeight + "px")
			.style("top", nodeModalAttr.endY + "px")
			.style("left", nodeModalAttr.endX + "px");

		currentModal.select(".node-modal-top")
			.style("background-color", nodeModalAttr.topColor);

		currentModal.select(".node-modal-title")
			.text(nodeModalAttr.title);

		return true;
	}
}