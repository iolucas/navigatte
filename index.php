<?php
//------------------------------------------------------
//------------- NAVIGATTE MAIN CONTROLLER --------------
//------------------------------------------------------

include 'includes/magicquotes.inc.php'; //Disable magic quotes that are used to avoid php injection
include 'includes/helpers.inc.php';	//Functions used to avoid php,sql injection attacks, such htmlout to be used in place of echo
include 'includes/access.inc.php';	

//If an action has been posted...
if (isset($_POST['action'])) {

	//If the action is a signIn
	if ($_POST['action'] == 'signin') {

		//If some of the values are not valid or not set, return error
		if (!isset($_POST['username']) || $_POST['username'] == '' || !isset($_POST['password']) || $_POST['password'] == '')
		{
			//Set error and return the main page
			$GLOBALS['loginError'] = 'Please fill in both fields';
			include 'htmls/main_page.html.php';
			exit();
		}

		//If the page login sucessfully...
		if(userSignIn($_POST['username'], $_POST['password'])) {
		
			//If a goto page has been passed, return that page
			if(isset($_POST['goto']))
				header('Location: ' . $_POST['goto']);
			else //Otherwise, redirect to the user page (root)
				header('Location: ./');

		} else {
			//Set error and return the main page
			$GLOBALS['loginError'] = 'The specified email address or password was incorrect.';
			include 'htmls/main_page.html.php';
		}

		exit();
	}

	//If the action is a signOut
	if ($_POST['action'] == 'signout') {
		//Perform signout
		userSignOut();

		//If a goto has been passed, go to return that page
		if(isset($_POST['goto']))
			header('Location: ' . $_POST['goto']);
		else //Otherwise, redirect to the welcome page (root)
			header('Location: ./');

		exit();
	}
}

//If a user profile request
if (isset($_GET['user'])) {

	//Get the user name
	$username = $_GET['user'];

	//If the username is empty
	if($username == "") {
		echo 'INVALID_USER';
		exit();
	}

	//Connect to the database
	include 'includes/db.inc.php';

	//Try to get the user information
	$sql = 'SELECT screen_name, screen_description, profile_pic FROM users WHERE page_name = :username';
	$s = $pdo->prepare($sql);
	$s->bindValue(':username', $username);
	$s->execute();

	$userinfo = $s->fetch();

	//Disconnect DB
	$pdo = null;

	//If the user does not exists, return user not found
	if(!$userinfo) {
		echo 'USER_NOT_FOUND';
		exit();
	} 

	include 'htmls/prof_page.html.php';

	exit();
}

//If no get or post request were made...

//Check if the user is signed in
if(!checkUserSignedIn()) {
	//If not, return the welcome page and exit
	include 'htmls/main_page.html.php';
	exit();
}

//If so, get user info and return the user page
getUserInfo($_SESSION['userId']);



include 'htmls/user_page.html.php';

exit();


function getUserInfo($userId) {
	//Reset user info variable
	$GLOBALS['userInfo'] = array();

	//Connect to database
	include 'includes/db.inc.php';

	try
	{
		$sql = 'SELECT page_name, screen_name, screen_description, profile_pic FROM users WHERE id = :userId';
		$s = $pdo->prepare($sql);
		$s->bindValue(':userId', $userId);
		$s->execute();

		//Foreach user gotten (expected only one)
		foreach ($s as $row) {
			$GLOBALS['userInfo']['page_name'] = $row['page_name'];
			$GLOBALS['userInfo']['screen_name'] = $row['screen_name'];
			$GLOBALS['userInfo']['screen_description'] = $row['screen_description'];	
			$GLOBALS['userInfo']['profile_pic'] = $row['profile_pic'];
			return;
		}

		throw new PDOException("Error Processing Request", 1);		
	}

	catch (PDOException $e)
	{
		$error = 'Error while getting user info';
		include 'includes/error.html.php';
		exit();
	}
}