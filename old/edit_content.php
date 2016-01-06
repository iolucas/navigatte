<!-- Controller for Node Content Data -->
<?php

	$nodeContent = new stdClass;
	$nodeContent->title = "Title";
	$nodeContent->description = "aee";
	$nodeContent->books = array("ae");
	$nodeContent->sites = array("aeee");
	$nodeContent->courses = array("aeeee");
	$nodeContent->notes = "aeeee";

	include "includes/helpers.inc.php";
	include "edit_content.html.php";



