//var userNodes = [];
//var userLinks = [];

function initApp(username) {

    //Init the nodes container appended to the general content section
    Navigatte.Container.Init("#general-content");
    //initNodesContainer("#general-content");

    //Get and project the user nodes and links
    $.get("rest/user_data.php", { user: username, nodes: true, links: true })
    .done(function(response) {
        response = JSON.parse(response);    //parse json obj

        if(response.result == "SUCCESS") {
            //Init the nodes and links once the user data arrives

            SetNodesPositions(response.nodes, response.links);


            Navigatte.Nodes.Init(response.nodes);
            Navigatte.Links.Init(response.links);

            //Move the nodes to fit scale and position

            var containerBox = Navigatte.Container.Select().node().getBBox();


            var xOffset = 310;
            var yOffset = 70;

            var xMargin = 20;
            var yMargin = 20;              
            
            var yScale = (window.innerHeight - yOffset - yMargin) / containerBox.height;
            var xScale = (window.innerWidth - xOffset - xMargin) / containerBox.width;

            var newScale = xScale < yScale ? xScale : yScale;   //Get the lower scale

            newScale = newScale > 1 ? 1 : newScale; //Ensure they are max of 1
            newScale = newScale < 0.1 ? 0.1 : newScale; //ensure they are min of 0.1

            //newScale = 1;

            //Apply the scale to the chart
            Navigatte.Container.Scale(newScale);

            //Translate it to the better position
            Navigatte.Container.Translate(-containerBox.x * newScale + xOffset + xMargin/2,
                -containerBox.y * newScale + yOffset + yMargin/2);
            
        } else {
            console.log(response.result);
        }
    })
    .fail(function(response) {
        console.log(response);
    });

}



function SetNodesPositions(nodes, links) {
    
    var posLevel = -1;

    //Recursive function to set node levels
    function setNodeLevel(node) {
        posLevel++;

        if(node.posLevel == undefined || node.posLevel < posLevel) {
            node.posLevel = posLevel;
            //node.name += posLevel;
        }

        //Get the target links from this node
        for(var linkIndex = 0; linkIndex < links.length; linkIndex++) {
            var currentLink = links[linkIndex];

            if(currentLink.sourceId != node.globalId)
                continue;

            for(var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++){
                var currentNode = nodes[nodeIndex];

                if(currentNode.globalId == currentLink.targetId)
                    setNodeLevel(currentNode);
            }
        }

        posLevel--;
    }



    //Populate the first column
    var firstColumn = [];

    for(var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        var currentNode = nodes[nodeIndex];

        var nodeFound = false;

        for(var linkIndex = 0; linkIndex < links.length; linkIndex++) {
            var currentLink = links[linkIndex];

            if(currentNode.globalId == currentLink.targetId) {
                nodeFound = true;
                break;
            }
        }

        if(!nodeFound)
            firstColumn.push(currentNode);
    }

    //Set levels
    for(var i = 0; i < firstColumn.length; i++) {
        setNodeLevel(firstColumn[i])
    }

    //Populate level maps
    /*var levelMaps = [];

    for(var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        var cNode = nodes[nodeIndex];

        if(levelMaps[cNode.posLevel] == undefined)
            levelMaps[cNode.posLevel] = [];

        levelMaps[cNode.posLevel].push(cNode);
    }*/


    var columnsOffset = [];

    //Set nodes coordinates
    for(var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        var cNode = nodes[nodeIndex];

        if(columnsOffset[cNode.posLevel] == undefined)
            columnsOffset[cNode.posLevel] = 0;
            
        cNode.x = cNode.posLevel * 500;     
        cNode.y = columnsOffset[cNode.posLevel];

        columnsOffset[cNode.posLevel] += 60;
    }    

}

/*
    //Flag showing whether a node is selected
    var nodeSelected = false;

//Function to clear all selections
var clearAllSelections = function() {

    if(!nodeSelected)
        return;

    if(preventMouseClick) {
        preventMouseClick = false;
        return;
    }

    //Focus all nodes
    d3.select("#nodes-container").selectAll(".user-nodes")
        .style("opacity", 1);

    //Focus all links
    d3.select("#nodes-container").selectAll(".user-links")
        .style("opacity", 1);

    //Clear any selected class
    d3.selectAll(".skill-node-container-selected")
        .classed("skill-node-container-selected", false);

    nodeSelected = false;
}


//Flag to signalize if the we should prevent the selection clear due to some event
var preventMouseClick = false;

//Function to highlight all the path towards a specified node
var selectNodePath = function(d) {

    //Avoid click event on svgContainer
    d3.event.cancelBubble = true;

    if(preventMouseClick) {
        preventMouseClick = false;
        return;
    }

    nodeSelected = true;

    //Unfocus all nodes
    d3.select("#nodes-container").selectAll(".user-nodes")
        .style("opacity", .1);

    //Unfocus all links
    d3.select("#nodes-container").selectAll(".user-links")
        .style("opacity", .1);

    //Clear any selected class
    d3.selectAll(".skill-node-container-selected")
        .classed("skill-node-container-selected", false);

    //Highlight target node selected class
    d.d3Select.select(".node-rect")
        .classed("skill-node-container-selected", true);


    //Function to recursively highlight nodes chain
    var highlightNodes = function(tNode) {
        tNode.d3Select.style("opacity", 1);  

        //iterate thru all parent links
        for(var i = 0; tNode.parentLinks && i < tNode.parentLinks.length; i++) {
            var currLink = tNode.parentLinks[i];

            currLink.d3Select.style("opacity", 1);   

            highlightNodes(currLink.source);//recurse this function on the node
        }

    }

    //Recursivelly highlight clicked node and its parents
    highlightNodes(d);
}*/
