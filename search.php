<?php

	//Module to get nodes names available for creation

	if(isset($_GET['nodename'])) {
		//If the node name is empty, return no data
		if($_GET['nodename'] == "")
			failAndExit();

		//Connect to db
		include 'includes/db.inc.php';

		$sql = 'SELECT id, name FROM nodes_master WHERE name LIKE :nodename';

		$s = $pdo->prepare($sql);
		$s->bindValue(':nodename', $_GET['nodename'] . '%');
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

	print_r($_GET);





function failAndExit() {
	echo '[]';
	exit();
}



