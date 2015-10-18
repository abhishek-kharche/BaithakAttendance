<?php
	$seconds = -10 + time();
	$value = "profile";
	setcookie(loggedin, $value, $seconds, "/");
	session_destroy();
	header("location:index.html");
?>