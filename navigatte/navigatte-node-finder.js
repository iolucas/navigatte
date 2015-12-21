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

        Navigatte.Nodes.ClearProjection();
        Navigatte.Links.ClearProjection();
        Navigatte.Nodes.Refresh();
        Navigatte.Links.Refresh();

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

            //Filter nodes that already exists
            for(var i = 0; i < resultsArray.length; i++){
                //If the id exists, remove it and subtract one from iteration due to removal
                if(Navigatte.Nodes.Get(resultsArray[i].globalId) != null) {
                    resultsArray.splice(i, 1);
                    i--;
                }  
            }

            if(resultsArray.length < 1) {
                searchResults.append("div")
                    .classed("search-noresult", true)  
                    .text("No results.");

                return;
            }

            //KEEP WORKING ON THE SEARCH ENGINE
            //CORRECT THE LAYOUT FOR A BETTER ONE 
            //FIND THE BETTER WAY TO FILTER RESULTS OF LOCAL STUFF
            //MAYBE IS BEST TO FILTER ON THE PAGE, SINCE WE CAN FILTER THE ALREADY PLACED NODES

            searchResults.selectAll(".search-result").data(resultsArray).enter()
                .append("div")
                .classed("search-result", true)
                .style("cursor", "pointer")
                .text(function(d) { return d.name; })
                .on("click", function(d) {
                    //console.log(d);
                    
                    $.get("gets/node_path.php", { id: d.localId })
                        .done(function(response){
                            var respObj = JSON.parse(response);

                            Navigatte.Project(respObj);

                        });
                });        
        });     
    }
});