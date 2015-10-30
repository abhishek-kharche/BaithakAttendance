<?php
	$seconds = -10 + time();
	$value = "profile";
	setcookie(loggedin, $value, $seconds, "/");
	$_SESSION = array();
	session_destroy();
	header("location:index.php");
?>