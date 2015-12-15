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

	//Connect to db
	include 'includes/db.inc.php';

	@session_start();	//start session with no warnings

	$user_id = $_SESSION['userId'];

	$createdIds = array();

	for($i = 0; $i < count($changesArray); $i++) {
		$changeData = $changesArray[$i];

		//If there is no action, proceed next iteration
		if(!isset($changeData->action))
			continue;

		//If this change data wants to update an existing register...
		if($changeData->action == "update") {
			try {
				$changeDataId = $changeData->node_id;

				//Clear the action field and id field
				unset($changeData->action);
				unset($changeData->node_id);

				//Create query data to change
				$queryFields = '';

				foreach ($changeData as $key => $value) {
					$queryFields .= $key . ' = :' . $key . ', ';
				}

				//Clear the last comma
				$queryFields = rtrim($queryFields, ", ");

				$sql = 'UPDATE user_nodes SET ' . $queryFields .' WHERE node_id = :node_id AND owner_id = :owner_id';

				$s = $pdo->prepare($sql);
				$s->bindValue(':node_id', $changeDataId);
				$s->bindValue(':owner_id', $user_id);

				foreach ($changeData as $key => $value) {
					$s->bindValue(':'.$key, $value);
				}

				$s->execute();

			} catch (PDOException $e) {
				echo "ERROR!";
			}
		} else if($changeData->action == "create") { //If the change data wants to create a new register
			//If there is no name, proceed next iteration
			if(!isset($changeData->name))
				continue;

			//Check if the new entry name exists in the master_node
			$sql = 'SELECT id FROM nodes_master WHERE name = :name';
			$s = $pdo->prepare($sql);
			$s->bindValue(':name', $changeData->name);
			$s->execute();

			$rowResult = $s->fetch();

			if($rowResult) {	//If we got a result, get the nameId
				$nameId = $rowResult['id'];
			} else { //If not, create a new entry at the nodes_master
				$sql = 'INSERT INTO nodes_master (name) VALUES (:name)';
				$s = $pdo->prepare($sql);
				$s->bindValue(':name', $changeData->name);
				$s->execute();

				$sql = 'SELECT LAST_INSERT_ID()';
				$s = $pdo->prepare($sql);
				$s->execute();

				$nameId = $s->fetch()[0];
			}

			//Register the new node in the current user
			$sql = 'INSERT INTO user_nodes (node_id, owner_id, x, y, bgcolor, fgcolor) 
					VALUES (:node_id, :owner_id, :x, :y, :bgcolor, :fgcolor)';

			$s = $pdo->prepare($sql);
			$s->bindValue(':node_id', $nameId);
			$s->bindValue(':owner_id', $user_id);
			$s->bindValue(':x', $changeData->x);
			$s->bindValue(':y', $changeData->y);
			$s->bindValue(':bgcolor', $changeData->bgcolor);
			$s->bindValue(':fgcolor', $changeData->fgcolor);
			$s->execute();	

			$createdIds[] = array('node_id' => $changeData->node_id, 'newId' => $nameId);
		
		} else if($changeData->action == "delete") {

			//If no id is supplied, proceed next iteration
			if(!isset($changeData->node_id))
				continue;

			$sql = 'DELETE FROM user_nodes WHERE node_id = :node_id AND owner_id = :owner_id';

			$s = $pdo->prepare($sql);
			$s->bindValue(':node_id', $changeData->node_id);
			$s->bindValue(':owner_id', $user_id);
			$s->execute();
		}
	}

	$resultObj = array('result'=>'success', 'createdIds' => $createdIds);

	echo json_encode($resultObj);

	exit();


