function OpenCreateModal() {

	NodeModal.Open({
		startX: $("#createNodeButton").css("left").replace("px", "") || 0,
		startY: $("#createNodeButton").css("top").replace("px", "") || 0,
		startWidth: $("#createNodeButton").css("width").replace("px", "") || 0,
		startHeight: $("#createNodeButton").css("height").replace("px", "") || 0,
		endWidth: 500,
		endHeight: 400,
		title: "Create New Node",
		topColor: "lightblue"

	}, function(nodeModal) {

		console.log(userNodes);

		//Create area to place options for creation
		var modalArea = nodeModal.append("div")
			.style("text-align", "center");

		//Create div and input to write the node text
		var nodeNameInput = modalArea.append("div").append("input")
			.attr("type", "text")
			.attr("placeholder", "Node Name")
			.style("margin", "10px 0 10px 0")
			.style("height", "30px")
			.style("width", "200px");

		//Focus the node input
		nodeNameInput.node().focus();

		//Create div to choose the background color
		var bgColorDiv = modalArea.append("div")
			.style("margin", "10px 0 10px 0");

		bgColorDiv.text("Background Color: ");

		var bgColorInput = bgColorDiv.append("input")
			.attr("type", "color");
		
		bgColorInput.node().value = "#bbbbbb";

		//Create div to choose the foreground color
		var fgColorDiv = modalArea.append("div")
			.style("margin", "10px 0 10px 0");

		fgColorDiv.text("Foreground Color: ");

		var fgColorInput = fgColorDiv.append("input")
			.attr("type", "color");
			
		fgColorInput.node().value = "#000000";

		//Create button to submit the node creation
		modalArea.append("div").append("button")
			.style("height", "50px")
			.style("width", "200px")
			.style("margin", "10px 0 10px 0")
			.text("Create")
			.on("click", function(){

				if(nodeNameInput.node().value == "")
					return;

				var xPos = (360 - nodesContainerAttr.translate[0])/nodesContainerAttr.scale;
				var yPos = (80 - nodesContainerAttr.translate[1])/nodesContainerAttr.scale;

				//Create the new node
				var newNode = Navigatte.NodeManager.Create({
					name: nodeNameInput.node().value,
					x: xPos,
					y: yPos,
					bgcolor: bgColorInput.node().value,
					fgcolor: fgColorInput.node().value
				});

				//Refresh nodes
				refreshNodes(userNodes, "user-nodes");

				//Hide the new node
				newNode.d3Select.style("display", "none");
				
				//Update the modal screen attributes
				NodeModal.Refresh({
					startX: nodesContainerAttr.translate[0] + newNode.x * nodesContainerAttr.scale,
					startY: nodesContainerAttr.translate[1] + newNode.y * nodesContainerAttr.scale,
					startWidth: newNode.containerWidth * nodesContainerAttr.scale,
					startHeight: newNode.containerHeight * nodesContainerAttr.scale,

				});

				NodeModal.Close(function(){
					//On modal close, show the new node
					newNode.d3Select.style("display", "");
				});
			});
	});
}