<?php

	if(!isset($_POST['saveString']) || !isset($_POST['localId'])) {
		echo 'NOT_ENOUGH_ARGS';
		print_r($_REQUEST);
		exit();
	}

	//Check if the json is invalid
	if(!isJson($_POST['saveString'])) {
		echo 'INVALID_SAVE_DATA: ' + print_r($_REQUEST);
		exit();
	}

	//Connect to db
	include '../php/includes/db.inc.php';

	$sql = 'UPDATE user_nodes SET content=:content WHERE id = :localId AND owner_id = :owner_id';

	@session_start();

	$s = $pdo->prepare($sql);
	$s->bindValue(':content', $_POST['saveString']);
	$s->bindValue(':localId', $_POST['localId']);
	$s->bindValue(':owner_id', $_SESSION['userId']);
	$s->execute();

	echo "SUCCESS";
	exit();

	//Function to check valid json
	function isJson($string) {
		json_decode($string);
		return (json_last_error() == JSON_ERROR_NONE);
	}