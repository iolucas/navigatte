<?php

//Function to perform a user signIn
function userSignIn($username, $password) {
	//Perform password hash
	//$password = md5($_POST['password'] . 'ijdb');

	//Attempt to get the user id with the username and password supplied
	$userId = getUserId($username, $password);

	//If we got a invalid user id, means the sign in has failed
	if($userId == '-1') {
		//Perform a signOut to ensure all variables are clear
		userSignOut();
		return FALSE;
	}

	//If suceeced...

	@session_start();	//Start the session with no warning in case it already exists

	$_SESSION['userId'] = $userId;
	$_SESSION['username'] = $username;
	$_SESSION['password'] = $password;

	return TRUE;
}

//Function to perform a user signOut
function userSignOut() {
	@session_start();	//Start the session with no warning in case it already exists

	//Just clear all login session variables
	unset($_SESSION['userId']);
	unset($_SESSION['username']);
	unset($_SESSION['password']);
}

//Function to check whether a user is signed in or not
function checkUserSignedIn() {
	@session_start();	//Start the session with no warning in case it already exists

	//If the user Id is not set, return false
	if (!isset($_SESSION['userId']))
		return FALSE;

	//Attempt to get the user id with the session data
	$userId = getUserId($_SESSION['username'], $_SESSION['password']);

	//If the gathered user id is -1 or it is different from the previous userId (which should never happen)
	if($userId == '-1' || $userId != $_SESSION['userId']) {
		userSignOut();	//perform a sign out
		return FALSE;	//and return false
	}

	//If all the checks are fine return true
	return TRUE;
}

//Function to access the database with the username and password and retrieve the user id
function getUserId($username, $password)
{
	include 'db.inc.php';

	try
	{
		$sql = 'SELECT id FROM users WHERE main_email = :username AND pass_phrase = :password';
		$s = $pdo->prepare($sql);
		$s->bindValue(':username', $username);
		$s->bindValue(':password', $password);
		$s->execute();

		//Foreach user gotten (expected only one)
		foreach ($s as $row) {
			return $row['id'];	
		}

		return '-1';
	}

	catch (PDOException $e)
	{
		$error = 'Error while signing in.';
		include 'error.html.php';
		exit();
	}
}





/*
function userIsLoggedIn()
{
	//If informations for loggin were passed
	if (isset($_POST['action']) && $_POST['action'] == 'signIn')
	{
		//If some of the values are not valid or not set, return error
		if (!isset($_POST['username']) || $_POST['username'] == '' || !isset($_POST['password']) || $_POST['password'] == '')
		{
			$GLOBALS['loginError'] = 'Please fill in both fields';
			return FALSE;
		}

		//$password = md5($_POST['password'] . 'ijdb');
		$password = $_POST['password'];

		$userId = getUserId($_POST['username'], $password);

		//If we got a invalid user id, means the sign in has failed
		if($userId == '-1') {
			//Message error and return
			$GLOBALS['loginError'] = 'The specified email address or password was incorrect.';
			return FALSE;
		}

		//If valid user id....

		session_start();	//start the user session and necessary variables
		$_SESSION['signedIn'] = TRUE;
		$_SESSION['userId'] = $userId;
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['password'] = $password;
		return TRUE;
	}

	if (isset($_POST['action']) and $_POST['action'] == 'logout')
	{
		session_start();
		unset($_SESSION['loggedIn']);
		unset($_SESSION['username']);
		unset($_SESSION['password']);
		header('Location: ' . $_POST['goto']);
		exit();
	}

	session_start();
	
	if (isset($_SESSION['loggedIn']))
	{
		return databaseContainsAuthor($_SESSION['email'],
		$_SESSION['password']);
	}
}	*/


