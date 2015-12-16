//var userNodes = [];
//var userLinks = [];

function initApp(username) {

    //Init the nodes container appended to the general content section
    Navigatte.Container.Init("#general-content");
    //initNodesContainer("#general-content");

    //Get and project the user nodes and links
    $.get("gets/user_data.php", { user: username, nodes: true, links: true })
    .done(function(response) {
        response = JSON.parse(response);    //parse json obj

        if(response.result == "SUCCESS") {
            //Init the nodes and links once the user data arrives
            Navigatte.Nodes.Init(response.nodes);
            Navigatte.Links.Init(response.links);

            //var containerBox = Navigatte.Container.Select().node().getBBox();
            //Navigatte.Container.Translate([-containerBox.x + 310, -containerBox.y + 10]);

            //Navigatte.Container.Select().node().translate(-containerBox.x + 310, -containerBox.y + 10);
            
        } else {
            console.log(response.result);
        }
    })
    .fail(function(response) {
        console.log(response);
    });

}


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
}
