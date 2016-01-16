<div layout="column" style="width:100%;background-color:#004D40;height:100%;padding-top:20px;" layout-align="start center">

    <?php if (isset($username)): ?>
    	<div class="user-img"></div>
		<div id="user-name" class="black-font"><?php htmlout($userInfo['screen_name']); ?></div>
        <div id="user-trackers" class="black-font">Trackers 1000</div>
        <div id="user-tracking" class="black-font">Tracking 1000</div>
        <div id="user-description" class="black-font"><?php htmlout($userInfo['screen_description']); ?></div>

    <?php else: ?>

    	<md-button ng-click="createBlock($event);" class="md-accent md-raised">Create Block</md-button>
    	<br>
    	<md-button ng-click="saveChanges();" class="md-accent md-raised">Save Changes</md-button>
        <br>
        <md-button ng-click="toast();" class="md-accent md-raised">Test Toast</md-button>

        <button id="createNodeButton" class="btn btn-info btn-lg" 
            type="button" 
            style="height:50px;width:290px;border-radius:0;position:initial;left:0; top:180px;">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            Criar Bloco
        </button>


    <?php endif ?>



</div>