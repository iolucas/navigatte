<?php
//------------------------------------------------------
//------------- NAVIGATTE MAIN CONTROLLER --------------
//------------------------------------------------------

include 'php/includes/magicquotes.inc.php'; //Disable magic quotes that are used to avoid php injection

//Functions used to avoid php,sql injection attacks, such htmlout to be used in place of echo
include 'php/includes/helpers.inc.php';	

include 'php/includes/access.inc.php';	



//include 'php/views/index2.html.php';
//exit();


//If an action has been posted...
if (isset($_POST['action'])) {

	//If the action is a signIn
	if ($_POST['action'] == 'signin') {

		//If some of the values are not valid or not set, return error
		if (!isset($_POST['username']) || $_POST['username'] == '' || !isset($_POST['password']) || $_POST['password'] == '')
		{
			//Set error and return the main page
			$GLOBALS['loginError'] = 'Please fill in both fields';
			include 'php/views/main_page.html.php';
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
			include 'php/views/main_page.html.php';
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

/*if (isset($_GET['test'])) {

	print_r(getUserInfoBy('id', '2'));
	exit();


}*/


//If a user profile request
if (isset($_GET['user'])) {

	//Get the user name
	$username = $_GET['user'];

	//If the username is empty
	if($username == "") {
		echo 'INVALID_USER';
		exit();
	}

	//Query user info by user name
	$userInfo = getUserInfoBy('username', $username);

	if($userInfo == null) {
		echo 'USER_NOT_FOUND';
		exit();		
	}

	//Get whether the user is signed in
	$signedInFlag = checkUserSignedIn();

	//include 'htmls/prof_page.html.php';
	include 'php/views/user_page.html.php';

	exit();
}

//If no get or post request were made...

//Get whether the user is signed in
$signedInFlag = checkUserSignedIn();

//If the user is signed in
if($signedInFlag) {
	//Query user info by user id
	$userInfo = getUserInfoBy('id', $_SESSION['userId']);
	include 'php/views/user_page.html.php';

	exit();
}

//If it is not signed in, return the main page
include 'php/views/main_page.html.php';

exit();


//Function to get the user info by different manners
function getUserInfoBy($by, $byValue) {
	//Connect to database
	include 'php/includes/db.inc.php';	

	$sql = 'SELECT page_name, screen_name, screen_description, profile_pic FROM users WHERE ';

	switch($by) {
		case "id":
			$s = $pdo->prepare($sql . 'id = :userId');
			$s->bindValue(':userId', $byValue);
			break;

		case "username":
			$s = $pdo->prepare($sql . 'page_name = :userName');
			$s->bindValue(':userName', $byValue);
			break;

		default:
			return null;
			exit();
	}

	$s->execute();
	$userInfo = $s->fetch();

	//If user info was not defined
	if(!$userInfo) {
		return null;
		exit();		
	}

	//Clear integer indexes
	unsetIntIndex($userInfo);

	return $userInfo;
}