Navigatte.CreateModal = new function() {

	this.Open = function(e) {
		var clickButton = $(this);

		GrowModal.Show({

			startX: clickButton.css("left").replace("px", "") || 0,
			startY: clickButton.css("top").replace("px", "") || 0,
			startWidth: clickButton.css("width").replace("px", "") || 0,
			startHeight: clickButton.css("height").replace("px", "") || 0,
			endWidth: 700,
			endHeight: 400,
			topColor: "lightblue"

		}, function(m) {

			//Create area to place options for creation
			var modal = d3.select(m).append("div")
				.style("text-align", "center");

			//Set modal dialog title
			modal.append("div")
				.attr("class", "node-modal-title")
				.text("Create New Node");

			//Create div and input to write the node text
			var nodeNameInput = modal.append("div").append("input")
				.attr("type", "text")
				.attr("placeholder", "Node Name")
				.style("margin", "10px 0 10px 0")
				.style("height", "30px")
				.style("width", "200px");

			//Focus the node input
			nodeNameInput.node().focus();

			//Create div to choose the background color
			var bgColorDiv = modal.append("div")
				.style("margin", "10px 0 10px 0");

			bgColorDiv.text("Background Color: ");

			var bgColorInput = bgColorDiv.append("input")
				.attr("type", "color");
			
			bgColorInput.node().value = "#bbbbbb";

			//Create div to choose the foreground color
			var fgColorDiv = modal.append("div")
				.style("margin", "10px 0 10px 0");

			fgColorDiv.text("Foreground Color: ");

			var fgColorInput = fgColorDiv.append("input")
				.attr("type", "color");
				
			fgColorInput.node().value = "#000000";

			//Create button to submit the node creation
			modal.append("div").append("button")
				.style("height", "50px")
				.style("width", "200px")
				.style("margin", "10px 0 10px 0")
				.text("Create")
				.on("click", function() {

					if(nodeNameInput.node().value == "")
						return;

					var xPos = (360 - Navigatte.Container.Position.X) / Navigatte.Container.Scale;
					var yPos = (80 - Navigatte.Container.Position.Y) / Navigatte.Container.Scale;

					//Create the new node
					var newNode = Navigatte.Nodes.Create({
						name: nodeNameInput.node().value,
						x: xPos,
						y: yPos,
						bgcolor: bgColorInput.node().value,
						fgcolor: fgColorInput.node().value
					});

					//Refresh nodes
					Navigatte.Nodes.Refresh();

					//Hide the new node
					newNode.d3Select.style("display", "none");
					
					//Update the modal screen attributes
					GrowModal.Refresh({
						startX: Navigatte.Container.Position.X + newNode.x * Navigatte.Container.Scale,
						startY: Navigatte.Container.Position.Y + newNode.y * Navigatte.Container.Scale,
						startWidth: newNode.containerWidth * Navigatte.Container.Scale,
						startHeight: newNode.containerHeight * Navigatte.Container.Scale,

					});

					GrowModal.Close(function(){
						//On modal close, show the new node
						newNode.d3Select.style("display", "");
					});
				});

		});

	};
}