<div class="btn-group btn-group-md navbar-btn navbar-right">
    
    <?php if ($signedInFlag): ?>
        
        <button type="button" 
                class="btn dropdown-toggle btn-primary" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"> 
                <?php htmlout($userInfo['screen_name']); ?> <span class="caret"></span>
        </button>
        <ul class="dropdown-menu dropdown-menu-right">

            <?php if (isset($username)): ?>
                <li><a href="./">Home</a></li>
            <?php else: ?>
                <li><a href="./?user=<?php htmlout($userInfo['page_name']); ?>">Profile</a></li>
            <?php endif ?>

            <li role="separator" class="divider"></li>
            <li><a href="javascript:void(0)" onclick="document.getElementById('signOutForm').submit();">Sign Out</a></li>
            <form method="post" id="signOutForm"><input type="hidden" name="action" value="signout"></form>
        </ul>                

    <?php else: ?>
        <button type="button" class="btn btn-primary" onclick="location.href='./';">Sign In</button>
        <!--<button type="button" class="btn btn-info">Register</button>-->
    <?php endif ?>

</div>