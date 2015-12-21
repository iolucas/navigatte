Navigatte.ContentModal = new function() {

	Navigatte.Nodes.on("dblclick", function(node) {

		Navigatte.Content.Open(function(contentWindow) {

			contentWindow.selectAll("*").remove();	

			//$.get("get_content.php", { id: node.globalId, user: pageName })
			$.get("get_content.php", { local_id: node.localId })
				.done(function(response) {

					var respObj = JSON.parse(response);

					var contentData = {
						id: node.globalId,
						title: node.name,
						description: respObj.description || "",
						courses: respObj.courses || [],
						books: respObj.books || [],
						sites: respObj.sites || [],
						notes: respObj.notes || "",
						owner: respObj.owner || false
					}

					refreshPage(contentWindow, contentData, false);
				});				
		});
	});

	function refreshPage(contentWindow, contentData, edit) {

		contentWindow.selectAll("*").remove();

		if(contentData.owner && !edit)
			contentWindow.append("button")
				.text("Edit")
				.on("click", function(){
					refreshPage(contentWindow, contentData, true);
				});

		//Append title
		contentWindow.append("h1")
			.text(contentData.title);

		contentWindow.append("p")
			.text(contentData.description);

		contentWindow.append("br");



		//COURSES

		if(contentData.courses.length > 0 || edit) {
			contentWindow.append("h2")
				.text("Courses")

			if(edit) {
				var courseInput = contentWindow.append("input")
					.attr("type", "text")
					.attr("placeholder", "Course name...");

				contentWindow.append("button")
					.text("Insert")
					.on("click", function() {
						if(courseInput.node().value != "") {
							contentData.courses.push(courseInput.node().value);	
							refreshPage(contentWindow, contentData, true);
						}
					});

				contentWindow.append("br");
			}	

			var courseItems = contentWindow.append("ul")
				.selectAll("li").data(contentData.courses).enter()
				.append("li");

				courseItems.text(function(d) { return d + " "; });

				if(edit)
					courseItems.append("button").text("Delete").on("click", function(d) {
						var dataIndex = contentData.courses.indexOf(d);

						if(dataIndex == -1)
							return;

						contentData.courses.splice(dataIndex, 1);
						refreshPage(contentWindow, contentData, true);
					});

			contentWindow.append("br");
		}

		//BOOKS

		if(contentData.books.length > 0 || edit) {
			contentWindow.append("h2")
				.text("Books")

			if(edit) {
				var bookInput = contentWindow.append("input")
					.attr("type", "text")
					.attr("placeholder", "Book title...");

				contentWindow.append("button")
					.text("Insert")
					.on("click", function() {
						if(bookInput.node().value != "") {
							contentData.books.push(bookInput.node().value);	
							refreshPage(contentWindow, contentData, true);
						}
					});

				contentWindow.append("br");
			}	

			var booksItems = contentWindow.append("ul")
				.selectAll("li").data(contentData.books).enter()
				.append("li");

				booksItems.text(function(d) { return d + " "; });

				if(edit)
					booksItems.append("button").text("Delete").on("click", function(d) {
						var dataIndex = contentData.books.indexOf(d);

						if(dataIndex == -1)
							return;

						contentData.books.splice(dataIndex, 1);
						refreshPage(contentWindow, contentData, true);
					});

			contentWindow.append("br");
		}

		//SITES

		if(contentData.sites.length > 0 || edit) {
			contentWindow.append("h2")
				.text("Sites")

			if(edit) {
				var siteInput = contentWindow.append("input")
					.attr("type", "text")
					.attr("placeholder", "Course name...");

				contentWindow.append("button")
					.text("Insert")
					.on("click", function() {
						if(siteInput.node().value != "") {
							contentData.sites.push(siteInput.node().value);	
							refreshPage(contentWindow, contentData, true);
						}
					});

				contentWindow.append("br");
			}	

			var siteItems = contentWindow.append("ul")
				.selectAll("li").data(contentData.sites).enter()
				.append("li");

				siteItems.append("a")
					.attr("href", function(d) { return d; })
					.attr("target", "_blank")
					.text(function(d) { return d + " "; });

				if(edit)
					siteItems.append("button").text("Delete").on("click", function(d) {
						var dataIndex = contentData.sites.indexOf(d);

						if(dataIndex == -1)
							return;

						contentData.sites.splice(dataIndex, 1);
						refreshPage(contentWindow, contentData, true);
					});

			contentWindow.append("br");
		}

		if(contentData.notes != "" || edit) {
			contentWindow.append("h2")
				.text("Notes");

			if(edit) {
				var notesInput = contentWindow.append("textarea")
					//.attr("type", "text")
					//.attr("value", contentData.notes);
					.style({
						"width": "500px",
						"height": "100px"
					})
					.text(contentData.notes);

				contentWindow.append("br");

				contentWindow.append("button")
					.text("Save")
					.on("click", function(){
						contentData.notes = notesInput.node().value;
					});

			} else {
				contentWindow.append("p")
					.text(contentData.notes);
			}
		}

		if(edit) {
			contentWindow.append("br");
			contentWindow.append("br");

			contentWindow.append("button")
				.text("Done")
				.on("click", function(){
					refreshPage(contentWindow, contentData, false);

					var saveObj = {
						courses: contentData.courses,
						books: contentData.books,
						sites: contentData.sites,
						notes: contentData.notes
					}

					var saveString = JSON.stringify(saveObj);

					alertify.log("Saving editions...", 5000);

					$.post("set_content.php", { saveString: saveString, nodeId: contentData.id })
						.done(function(response) {
							if(response == "SUCCESS")
								alertify.success("Editions saved!", 5000);
							else {
								alertify.error("Error while saving.", 5000);
								console.log(response);
							}	
						});

				});
		}

	}
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