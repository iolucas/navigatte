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

            //CreateHexagon2();

            Navigatte.Nodes.Init(response.nodes);
            Navigatte.Links.Init(response.links);

            //Move the nodes to fit scale and position

            var containerBox = Navigatte.Container.Select().node().getBBox();


            var margin = {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }           
            
            var yScale = (window.innerHeight - margin.top - margin.bottom) / containerBox.height;
            var xScale = (window.innerWidth*0.8 - margin.left - margin.right) / containerBox.width;

            var newScale = xScale < yScale ? xScale : yScale;   //Get the lower scale

            newScale = newScale > 1 ? 1 : newScale; //Ensure they are max of 1
            newScale = newScale < 0.1 ? 0.1 : newScale; //ensure they are min of 0.1

            //Apply the scale to the chart
            Navigatte.Container.Scale(newScale);

            //Translate it to the better position
            Navigatte.Container.Translate(-containerBox.x * newScale + margin.left,
                -containerBox.y * newScale + margin.top);
            
        } else {
            console.log(response.result);
        }
    })
    .fail(function(response) {
        console.log(response);
    });

}

function CreateHexagon2() {
    var hexbin = d3.hexbin();

    

        //Create object to handle nodes drag
    var nodeDrag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("drag", function(d) {

            if(d.x != d3.event.x || d.y != d3.event.y) {

                d.x = d3.event.x;
                d.y = d3.event.y;

                //Update node position
                d3.select(this).attr("transform", "translate(" + d.x + " " + d.y + ")");
            }      
        });

        var points = [];

        for(var i = 0; i < 100;i++)
            points.push([i,0]);



//Draw the hexagons
    Navigatte.Container.Select().append("g")
        .selectAll(".hexagon")
        .data(hexbin(points))
        .enter().append("path")
        .attr("stroke-linejoin","round")
        .classed("hexagon", true)
        .classed("node-inner-rect-group", true)
        .attr("transform", function(d) { 
            //console.log(d);
            return "translate(" + d.x + "," + d.y + ")"; 

        })
        .attr("d", hexbin.hexagon(70))
        //.attr("stroke", "white")
        //.attr("stroke-width", "1px")
        .style("fill", "teal")
        .call(nodeDrag);
}



function CreateHexagon() {
    //svg sizes and margins
var margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50
}, 
width = 850,
height = 350;

//The number of columns and rows of the heatmap
var MapColumns = 30,
    MapRows = 20;
 
//The maximum radius the hexagons can have to still fit the screen
var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
   height/((MapRows + 1/3) * 1.5)]);


//Calculate the center positions of each hexagon 
var points = [];
for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
        points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
    }//for j
}//for i


var hexbin = d3.hexbin()
            .radius(hexRadius);



//Draw the hexagons
Navigatte.Container.Select().append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
  return "M" + d.x + "," + d.y + hexbin.hexagon(20);
 })
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
    .style("fill", "teal");

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
