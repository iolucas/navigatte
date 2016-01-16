<div style="background-color:#263238;height:100%;color:#fff;" layout-align="center center" layout="row">
		
	<div hide show-gt-md flex="20">
		<!--<div class="user-img" style="width:50px;height:50px;"></div>-->
	</div>

	<img hide show-gt-md src="assets/img/boat-9-48.png">

	<h2 hide show-gt-md>
		<span style="font-family: 'Fredoka One', cursive;">Navigatte</span>
	</h2>

	<div flex ng-controller="SearchController" style="margin: 0 30px 0 30px;color:#000;">

		<md-autocomplete
			md-search-text="searchText"
			md-selected-item="selectedItem"
			
			md-search-text-change="searchTextChange(searchText)"
			md-selected-item-change="selectedItemChange(selectedItem)"	
			
			md-item-text="item.name"
			
			md-items="item in querySearch(searchText)"

      		md-no-cache="false" 

			placeholder="Search...">
				<md-item-template>
					<span>{{item.name}}</span>
				</md-item-template>
				<md-not-found>
					No matches found.
				</md-not-found>
		</md-autocomplete>

	</div>

	<!--<md-button hide show-gt-md>Your Account</md-button>-->
	<?php include 'userbutton2.html.php'; ?>
	<div hide show-gt-md flex="20" class="md-accent"></div>



</div>