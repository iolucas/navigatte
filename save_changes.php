<?php

//Module to compute changes on nodes and links of the user

	//If the change var was not passed, return error no parameter
	if(!isset($_POST['changes'])) {
		echo json_encode(array('result'=>'NO_PARAMETER'));
		exit();
	}

	//Try to parse changes php object
	try {
		$changesArray = json_decode($_POST['changes']);
	} catch(Exception $e) {
		echo json_encode(array('result'=>'INVALID_PARAMETER'));
		exit();
	}

	include 'includes/access.inc.php';

	//If user no signed in
	if(!checkUserSignedIn()) {
		echo json_encode(array('result'=>'NO_USER'));
		exit();
	}	

	//print_r($changesArray);
	//exit();


	//Connect to db
	include 'includes/db.inc.php';

	@session_start();	//start session with no warnings

	$user_id = $_SESSION['userId'];

	for($i = 0; $i < count($changesArray); $i++) {
		$changes = $changesArray[$i];

		//If there is no action, proceed next iteration
		if(!isset($changes->action) || !isset($changes->element))
			continue;

		if($changes->element == "node") {
			saveNodeChanges($changes, $pdo);

		} else if($changes->element == "link") { 
			saveLinkChanges($changes, $pdo);
		}
	}

	$resultObj = array('result'=>'SUCCESS');

	echo json_encode($resultObj);

	exit();


	function saveNodeChanges($changes, $pdo) {
		//If no id is supplied, proceed next iteration
		if(!isset($changes->id))
			return;

		//If this change data wants to update an existing register...
		if($changes->action == "update") {
			try {

				//Get the node id to change
				$changesId = $changes->id;

				//Clear the action field and id field
				unset($changes->action);
				unset($changes->element);
				unset($changes->id);

				//Create query data to change
				$queryFields = '';

				foreach ($changes as $key => $value) {
					$queryFields .= $key . ' = :' . $key . ', ';
				}

				//Clear the last comma
				$queryFields = rtrim($queryFields, ", ");

				$sql = 'UPDATE user_nodes SET ' . $queryFields .' WHERE node_id = :node_id AND owner_id = :owner_id';

				$s = $pdo->prepare($sql);
				$s->bindValue(':node_id', $changesId);
				$s->bindValue(':owner_id', $_SESSION['userId']);

				foreach ($changes as $key => $value) {
					$s->bindValue(':'.$key, $value);
				}

				$s->execute();

			} catch (PDOException $e) {
				echo "ERROR: " . $e->getMessage();
				return;
			}
		} else if($changes->action == "create") { //If the change data wants to create a new register

			//Register the new node in the current user
			$sql = 'INSERT INTO user_nodes (node_id, owner_id, x, y, bgcolor, fgcolor) 
					VALUES (:node_id, :owner_id, :x, :y, :bgcolor, :fgcolor)';

			$s = $pdo->prepare($sql);
			$s->bindValue(':node_id', $changes->id);
			$s->bindValue(':owner_id', $_SESSION['userId']);
			$s->bindValue(':x', $changes->x);
			$s->bindValue(':y', $changes->y);
			$s->bindValue(':bgcolor', $changes->bgcolor);
			$s->bindValue(':fgcolor', $changes->fgcolor);
			$s->execute();	
		
		} else if($changes->action == "delete") {

			$sql = 'DELETE FROM user_nodes WHERE node_id = :node_id AND owner_id = :owner_id';

			$s = $pdo->prepare($sql);
			$s->bindValue(':node_id', $changes->id);
			$s->bindValue(':owner_id', $_SESSION['userId']);
			$s->execute();
		}
	}

	function saveLinkChanges($changes, $pdo) {

		//If either source or target id were not supplied, return
			if(!isset($changes->source_id) || !isset($changes->target_id))
				return;

			if($changes->action == "create") { //If the change data wants to create a new register
				//Register the new link in the current user
				$sql = 'INSERT INTO user_links (owner_id, source_id, target_id) 
					VALUES (:owner_id, :source_id, :target_id)';

				$s = $pdo->prepare($sql);
				$s->bindValue(':owner_id', $_SESSION['userId']);
				$s->bindValue(':source_id', $changes->source_id);
				$s->bindValue(':target_id', $changes->target_id);
				$s->execute();

			} else if($changes->action == "delete") { //If the change data wants to delete a register

				$sql = 'DELETE FROM user_links WHERE owner_id = :owner_id AND source_id = :source_id AND target_id = :target_id';

				$s = $pdo->prepare($sql);
				$s->bindValue(':owner_id', $_SESSION['userId']);
				$s->bindValue(':source_id', $changes->source_id);
				$s->bindValue(':target_id', $changes->target_id);
				$s->execute();

			}
	}


