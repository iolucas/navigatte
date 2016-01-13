<?php 

	//If the change var was not passed, return error no parameter
	if(!isset($_POST['nodename'])) {
		echo json_encode(array('result'=>'NO_PARAMETER'));
		exit();
	}


	include '../php/includes/access.inc.php';

	//If user no signed in
	if(!checkUserSignedIn()) {
		echo json_encode(array('result'=>'NO_USER'));
		exit();
	}

	//Connect to db
	include '../php/includes/db.inc.php';

	//Check if the entry name exists in the master_node
	$sql = 'SELECT id FROM nodes_master WHERE name = :name';
	$s = $pdo->prepare($sql);
	$s->bindValue(':name', $_POST['nodename']);
	$s->execute();

	//Get the result
	$rowResult = $s->fetch();

	if($rowResult) {	//If we got a result, get the nameId
		$nameId = $rowResult['id'];
	} else { //If not, create a new entry at the nodes_master
		$sql = 'INSERT INTO nodes_master (name) VALUES (:name)';
		$s = $pdo->prepare($sql);
		$s->bindValue(':name', $_POST['nodename']);
		$s->execute();

		$sql = 'SELECT LAST_INSERT_ID()';
		$s = $pdo->prepare($sql);
		$s->execute();

		$nameId = $s->fetch()[0];
	}

	echo json_encode(array('result'=>'SUCCESS', 'value'=>$nameId));
	exit();