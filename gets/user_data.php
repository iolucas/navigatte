<?php
	//Php page to retrieve the target user nodes and link as json object
	
	//If the id var was no passed, return error
	if(!isset($_GET['user']) || $_GET['user'] == "") {
		echo '{"result":"INVALID_USER"}';
		exit();
	}

	//Connect to db
	include '../includes/db.inc.php';

	//Check if the user id exists and get it if so
	$sql = 'SELECT id FROM users WHERE page_name = :username';
	$s = $pdo->prepare($sql);
	$s->bindValue(':username', $_GET['user']);
	$s->execute();

	$userId = $s->fetch()[0];

	//If the user does not exists, return user not found
	if(!$userId) {
		echo '{"result":"USER_NOT_FOUND"}';
		exit();
	}

	$reqResponse = array('result'=>'SUCCESS');

	if(isset($_GET['nodes'])) {
		getNodes($pdo, $reqResponse, $userId);
	}

	if(isset($_GET['links'])) {
		getLinks($pdo, $reqResponse, $userId);
	}

	echo json_encode($reqResponse);
	exit();





	function getNodes($pdo, &$reqResponse, $userId) {

		//Write sql query
		$sql = 'SELECT user_nodes.node_id, nodes_master.name, user_nodes.x, user_nodes.y, user_nodes.bgcolor, user_nodes.fgcolor 
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

		$sql = 'SELECT source_id, target_id FROM user_links WHERE owner_id = :userId';

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
	
