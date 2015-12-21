<?php
	//Module to be used to find nodes based on their names

	//Find nodes by name
	if(isset($_GET['node_name']) && $_GET['node_name'] != "") {
		include '../includes/db.inc.php'; //Connect to the database
		
		$sql = 'SELECT user_nodes.id AS localId, nodes_master.name 
		FROM nodes_master 
		INNER JOIN user_nodes ON nodes_master.id = user_nodes.node_id
		WHERE nodes_master.name LIKE :nodeName';

		$s = $pdo->prepare($sql);
		$s->bindValue(':nodeName', $_GET['node_name'] . '%');
		$s->execute();

		$results = array();

		foreach ($s as $row) {
			//Unset all numeric indexes
			foreach ($row as $key => $value) {
				if (is_int($key))
	        		unset($row[$key]);
			}

			$results[] = $row;
		}

		echo json_encode($results);
		exit();
	}
