//Store the current size of the node modal
var nodeModalSize = [0,0];

//Hide dark screen on page load
$(".dark-screen").hide();

//Add event listener in case window is resized
window.addEventListener("resize", refreshModalPosition);

function appendContentModal(nodeSelection) {

	nodeSelection.on("dblclick", function(nodeData) {

		//Cancel event bubble to avoid another actions to occurr on double click 
		d3.event.cancelBubble = true;

		openNodeModal(nodeData, [1200,800]);
	});
}


function openNodeModal(nodeData, modalSize, openCallback) {

	//Update current node modal size
	nodeModalSize = modalSize;

	//Set the body position to initial to show the y scroll 
	//$("body").css("position", "initial");

	//Unfocus main screen
	$(".dark-screen").show();

	//Add event listener to the dark screen to close the modal
	$(".dark-screen").click(closeNodeModal);

	//Create dialog modal and bind the node data to the modal window
	var nodeModal = d3.select("body").append("div").datum(nodeData)
		.attr("class", "node-modal")
		.style("width", nodeData.containerWidth * nodesContainerAttr.scale + "px")
		.style("height", nodeData.containerHeight * nodesContainerAttr.scale + "px")
		.style("top", nodesContainerAttr.translate[1] + nodeData.y * nodesContainerAttr.scale + "px")
		.style("left", nodesContainerAttr.translate[0] + nodeData.x * nodesContainerAttr.scale + "px");

	//Show modal smoothly
	nodeModal.transition().duration(500)
		.style("width", nodeModalSize[0] + "px")
		.style("height", nodeModalSize[1] + "px")
		.style("top", 50 + "px")
		.style("left", (window.innerWidth - nodeModalSize[0]) / 2  + "px")
		.each("end", function() { //On transition end

			//Set Dialog Modal Upper Bar and Close Button
			nodeModal.append("div")
				.attr("class", "node-modal-top")
				.style("background-color", nodeData.bgcolor)
				.append("span")
				.attr("class", "node-modal-close-button")
				.text("x")
				.on("click", closeNodeModal);

			//Fire the open callback with the nodeModal as argument
			if(openCallback)
				openCallback(nodeModal); 
		});
}

function closeNodeModal() {
	//Set the body position to initial to hide the y scroll 
	$("body").css("position", "fixed");

	//Clear the click event listener from the dark screen
	$(".dark-screen").off("click");

	//Select the modal dialog
	var nodeModal = d3.select(".node-modal");

	//If something fail and this method got executed when there is no modal 
	if(nodeModal.empty()) {
		$(".dark-screen").hide();	//Hide the dark screen
		return;
	}

	var nodeData = nodeModal.datum();

	//Remove all elements from the content modal
	nodeModal.selectAll("*").remove();

	nodeModal.transition().duration(500)
		.style("width", nodeData.containerWidth * nodesContainerAttr.scale + "px")
		.style("height", nodeData.containerHeight * nodesContainerAttr.scale + "px")
		.style("top", nodesContainerAttr.translate[1] + nodeData.y * nodesContainerAttr.scale + "px")
		.style("left", nodesContainerAttr.translate[0] + nodeData.x * nodesContainerAttr.scale + "px")
		.each("end", function() {	//At transition end 		
			nodeModal.remove();	//remove the content modal from the screen
			$(".dark-screen").hide();	//Hide the dark screen
		});
}

function refreshModalPosition() {

	//Get the skill modal window left value
	var newLeftValue = window.innerWidth - nodeModalSize[0];
	newLeftValue = newLeftValue < 0 ? 1 : newLeftValue / 2;

	//Set the new positions for the skill modal dialog
	d3.select(".node-modal")
		.style("top", 50 + "px")
		.style("left", newLeftValue + "px");
}


//OLD CONTENT LOADER
//Function to load modal content
/*var loadModalContent = function(d) {

	//Set Dialog Modal Upper Bar and Close Button
	skillDialog.append("div")
		.attr("class", "skill-dialog-top")
		.style("background-color", d.bgcolor)
		.append("span")
		.attr("class", "skill-dialog-close-button")
		.text("x")
		.on("click", function() { return closeSkillModal(d); });

	//Set skill dialog data
	skillDialog.append("div")
		.attr("class", "skill-dialog-title")
		.text(d.name);

	var skillDialogDesc = skillDialog.append("div")
		.attr("class", "skill-dialog-content");

	//Function to set the skill modal description
	var setDescription = function() {
		skillDialogDesc.html(d.description);
	}


	//Check if the description exists
	if(d.description) {
		//If so, set it
		setDescription();	
	} else if(d.wikipediaTitle) {	
	//if not, check if we got one ref from wikipedia and attempt to get the desc from there
		var reqUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + d.wikipediaTitle;

		//Send REST request for wikipedia data
		getRequest(reqUrl, function(reqData) {
			//If there data is not valid, return
			if(!reqData.query.pages)
				return;

			for(var prop in reqData.query.pages) {
				//If the extract data is valid, set it as the description
				var queryText = reqData.query.pages[prop].extract,
					queryMaxLength = 800;

				if(queryText) {
					//If the query text is too long, trunc it
					if(queryText.length > queryMaxLength)
						queryText = queryText.substr(0, queryMaxLength) + "...";

					//Add the wikipedia ref
					queryText += " <a target='_blank' href='https://en.wikipedia.org/wiki/" + d.wikipediaTitle + "'>Read More</a>";

					d.description = queryText;
					setDescription();
					break;
				}
			}
		});
	}

	//If the node has base skills
	if(d.baseSkills && d.baseSkills.length > 0) {

		skillDialog.append("div")
			.attr("class", "skill-dialog-subtitle")
			.text("Base Skills");

		skillDialog.selectAll(".base-skills").data(d.baseSkills).enter()
			.append("div")
			.attr("class", "skill-dialog-content base-skills")
			.text(function(baseSkillName){ return baseSkillName; });
	}

	//If the node has books relation
	if(d.books) {

		var booksArray = d.books.split(";");
		//console.log(booksArray);

		skillDialog.append("div")
			.attr("class", "skill-dialog-subtitle")
			.text("Books");

		skillDialog.selectAll(".books").data(booksArray).enter()
			.append("div")
			.attr("class", "skill-dialog-content books")
			.text(function(bookName){ return bookName; });
	}

	//If the node has links
	if(d.internetRefs) {

		var linksArray = d.internetRefs.split(";");

		skillDialog.append("div")
			.attr("class", "skill-dialog-subtitle")
			.text("Links");

		skillDialog.selectAll(".internet-refs").data(linksArray).enter()
			.append("div")
			.attr("class", "skill-dialog-content internet-refs")
			.append("a")
			.attr("href", function(linkRef){ return linkRef; })
			.attr("target", "_blank")
			.text(function(linkRef){ return linkRef; });
	}

}*/