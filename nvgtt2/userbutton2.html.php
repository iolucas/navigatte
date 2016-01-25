<md-menu>
	
	<md-button aria-label="Open phone interactions menu" ng-click="$mdOpenMenu($event);">
		Your Account
	</md-button>

	<md-menu-content width="4">
			<md-menu-item>
	        <?php if (isset($username)): ?>
	        	<md-button ng-href="./">
					Home
				</md-button>
            <?php else: ?>
            	<md-button ng-href="?user={{username}}">
					Profile
				</md-button>
            <?php endif ?>
            </md-menu-item>

		<md-menu-divider></md-menu-divider>

		<form method="post" id="signOutForm"><input type="hidden" name="action" value="signout"></form>

		<md-menu-item>
			<md-button ng-click="signOut();">
				Sign Out
			</md-button>
		</md-menu-item>

	</md-menu-content>

</md-menu>
