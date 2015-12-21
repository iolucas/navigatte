//Module to handle nodes projections
Navigatte.Project = function(projObj) {

    //console.log(projObj);

    Navigatte.Nodes.ClearProjection();
    Navigatte.Links.ClearProjection();
    Navigatte.Nodes.Refresh();
    Navigatte.Links.Refresh();

    //Got to filter necessary nodes
    var mainNode = projObj.nodes[0];

    var projNodes = [];
    var projLinks = [];

    getMissingNodes(mainNode);

    getRelatedLinks(projNodes);

    //console.log(projNodes);
    //console.log(projLinks);

        //Prepare nodes
    for(var i = 0; i < projNodes.length; i++){
        var cNode = projNodes[i];    

        cNode.bgcolor = "#fff";
        cNode.fgcolor = "#000";
        cNode.x = 500;
        cNode.y = 0;
    }


    //Find the root nodes and start setting nodes levels
    /*for(var i = 0; i < projNodes.length; i++) {
        var currNode = projNodes[i];

        //Iterate thry the links and check whether this node is not mentioned in targets, 
        //meaning it has no parents (root node)

        var rootNode = true;
        for(var j = 0; j < projLinks.length; j++) {
        	if(projLinks[j].targetId == currNode.globalId) {
        		rootNode = false;
        		break;
        	}
        }

        //if it is a root proceed next iteration
        if(!rootNode)
        	continue;

        currNode.level = 0;
        setLevels(currNode, projNodes, projLinks);
    }*/

    var levelObj = new function() {
    	var level = 0;
    	var maxLevel = 0;

    	this.Inc = function() {
    		level++;
    		
    		if(maxLevel < level)
    			maxLevel = level;
    	}

    	this.Dec = function() {
    		level--;
    	}

    	this.Get = function() {
    		return level;
    	}

    	this.GetMax = function() {
    		return maxLevel - 1;
    	}
    }

    getLevels(mainNode, projNodes, projLinks, levelObj);

    var containerBox = Navigatte.Container.Select().node().getBBox();

    var levelPos = [];

    for(var i = 0; i < projNodes.length; i++) {
    	var cNode = projNodes[i];

        if(levelPos[cNode.level] == undefined)
            levelPos[cNode.level] = 0;
        else
            levelPos[cNode.level] += 100;    

        cNode.x = parseInt(containerBox.x + containerBox.width + (cNode.level-levelObj.GetMax())*-250) + 50;
        cNode.y = parseInt(containerBox.y + containerBox.height*0 + levelPos[cNode.level]) + 50;
    }


    /*console.log(levelObj.GetMax());


    console.log(containerBox);   
    
    console.log(projNodes);
    console.log(projLinks);*/


    Navigatte.Nodes.Project(projNodes);
    Navigatte.Nodes.Refresh();

    Navigatte.Links.Project(projLinks);
    Navigatte.Links.Refresh();

	//function to filter the nodes that don't exists on this container
    function getMissingNodes(node) {
    	//Check if it were not put
    	if(projNodes.indexOf(node) != -1)
    		return;

    	//Push the node
    	projNodes.push(node);

    	for(var i = 0; i < projObj.links.length; i++) {
    		var cLink = projObj.links[i];

    		//If the target id, is the current id
    		if(cLink.targetId == node.globalId) {

    			//check if the source node doest exists 
    			if(Navigatte.Nodes.Get(cLink.sourceId) == null) {

    				//if it did not exists, find it and add it recursivelly
    				for(var j = 0; j < projObj.nodes.length; j++) {
    					if(projObj.nodes[j].globalId == cLink.sourceId) {
    						getMissingNodes(projObj.nodes[j])
    						break;
    					}
    				}    				
    			}
    		}
    	}
    }

    //Function to get the links related to the passed nodes
    function getRelatedLinks(projNodes) {
    	for(var i = 0; i < projObj.links.length; i++) {
    		for(var j = 0; j < projNodes.length; j++) {
    			if(projObj.links[i].targetId == projNodes[j].globalId)
    				projLinks.push(projObj.links[i]);

    		}
    	}
    }

    function getLevels(node, nodes, links, levelObj) {
        if(levelObj.Get() > 100) {
        	console.log("ERROR_CIRCULAR_BUG");	//avoid circular bug
            return;
        }

        if(node.level == undefined || node.level < levelObj.Get()) {
           	node.level = levelObj.Get();
        }

        levelObj.Inc();

        //iterate thru the links
        for(var i = 0; i < links.length; i++) {

        	//If the target of the current is not the specified, proceed next iteration
        	if(links[i].targetId != node.globalId)
        		continue;

        	//Find the source node of this link
        	var cNode = null;
        	for(var j = 0; j < nodes.length; j++) {
        		if(nodes[j].globalId == links[i].sourceId) {
        			cNode = nodes[j];
        			break;
        		}
        	}

        	//If no parent were found
        	if(cNode == null) {
        		//console.log("root node");
        		continue;
        	}

            getLevels(cNode, nodes, links, levelObj);
        }

        levelObj.Dec();
    }
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

//---------------------------------

                    /*$.get("./", { node_path: "", node_id: d.id }, function(result) {

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

                    }); */   


