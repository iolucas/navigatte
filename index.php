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
			include 'main_page.html.php';
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
			include 'main_page.html.php';
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


function recurseGetNodes($id, &$generalResult, $pdo) {

	//Write query
	$sql = 'SELECT source FROM node_links WHERE target = "' . $id . '"';
	$result = $pdo->query($sql);	//Execute query

	foreach ($result as $row) {
		//Unset all numeric or undesired indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$generalResult[] = $row;

		recurseGetNodes($row['source'], $generalResult, $pdo);
	}
}


//Node path request
if (isset($_GET['node_path'])) {

	if (isset($_GET['node_id'])) {
		include 'includes/db.inc.php'; //Connect to the database

		$nodesInvolved = array(array('source'=>$_GET['node_id']));

		//Populate the nodes involved array
		recurseGetNodes($_GET['node_id'], $nodesInvolved, $pdo);

		//Get the nodes references
		$nodes = array();

		//Write the query
		$sql = 'SELECT id,name FROM nodes WHERE';

		foreach($nodesInvolved as $node) {
			$sql .= ' id = "' . $node['source'] . '" OR';
		}

		$sql .= ' 0;';

		//echo $sql;
		//exit();

		$result = $pdo->query($sql);	//Execute query


		foreach ($result as $row) {
			//Unset all numeric or undesired indexes
			foreach ($row as $key => $value) {
				if (is_int($key))
	        		unset($row[$key]);
			}

			$nodes[] = $row;
		}


		//Get links
		//Write the query
		$sql = 'SELECT target,source FROM node_links WHERE';

		foreach($nodes as $node) {
			$sql .= ' target = "' . $node['id'] . '" OR';
		}

		$sql .= ' 0;';

		$result = $pdo->query($sql);	//Execute query

		$links = array();

		foreach ($result as $row) {
			//Unset all numeric or undesired indexes
			foreach ($row as $key => $value) {
				if (is_int($key))
	        		unset($row[$key]);
			}

			$links[] = $row;
		}

		$finalObj = array('nodes'=> $nodes, 'links'=>$links, 'final_id'=>$_GET['node_id']);

		echo json_encode($finalObj);
		exit();


		//Write query
		/*$sql = 'SELECT id,name FROM nodes WHERE id = "' . $_GET['node_id'] . '"';
		$result = $pdo->query($sql);	//Execute query

		$resultArr = array();

		foreach ($result as $row) {
			//Unset all numeric or undesired indexes
			foreach ($row as $key => $value) {
				if (is_int($key))
	        		unset($row[$key]);
			}

			$resultArr[] = $row;
		}

		print_r($resultArr);
		exit();*/
	} 
}

//Search request
if (isset($_GET['search_query']) && $_GET['search_query']) {

	include 'includes/db.inc.php'; //Connect to the database		

	//Write query
	$sql = 'SELECT id,name FROM nodes WHERE name = "' . $_GET['search_query'] . '"';
	$result = $pdo->query($sql);	//Execute query

	$resultArray = array();

	foreach ($result as $row) {
		
		//Unset all numeric or undesired indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$resultArray[] = $row;
	}

	//Return the results
	echo json_encode($resultArray);

	exit();
}

//User profile request
if (isset($_GET['user']) && $_GET['user']) {

	include 'includes/db.inc.php'; //Connect to the database

	//Get User Data

	//Write query
	$sql = 'SELECT * FROM users WHERE user_name = "' . $_GET['user'] . '"';

	$result = $pdo->query($sql);	//Execute query

	$row = $result->fetch();	//Get the first result

	//If there is no result, return user no found
	if(!$row) {
		htmlout("USER NOT FOUND");
		exit();
	}

	//Get user variables
	$userid = $row['id'];
	$username = $row['user_name'];
	$fullname = $row['full_name'];
	$userdesc = $row['description'];
	$userpic = $row['profile_pic_file'];

	//Get nodes of the current user

	//Write query
	$sql = 'SELECT * FROM nodes WHERE owner_id = ' . $userid ;
	$result = $pdo->query($sql);	//Execute query

	//Create array to store nodes
	$nodesArr = array();

	//Iterate thru the fetched rows and get the properties values
	foreach($result as $row) {
		
		//Unset the owner_id
		unset($row["owner_id"]);

		//Unset all numeric indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$nodesArr[] = $row;
	}

	//Parse json object from php object
	$nodesJson = json_encode($nodesArr);


	//Get node links of the current user

	//Write query
	$sql = 'SELECT * FROM node_links WHERE owner_id = ' . $userid ;
	$result = $pdo->query($sql);	//Execute query

		//Create array to store nodes
	$linksArr = array();

	//Iterate thru the fetched rows and get the properties values
	foreach($result as $row) {
		
		//Unset the owner_id
		unset($row["owner_id"]);

		//Unset all numeric indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$linksArr[] = $row;
	}

	//Parse json object from php object
	$linksJson = json_encode($linksArr);


	//Disconnect DB
	$pdo = null;

	include 'profile_page.html.php';

	exit();
}



//If no get or post request were made...

//Check if the user is signed in
if(!checkUserSignedIn()) {
	//If not, return the welcome page and exit
	include 'main_page.html.php';
	exit();
}

