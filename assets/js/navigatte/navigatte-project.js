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

    //Level object to handle its value
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
            levelPos[cNode.level] += 50;    

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
    			if(projObj.links[i].targetId == projNodes[j].globalId) {
                    projObj.links[i].projection = true; //set flag for link projection
    				projLinks.push(projObj.links[i]);
                }

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