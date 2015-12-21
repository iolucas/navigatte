<?php 
	//Module to retrieve node path (nodes and links) as json object

	if(!isset($_GET['id']))
		exit();

		include '../includes/db.inc.php'; //Connect to the database

		//Get node master id and owner id
		$sql = 'SELECT owner_id, node_id
		FROM user_nodes 
		WHERE id = :id';

		$s = $pdo->prepare($sql);

		$s->bindValue(':id',$_GET['id']);
		$s->execute();

		$row = $s->fetch();

		if(!$row) {
			echo '[]';
			exit();
		}

		$nodesInvolved = array();

		$nodes = array();
		$links = array();

		populateNodesAndLinks($nodes, $links, $row['node_id'], $row['owner_id'], $pdo);

		echo json_encode(array('nodes'=>$nodes, 'links'=>$links));
		exit();

	function populateNodesAndLinks(&$nodes, &$links, $nodeId, $ownerId, $pdo) {
		//Get node
		$sql = 'SELECT user_nodes.id AS localId, nodes_master.id AS globalId, nodes_master.name AS name
		FROM nodes_master INNER JOIN user_nodes ON user_nodes.node_id = nodes_master.id 
		WHERE nodes_master.id = :nodeId';

		$s = $pdo->prepare($sql);
		$s->bindValue(':nodeId', $nodeId);
		$s->execute();

		$row = $s->fetch();

		//Unset all numeric or undesired indexes
		foreach ($row as $key => $value) {
			if (is_int($key))
        		unset($row[$key]);
		}

		$nodes[] = $row;


		//Get links for this node

		//Write query
		$sql = 'SELECT source_id AS sourceId, target_id AS targetId 
		FROM user_links 
		WHERE target_id = :target_id AND owner_id = :owner_id';

		$s = $pdo->prepare($sql);
		$s->bindValue(':target_id', $nodeId);
		$s->bindValue(':owner_id', $ownerId);
		$s->execute();

		foreach ($s as $row) {
			//Unset all numeric or undesired indexes
			foreach ($row as $key => $value) {
				if (is_int($key))
	        		unset($row[$key]);
			}

			$links[] = $row;

			//Recurse this function, now for the source node of this link to trace all the trail to this node
			populateNodesAndLinks($nodes, $links, $row['sourceId'], $ownerId, $pdo);
		}
	}