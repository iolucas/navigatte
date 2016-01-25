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

	$sql = 'SELECT page_name, screen_name, screen_description, profile_pic FROM users WHERE ';

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

	echo json_encode($userInfo);