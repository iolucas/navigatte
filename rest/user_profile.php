<?php

	if(!isset($_GET['user'])) {
		echo 'NO_USER';
		exit();
	}

	include '../php/includes/magicquotes.inc.php'; //Disable magic quotes that are used to avoid php injection

	//Functions used to avoid php,sql injection attacks, such htmlout to be used in place of echo
	include '../php/includes/helpers.inc.php';	

	//Connect to database
	include '../php/includes/db.inc.php';	

	//Get user profile infos
	$sql = 'SELECT id, page_name, screen_name, screen_description, profile_pic FROM users WHERE ';

	$s = $pdo->prepare($sql . 'page_name = :userName');
	$s->bindValue(':userName', $_GET['user']);
	$s->execute();
	$userInfo = $s->fetch();

	//If user info was not defined
	if(!$userInfo) {
		echo 'USER_NOT_FOUND';
		exit();		
	}

	//Clear integer indexes
	unsetIntIndex($userInfo);


	getNodes($pdo, $userInfo, $userInfo['id']);
	getLinks($pdo, $userInfo, $userInfo['id']);


	echo json_encode($userInfo);



function getNodes($pdo, &$reqResponse, $userId) {

	//Write sql query
	$sql = 'SELECT user_nodes.node_id AS globalId, user_nodes.id AS localId, nodes_master.name, user_nodes.x, user_nodes.y, user_nodes.bgcolor, user_nodes.fgcolor 
			FROM user_nodes INNER JOIN nodes_master ON user_nodes.node_id = nodes_master.id WHERE user_nodes.owner_id = :userId';

	$s = $pdo->prepare($sql);
	$s->bindValue(':userId', $userId);
	$s->execute();

	$nodes = array();

	//Iterate thru the results and return them
	foreach ($s as $row) {
		//Unset all numeric indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$nodes[] = $row;
	}

	$reqResponse['nodes'] = $nodes;
	return;
}

function getLinks($pdo, &$reqResponse, $userId) {

	//Write sql query

	$sql = 'SELECT source_id AS sourceId, target_id AS targetId FROM user_links WHERE owner_id = :userId';

	$s = $pdo->prepare($sql);
	$s->bindValue(':userId', $userId);
	$s->execute();

	$links = array();

	//Iterate thru the results and return them
	foreach ($s as $row) {
		//Unset all numeric indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$links[] = $row;
	}

	$reqResponse['links'] = $links;
}