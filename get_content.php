<?php

	//	Controller for Node Content Data   //

	//if(!isset($_GET['user']) || !isset($_GET['id'])) {
	if(!isset($_GET['local_id'])) {
		echo 'NO_ENOUGH_ARGS';
		exit();
	}

	//Connect to db
	include 'includes/db.inc.php';
	include "includes/helpers.inc.php";

	//Write sql query
	/*$sql = 'SELECT user_nodes.content, user_nodes.owner_id, nodes_master.description 
		FROM user_nodes 
		INNER JOIN users ON user_nodes.owner_id = users.id 
		INNER JOIN nodes_master ON nodes_master.id = user_nodes.node_id
		WHERE users.page_name = :username AND user_nodes.node_id = :nodeId';

	$s = $pdo->prepare($sql);
	$s->bindValue(':username', $_GET['user']);
	$s->bindValue(':nodeId', $_GET['id']);
	$s->execute();*/

	//Write sql query
	$sql = 'SELECT user_nodes.content, user_nodes.owner_id, nodes_master.description 
		FROM user_nodes 
		INNER JOIN nodes_master ON nodes_master.id = user_nodes.node_id
		WHERE user_nodes.id = :localId';

	$s = $pdo->prepare($sql);
	$s->bindValue(':localId', $_GET['local_id']);
	$s->execute();


	$row = $s->fetch();

	//If the node content is empty, set an empty json
	$nodeContent = ($row['content']) ? $row['content'] : '{}';

	$nodeObj = json_decode($nodeContent);

	//Set the owner's flag if so
	@session_start();

	//Set the owner flag
	$nodeObj->owner = (isset($_SESSION['userId']) && $_SESSION['userId'] == $row['owner_id']) ? true : false;

	//Set the description
	$nodeObj->description = $row['description'] ? $row['description'] : "";

	echo json_encode($nodeObj);

	exit();

	//keep writing query to get the node content and to submit changes
	//in case node dont have content (return null), must create an standard obj to be submitted

	/*print_r($nodeContent);
	exit();

	$nodeContent = new stdClass;
	$nodeContent->title = "Title";
	$nodeContent->description = "aee";
	$nodeContent->books = array("ae");
	$nodeContent->sites = array("aeee");
	$nodeContent->courses = array("aeeee");
	$nodeContent->notes = "aeeee";

	$contentOwner = true;

	$editing = isset($_GET['edit']) ? true : false;



	
	include "show_content.html.php";*/



