<!-- Controller for Node Content Data -->
<?php

	$nodeContent = new stdClass;
	$nodeContent->title = "Title";
	$nodeContent->description = "aee";
	$nodeContent->books = array("ae");
	$nodeContent->sites = array("aeee");
	$nodeContent->courses = array("aeeee");
	$nodeContent->notes = "aeeee";

	$contentOwner = true;

	$editing = isset($_GET['edit']) ? true : false;



	include "includes/helpers.inc.php";
	include "show_content.html.php";



