<!--Side menu-->
<nav class="side-menu md-whiteframe-z2">
    <!--<a href="." id="logo">Navigatte</a>-->
    

    <?php if (!isset($username)): ?>
        <input name="search" id="search-field" type="text" placeholder="Where do you want to go?" />

        <!--<div class="divisor"></div>-->

        <?php else: ?>
        <br>    
    <?php endif ?>  


    <div class="user-navigation">

        <?php if (isset($username)): ?>

            <div id="user-profile-container">
                <div class="user-img" style="background-image:url('<?php htmlout('assets/img/' . $userInfo['profile_pic']); ?>');"></div>
                <div id="user-name" class="black-font"><?php htmlout($userInfo['screen_name']); ?></div>
                <div id="user-trackers" class="black-font">Trackers 1000</div>
                <div id="user-tracking" class="black-font">Tracking 1000</div>
                <div id="user-description" class="black-font"><?php htmlout($userInfo['screen_description']); ?></div>
            </div>

        <?php else: ?>

            <button id="createNodeButton" class="btn btn-info btn-lg" 
                type="button" 
                style="height:50px;width:290px;border-radius:0;position:initial;left:0; top:180px;">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                Criar Bloco
            </button>

            <button id="saveChangesButton" class="btn btn-success btn-lg" 
                type="button" 
                style="height:50px;width:290px;border-radius:0;position:initial;left:0; top:250px;" 
                onclick="Navigatte.Changes.Save();">
                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                Salvar
            </button>

        <?php endif ?>
    </div>

    <div class="search-results" style="display:none"></div>

    <!--<footer>
        <div id="pta" class="black-font">Privacy | Terms | About</div>
        <div id="copyright" class="black-font">Copyright 2015 - Navigatte</div>
    </footer>-->

</nav>