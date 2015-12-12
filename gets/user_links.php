<?php
	//Php page to retrieve the target user links as json object
	
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

	//Otherwise get its nodes

	$sql = 'SELECT id, source_id, target_id FROM user_links WHERE owner_id = :userId';

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

	echo json_encode(array('result'=>'SUCCESS','links'=>$links));
	exit(); 
	
