<?php

	

	if(!isset($_POST['saveString']) || !isset($_POST['nodeId'])) {
		echo 'NOT_ENOUGH_ARGS';
		print_r($_REQUEST);
		exit();
	}

	//Connect to db
	include 'includes/db.inc.php';

	$sql = 'UPDATE user_nodes SET content=:content WHERE node_id = :node_id AND owner_id = :owner_id';

	@session_start();

	$s = $pdo->prepare($sql);
	$s->bindValue(':content', $_POST['saveString']);
	$s->bindValue(':node_id', $_POST['nodeId']);
	$s->bindValue(':owner_id', $_SESSION['userId']);
	$s->execute();

	echo "SUCCESS";
	exit();


