//Module to handle nodes search on the search bar and results display
(new function() {

	//Flag to signalize whether a search is in progress
	var searching = false;

	//Var to store the cancelable reference of the search timeout
	var searchTimeout = null;

	var userNavigation = d3.select(".user-navigation");
	var searchResults = d3.select(".search-results");
	var searchField = d3.select("#search-field");
		
	searchField.on("keyup", function() {

		if(searchTimeout)
        	clearTimeout(searchTimeout);

        var fieldValue = this.value;

		if(fieldValue == "") {
			endSearch();
			return;
		}

		if(!searching)
			startSearch();

        //Must set timeout to give time for the field register its new value and avoid too many ajax requests
        searchTimeout = setTimeout(function() { 
            searchTimeout = null;
            onSearch(fieldValue);
        }, 500);  

	});

    function endSearch() {
		//Show user navigation
		userNavigation.style("display", "");

		//Hide search results and remove all childs
		searchResults.style("display", "none")
			.selectAll("*").remove();

		searching = false;
    }

    function startSearch() {
    	searching = true;

    	//Hide user navigation
		userNavigation.style("display", "none");

		//Show search results
		searchResults.style("display", "");
    }

	function onSearch(fieldValue) {

    	$.get("gets/find_nodes.php", { node_name: fieldValue }, function(result) {

            var resultsArray = JSON.parse(result);

            //Remove all search results    
            searchResults.selectAll("*").remove();

            if(resultsArray.length < 1) {
                searchResults.append("div")
                    .classed("search-noresult", true)  
                    .text("No results.");

                return;
            }

            KEEP WORKING ON THE SEARCH ENGINE
            CORRECT THE LAYOUT FOR A BETTER ONE 
            FIND THE BETTER WAY TO FILTER RESULTS OF LOCAL STUFF
            MAYBE IS BEST TO FILTER ON THE PAGE, SINCE WE CAN FILTER THE ALREADY PLACED NODES

            searchResults.selectAll(".search-result").data(resultsArray).enter()
                .append("div")
                .classed("search-result", true)
                .style("cursor", "pointer")
                .text(function(d) { return d.name; })
                /*.on("click", function(d) {
                    //console.log(d);
                    $.get("./", { node_path: "", node_id: d.id }, function(result) {

                        var resultJson = JSON.parse(result);

                        var nodes = resultJson.nodes;
                        var links = resultJson.links;

                        console.log(resultJson);

                        //Nodes map to get nodes reference thru their names
                        var nodesArray = [];

                        //Links array to store all the links references
                        var linksArray = [];

                        //Populate nodes array and define necessary objects and arrays for all the nodes
                        for(var i = 0; i < nodes.length; i++) {
                            var currNode = nodes[i];

                            //currNode.id = parseInt(currNode.id);

                            //Set node reference to the nodesArray
                            nodesArray[currNode.id] = currNode;
                            
                            currNode.parentLinks = [];  //Define parent links array
                            currNode.childLinks = [];   //Define child links array

                        }

                        for(var i = 0; i < links.length; i++) {
                            var currLink = links[i];

                            var sourceNode = nodesArray[currLink.source];
                            var targetNode = nodesArray[currLink.target];

                            //Create new link object
                            var newLink = { source: sourceNode, target: targetNode }
                            linksArray.push(newLink);

                            //Pass the link reference to the nodes
                            targetNode.parentLinks.push(newLink);
                            sourceNode.childLinks.push(newLink);
                        }

                        //Set nodes levels
                        var currLevel = 0;

                        //Function to resursivelly set nodes position levels
                        function setLevels(node) {
                            if(currLevel > 100)
                                return;

                            currLevel++;

                            for(var i = 0; i < node.childLinks.length;i++) {
                                var cNode = node.childLinks[i].target;

                                if(cNode.level == undefined || cNode.level < currLevel)
                                    cNode.level = currLevel;

                                setLevels(cNode);
                            }

                            currLevel--;
                        }

                        //Find the root nodes and start setting nodes levels
                        for(var i = 0; i < nodes.length; i++) {
                            var currNode = nodes[i];

                            //if it is a not a root node
                            if(currNode.parentLinks.length > 0)
                                continue;   //proceed next iteration

                            currNode.level = 0;
                            setLevels(currNode);
                        }

                        console.log(nodes);


                        var graphBox = graphContainer.node().getBBox();

                        createNodes(resultJson.nodes, graphBox);

                        createLinks(linksArray);

                        //MUST CREATE PHANTOM NODES WITH THE RECEIVED DATA

                    });                              
                })*/
                ;

                //CREATE TABLE FOR NODES NAMES, TYPES, FAMILY WHEREVER TO BE USED AS STANDARD

            console.log(resultsArray);         
        });     
    }




            /*var userProfile = $("#user-profile-container");

            var searchField = $("#search-field");

            var searchResults = $("#search-results-container");
            searchResults.hide();

            var searchContainer = d3.select("#search-results-container");

            var searchTimeout = null;

            searchField.on("keydown", function(event) {
                if(searchTimeout)
                    clearTimeout(searchTimeout);

                //Must set timeout to give time for the field register its new value and avoid too many ajax requests
                searchTimeout = setTimeout(function() { 
                    searchTimeout = null;
                    onSearch(searchField.val(), event.keyCode);
                }, 500);    

            })
            //.on("focus", onSearchFocus)
            //.on("focusout", onSearchFocusOut)
            ;

            function onSearchFocus() {
                userProfile.hide();
            }

            function onSearchFocusOut() {
                userProfile.show();
            }

            

        function createNodes(nodes, graphBox, maxLevel) {
            graphContainer.selectAll(".search-node").remove();

            var levelPos = [];

            //Create nodes
            var skillNode = graphContainer.selectAll(".search-node").data(nodes).enter()
                .append("g")
                .classed("skill-node", true)
                .classed("search-node", true)
                .attr("transform", function(d) {
                    //Set node ref to the node data obj
                    d.nodeObj = d3.select(this);

                    if(levelPos[d.level] == undefined)
                        levelPos[d.level] = 0;
                    else
                        levelPos[d.level] += 100;    

                    d.x = parseInt(graphBox.x + graphBox.width*0 + 0 + d.level*250);
                    d.y = parseInt(graphBox.y + graphBox.height + 50 + levelPos[d.level]);

                    return "translate(" + d.x + " " + d.y +")";

                })
                //.on("click", selectNodePath)
                //.on("dblclick", openSkillModal)
                ;

            //DEBUG PURPOSES
            if(NODE_DRAG)
                skillNode.call(drag);   
                
            var skillNodeContainer = skillNode.append("rect")
                .attr("class", "skill-node-container")
                .attr("height", function(d) {
                    //d.containerHeight = 12 * d.outputs.length + 28;
                
                    d.containerHeight = 40; //DEBUG

                    return d.containerHeight;
                })
                .attr("fill", function(d) {
                    if(d.bgcolor)
                        return d.bgcolor;
                    else
                        return "#bbb";
                });


            skillNode.append("rect")
                .attr("x", 1)
                .attr("y", 1)
                .attr("width", 28)
                .attr("height", function(d) {
                    return d.containerHeight - 2;   
                })
                .attr("stroke", "none")
                .attr("fill-opacity", 0.2)
                .attr("fill", "#000");


            skillNode.append("text")
                .attr("class", "skill-node-label")
                .text(function(d) { return d.name; })
                .attr("x", 38)
                .attr("y", function(d) {
                    //Set y position in function of container height
                    
                    var textBox = this.getBBox();
                    
                    d.containerWidth = textBox.width < 40 ? 100 : textBox.width + 60;

                    return (d.containerHeight - textBox.height) / 2 - textBox.y;
                })
                .attr("fill", function(d) {
                    if(d.fgcolor)
                        return d.fgcolor;
                    else
                        return "#000";
                });

            //Set skill container width now the text has been placed
            skillNodeContainer.attr("width", function(d) { return d.containerWidth; });

            //Draw input symbol
            skillNode.append("path")
                .attr("d", "M0,0 14,7 L0,14z")
                .attr("fill", "#aaa")
                .attr("stroke", "#fff")
                .attr("stroke-width", 2)
                .attr("transform", function(d) {
                    return "translate(-5 " + (d.containerHeight - 14) / 2 + ")";
                });

            //Draw output symbol
            skillNode.append("path")
                .attr("d", "M0,0 14,7 L0,14z")
                .attr("fill", "#aaa")
                .attr("stroke", "#fff")
                .attr("stroke-width", 2)
                .attr("transform", function(d) {
                    return "translate(" + (d.containerWidth - 5) + " " + (d.containerHeight - 14) / 2 + ")";
                });



            return skillNode;

        }

        function createLinks(links) {
            //Create the links
            var skillLink = graphContainer.selectAll(".search-link").data(links).enter()
                .insert("path", ":first-child")
                .classed("skill-link", true)
                .classed("search-link", true)
                .attr("d", function(link) {
                    link.linkObj = d3.select(this); //get the link obj reference

                    //Return the path created by the source and target nodes
                    return createLinkPath(link);
                })
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-width", 2);

            return skillLink;
        }*/









});