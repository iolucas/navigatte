<?php


//Function to access the database with the username and password and retrieve the user id
function save_nodes_changes($changesArray)
{
	//Connect to db
	include 'db.inc.php';

	@session_start();	//start session with no warnings

	$user_id = $_SESSION['userId'];

	$createdIds = array();

	for($i = 0; $i < count($changesArray); $i++) {
		$changeData = $changesArray[$i];

		//If there is no action, proceed next iteration
		if(!isset($changeData->action))
			continue;

		//If this change data wants to update an existing register...
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

			} catch (PDOException $e) {
				echo "ERROR!";
			}
		} else if($changeData->action == "create") { //If the change data wants to create a new register
			//If there is no name, proceed next iteration
			if(!isset($changeData->name))
				continue;

			//Check if the new entry name exists in the master_node
			$sql = 'SELECT id FROM nodes_master WHERE name = :name';
			$s = $pdo->prepare($sql);
			$s->bindValue(':name', $changeData->name);
			$s->execute();

			$rowResult = $s->fetch();

			if($rowResult) {	//If we got a result, get the nameId
				$nameId = $rowResult['id'];
			} else { //If not, create a new entry at the nodes_master
				$sql = 'INSERT INTO nodes_master (name) VALUES (:name)';
				$s = $pdo->prepare($sql);
				$s->bindValue(':name', $changeData->name);
				$s->execute();

				$sql = 'SELECT LAST_INSERT_ID()';
				$s = $pdo->prepare($sql);
				$s->execute();

				$nameId = $s->fetch()[0];
			}

			//Register the new node in the current user
			$sql = 'INSERT INTO user_nodes (node_id, owner_id, x, y, bgcolor, fgcolor) 
					VALUES (:node_id, :owner_id, :x, :y, :bgcolor, :fgcolor)';

			$s = $pdo->prepare($sql);
			$s->bindValue(':node_id', $nameId);
			$s->bindValue(':owner_id', $user_id);
			$s->bindValue(':x', $changeData->x);
			$s->bindValue(':y', $changeData->y);
			$s->bindValue(':bgcolor', $changeData->bgcolor);
			$s->bindValue(':fgcolor', $changeData->fgcolor);
			$s->execute();	

			//Get the created id and to return it to the user page
			$sql = 'SELECT LAST_INSERT_ID()';
			$s = $pdo->prepare($sql);
			$s->execute();

			$createdIds[] = array('id' => $changeData->id, 'newId' => $s->fetch()[0]);
		} else if($changeData->action == "delete") {

			//If no id is supplied, proceed next iteration
			if(!isset($changeData->id))
				continue;

			$sql = 'DELETE FROM user_nodes WHERE id = :id AND owner_id = :owner_id';

			$s = $pdo->prepare($sql);
			$s->bindValue(':id', $changeData->id);
			$s->bindValue(':owner_id', $user_id);
			$s->execute();
		}
	}

	$resultObj = array('result'=>'success', 'createdIds' => $createdIds);

	echo json_encode($resultObj);

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


