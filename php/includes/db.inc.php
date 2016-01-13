<?php
	//Library to provide access to the database
	
	try
	{
		$pdo = new PDO('mysql:host=localhost;dbname=navi_db', 'navi_manager', 'navi_manager');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->exec('SET NAMES "utf8"');
	}
	catch (PDOException $e)
	{
		$error = 'Unable to connect to the database server.';
		//echo $error;
		include 'error.html.php';
		exit();
	}