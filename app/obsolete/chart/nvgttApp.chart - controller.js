'use strict';

angular.module('nvgttApp.chart')
	
.controller('ChartController', function($scope, $window, $location, nvgttChart, nvgttBlocks, alertify, nvgttHref) {
	
	$scope.teste = {
		name: "Lucasssdgsdfsdf",
		x: 0,
		y: 0,
		x2: 100
	}

	$scope.testClick = function() {
		alertify.log("teste");
	}

	$scope.deleteBlock = function(index) {
		//console.log($scope.blocks);
		//$scope.blocks.splice(index, 1);
	}

	$scope.loadContent = function(blockIndex) {
		nvgttHref.Open("#/content/" + $scope.blocks[blockIndex].localId);
	}


	nvgttBlocks.get($scope.username)
		.then(function(response) {
			
			response = response.data;    //parse json obj

	        if(response.result == "SUCCESS") {
	            //Init the nodes and links once the user data arrives

	            Navigatte.Container.Init();

	            //SetNodesPositions(response.nodes, response.links);

	            var preparedBlocks = [];
	            var preparedLinks = [];

	            for(var i = 0; i < response.nodes.length; i++)
	            	preparedBlocks.push(new NvgttBlock(response.nodes[i]));	

	            for(var i = 0; i < response.links.length; i++) {
	            	var nvgttLink = new NvgttLink(response.links[i]);

	            	//Set source and target blocks
	            	for(var j = 0; j < preparedBlocks.length; j++) {

	            		if(!nvgttLink.hasOwnProperty('sourceBlock') &&
	            			nvgttLink.sourceId == preparedBlocks[j].globalId) 
	            		{
	            			nvgttLink.sourceBlock = preparedBlocks[j];
	            		}

	            		if(!nvgttLink.hasOwnProperty('targetBlock') &&
	            			nvgttLink.targetId == preparedBlocks[j].globalId) 
	            		{
	            			nvgttLink.targetBlock = preparedBlocks[j];
	            		}

	            		//If both properties are set, exit iteration
	            		if(nvgttLink.hasOwnProperty('sourceBlock') && 
	            			nvgttLink.hasOwnProperty('targetBlock')) break;
	            	}

	            	nvgttLink.targetBlock.inputs.push(nvgttLink.sourceBlock);
					nvgttLink.sourceBlock.outputs.push(nvgttLink.targetBlock);

	            	preparedLinks.push(nvgttLink);
	            }	

	            //Set blocks and links to the scope
	            $scope.blocks = preparedBlocks;
				$scope.links = preparedLinks;

	            console.log(response.links);

	            return;	            

	            Navigatte.Nodes.Init(response.nodes);
	            Navigatte.Links.Init(response.links);

	            Navigatte.Nodes.Refresh();

	            Navigatte.Links.on("create", function(){
	            	Navigatte.Nodes.Refresh();
	            });

	            Navigatte.Links.on("delete", function(){
	            	Navigatte.Nodes.Refresh();
	            });

	            return;


	            /*Navigatte.Nodes.on('click', function(d){
	            	console.log(d.GetColumn());
	            	//console.log(d);
	            });*/

	            //return;

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
		}, function(error) {
			console.log("Error while getting user info");
			console.log(error);
		});




	/*var columns = [];

	$scope.blocks = [
		{
			name: "Teste",
			column: 0
		},
		{
			name:"teste2",
			column: 1
		}
	];

	var refreshBlocks = function() {


	}*/


	/*nvgttBlocks.get($scope.username)
		.then(function(response) {
			if(response.data.result == "SUCCESS")
				$scope.blocks = response.data.nodes;
		});*/

	


	/*$scope.chartHeight = $window.innerHeight;
	$scope.chartWidth = $window.innerWidth;

	$window.onresize = function(){
		console.log("test");
		$scope.chartHeight = $window.innerHeight;
		$scope.chartWidth = $window.innerWidth;
		console.log($scope.chartHeight);
	}*/



	/*$scope.nodes = [];


	chartData.get($scope.username, function(response){
		console.log(response);
		$scope.nodes = response.nodes;

	}, function(error){
		console.log(error);
		alertify.error("Error while getting user information");
	});*/

});


function SetNodesPositions(nodes, links) {
    
    var posLevel = -1;

    //Recursive function to set node levels
    function setNodeLevel(node) {
        posLevel++;

        if(node.posLevel == undefined || node.posLevel < posLevel) {
            node.posLevel = posLevel;
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