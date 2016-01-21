'use strict';

//Main navigatte module
//Dependent of D3js http://d3js.org

//var Navigatte = {}

var NvgttChart = new function() {

	this.load = function(username) {

		d3.json("rest/user_data.php?nodes&links&user=" + username, function(error, response) {
        	
        	if(response.result != "SUCCESS") {
        		console.log("Error while getting user blocks");
        		console.log(response);
        		return;
        	}

        	//Load nodes
        	NvgttChart.Blocks.add(response.nodes);
            NvgttChart.Links.add(response.links);
            NvgttChart.Blocks.refresh();            

            NvgttChart.Container.fitScreen();

            NvgttChart.Blocks.on("click", function(d) {
                console.log(d);
            });

    	});

	}
}

var Navigatte = NvgttChart;