//If so, get user info and return the user page
getUserInfo($_SESSION['userId']);

include 'user_page.html.php';

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
			$GLOBALS['userInfo']['nodes_json'] = json_encode(getUserNodes($pdo, $userId));
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

function getUserNodes($pdo, $userId) {

	$sql = 'SELECT user_nodes.id, nodes_master.name, user_nodes.x, user_nodes.y, user_nodes.bgcolor, user_nodes.fgcolor FROM user_nodes INNER JOIN nodes_master ON user_nodes.node_id = nodes_master.id WHERE user_nodes.owner_id = :userId';

	$s = $pdo->prepare($sql);
	$s->bindValue(':userId', $userId);
	$s->execute();

	$nodes = array();

	foreach ($s as $row) {
		//Unset all numeric indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$nodes[] = $row;
	}

	return $nodes;
}












include '/includes/magicquotes.inc.php';



if (!userIsLoggedIn())
{
	include '../login.html.php';
	exit();
}

if (!userHasRole('Account Administrator'))
{
	$error = 'Only Account Administrators may access this page.';
	include '../accessdenied.html.php';
	exit();
}

if (isset($_GET['add']))
{
	$pageTitle = 'New Author';
	$action = 'addform';
	$name = '';
	$email = '';
	$id = '';
	$button = 'Add author';
	include 'form.html.php';
	exit();
}

// Display author list
include $_SERVER['DOCUMENT_ROOT'] . '/projects/LearnSQL/includes/db.inc.php';

if (isset($_GET['editform']))
{

	try
	{
		$sql = 'UPDATE author SET
		name = :name,
		email = :email
		WHERE id = :id';
		$s = $pdo->prepare($sql);
		$s->bindValue(':id', $_POST['id']);
		$s->bindValue(':name', $_POST['name']);
		$s->bindValue(':email', $_POST['email']);
		$s->execute();
	}
	catch (PDOException $e)
	{
		$error = 'Error updating submitted author.';
		include 'error.html.php';
		exit();
	}
	header('Location: .');
	exit();
}



if (isset($_POST['action']) and $_POST['action'] == 'Edit')
{

	try
	{
		$sql = 'SELECT id, name, email FROM author WHERE id = :id';
		$s = $pdo->prepare($sql);
		$s->bindValue(':id', $_POST['id']);
		$s->execute();
	}

	catch (PDOException $e)
	{
		$error = 'Error fetching author details.';
		include 'error.html.php';
		exit();
	}

	$row = $s->fetch();
	$pageTitle = 'Edit Author';
	$action = 'editform';
	$name = $row['name'];
	$email = $row['email'];
	$id = $row['id'];
	$button = 'Update author';
	include 'form.html.php';
	exit();
}

if (isset($_GET['addform']))
{
	try
	{
		$sql = 'INSERT INTO author SET name = :name, email = :email';
		$s = $pdo->prepare($sql);
		$s->bindValue(':name', $_POST['name']);
		$s->bindValue(':email', $_POST['email']);
		$s->execute();
	}
	catch (PDOException $e)
	{
		$error = 'Error adding submitted author.';
		include 'error.html.php';
		exit();
	}
	header('Location: .');
	exit();
}

if (isset($_POST['action']) and $_POST['action'] == 'Delete')
{

	// Get jokes belonging to author
	try
	{
		$sql = 'SELECT id FROM joke WHERE authorid = :id';
		$s = $pdo->prepare($sql);
		$s->bindValue(':id', $_POST['id']);
		$s->execute();
	}

	catch (PDOException $e)
	{
		$error = 'Error getting list of jokes to delete.';
		include 'error.html.php';
		exit();
	}

	$result = $s->fetchAll();
	// Delete joke category entries
	try
	{
		$sql = 'DELETE FROM jokecategory WHERE jokeid = :id';
		$s = $pdo->prepare($sql);
		// For each joke
		foreach ($result as $row)
		{
			$jokeId = $row['id'];
			$s->bindValue(':id', $jokeId);
			$s->execute();
		}
	}
	catch (PDOException $e)
	{
		$error = 'Error deleting category entries for joke.';
		include 'error.html.php';
		exit();
	}
	// Delete jokes belonging to author
	try
	{
		$sql = 'DELETE FROM joke WHERE authorid = :id';
		$s = $pdo->prepare($sql);
		$s->bindValue(':id', $_POST['id']);
		$s->execute();
	}
	catch (PDOException $e)
	{
		$error = 'Error deleting jokes for author.';
		include 'error.html.php';
		exit();

	}
	

	// Delete the author
	try
	{
		$sql = 'DELETE FROM author WHERE id = :id';
		$s = $pdo->prepare($sql);
		$s->bindValue(':id', $_POST['id']);
		$s->execute();
	}
	catch (PDOException $e)
	{
		$error = 'Error deleting author.';
		include 'error.html.php';
		exit();
	}
	
	header('Location: .');
	exit();
}



try
{
	$result = $pdo->query('SELECT id, name FROM author');
}

catch (PDOException $e)
{
	$error = 'Error fetching authors from the database!';
	include 'error.html.php';
	exit();
}

foreach ($result as $row)
{
	$authors[] = array('id' => $row['id'], 'name' => $row['name']);
}

include 'authors.html.php';