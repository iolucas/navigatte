//Module to execute task to enable path selections and deselections
Navigatte.Path = new function() {

	var nodeSelected = false;

    this.Deselect = function() {
        return deselectPath();        
    }

	function selectPath(node) {
		nodeSelected = true;

    	//Unfocus all nodes
    	d3.selectAll(".navi-nodes").style("opacity", .1);

    	//Unfocus all links
    	d3.selectAll(".navi-links").style("opacity", .1);

    	//Clear any selected class
    	d3.selectAll(".node-inner-rect-selected")
        	.classed("node-inner-rect-selected", false);

       	//Highlight target node selected class
    	node.d3Select.select(".node-inner-rect")
        	.classed("node-inner-rect-selected", true);

        //Highlight all the path to the selected node
        recurseHighLightNodes(node);
	}

	function deselectPath() {

    	if(!nodeSelected)
        	return;

    	//Focus all nodes
    	d3.selectAll(".navi-nodes").style("opacity", 1);
    	
    	//Focus all links
    	d3.selectAll(".navi-links").style("opacity", 1);

    	//Clear any selected class
    	d3.selectAll(".node-inner-rect-selected")
        	.classed("node-inner-rect-selected", false);

    	nodeSelected = false;
	}

	function recurseHighLightNodes(node) {
		node.d3Select.style("opacity", 1);  

		var nodeLinks = Navigatte.Links.Get({ nodeId: node.node_id, target: true });

        //iterate thru all parent links
        for(var i = 0; i < nodeLinks.length; i++) {
            var currLink = nodeLinks[i];

            currLink.d3Select.style("opacity", 1);   

            recurseHighLightNodes(Navigatte.Nodes.Get(currLink.source_id));//recurse this function on the node
        }
	}

	//Add event listeners to nodes and containers
	Navigatte.Nodes.on("click", selectPath);
	Navigatte.Container.on("click", deselectPath);
}




/*
Navigatte.Nodes.on("click", function() {









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
	


});*/

