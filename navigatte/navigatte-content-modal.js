Navigatte.ContentModal = new function() {

	Navigatte.Nodes.on("dblclick", function(node) {

		Navigatte.Content.Open(function(contentWindow) { 

			contentWindow.append("span")
				.style({
					"font-size": "40px"

				})
				.text(node.name);


				
		});
	});
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