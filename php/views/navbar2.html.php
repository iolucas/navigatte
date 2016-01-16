<?php if(false): ?>
<div style="width:100%;height:60px;background-color:blue;color:#fff;" layout="row" class="fixed-top md-whiteframe-z3" layout-align="center center">
	Teste
</div>


<?php else: ?>


<md-toolbar layout="row" class="md-whiteframe-z3 fixed-top" layout-align="center center">

	
		<div hide-gt-md show flex="20">oi
			<!--<div class="user-img" style="width:50px;height:50px;"></div>-->
		</div>

		<img src="assets/img/boat-9-48.png">

		<h2>
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
		<div flex="20" class="md-accent">oi</div>
	
</md-toolbar>

<!--Toolbar reducing height betwen 960 and 542-->

<?php endif ?>