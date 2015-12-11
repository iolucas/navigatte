<?php


//Function to access the database with the username and password and retrieve the user id
function save_nodes_changes($changesArray)
{
	//Connect to db
	include 'db.inc.php';

	@session_start();	//start session with no warnings

	$user_id = $_SESSION['userId'];

	for($i = 0; $i < count($changesArray); $i++) {
		$changeData = $changesArray[$i];

		//If this change data wants to create a new 
		if($changeData->action == "update") {
			try {
				$changeDataId = $changeData->id;

				//Clear the action field and id field
				unset($changeData->action);
				unset($changeData->id);

				//Create query data to change
				$queryFields = '';

				foreach ($changeData as $key => $value) {
					$queryFields .= $key . ' = :' . $key . ', ';
				}

				//Clear the last comma
				$queryFields = rtrim($queryFields, ", ");

				$sql = 'UPDATE user_nodes SET ' . $queryFields .' WHERE id = :id AND owner_id = :owner_id';

				$s = $pdo->prepare($sql);
				$s->bindValue(':id', $changeDataId);
				$s->bindValue(':owner_id', $user_id);

				foreach ($changeData as $key => $value) {
					$s->bindValue(':'.$key, $value);
				}

				$s->execute();

				echo "Sucess!";

			} catch (PDOException $e) {
				echo "ERROR!";
			}
		}
	}

	exit();
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


