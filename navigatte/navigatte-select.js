//Module to execute task to enable path selections and deselections
Navigatte.Select = new function() {

    var selection = null;
    this.GetSelection = function() {
        return selection;
    }

    function unfocusAll() {
        //Unfocus all nodes
        d3.selectAll(".navi-nodes").style("opacity", .1);

        //Unfocus all links
        d3.selectAll(".navi-links").style("opacity", .1);        
    }

    function focusAll() {
        //Unfocus all nodes
        d3.selectAll(".navi-nodes").style("opacity", 1);

        //Unfocus all links
        d3.selectAll(".navi-links").style("opacity", 1);        
    }

    function deselectAll() {
        if(selection == null)
            return;

        selection = null;

        focusAll();

        //Clear any selected class
        d3.selectAll(".node-inner-rect-selected")
            .classed("node-inner-rect-selected", false);

        //Clear any selected class
        d3.selectAll(".navi-links-selected")
            .classed("navi-links-selected", false);
    }

    this.DeselectAll = function() {
        return deselectAll();
    }


    //Nodes

    function selectNode(node) {
        deselectAll();

        selection = node;

        unfocusAll();

        //Highlight target node selected class
        node.d3Select.select(".node-inner-rect")
            .classed("node-inner-rect-selected", true);

        recurseHighLightNodes(node);
    }

    function recurseHighLightNodes(node) {
        node.d3Select.style("opacity", 1);  

        var nodeLinks = Navigatte.Links.Get({ nodeId: node.globalId, target: true });

        //iterate thru all parent links
        for(var i = 0; i < nodeLinks.length; i++) {
            var currLink = nodeLinks[i];

            currLink.d3Select.style("opacity", 1);   

            recurseHighLightNodes(Navigatte.Nodes.Get(currLink.sourceId));//recurse this function on the node
        }
    }

    //Register drag event to not select in case node is dragged
    var nodeDragged = false;

    Navigatte.Nodes.on("drag", function() {
        nodeDragged = true;
    });

    Navigatte.Nodes.on("click", function(d) {

        if(nodeDragged) {
            nodeDragged = false;
            return;
        }

        selectNode(d);
    });


    //Links

    function selectLink(link) {
        deselectAll();

        selection = link;

        //Highlight target link selected class
        link.d3Select.classed("navi-links-selected", true);

    }

    Navigatte.Links.on("click", selectLink);


    //Add page event listener
    Navigatte.Container.on("click", deselectAll);
}