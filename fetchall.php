<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();
$result = $authObject->getAll();
$results = array();
while($child	=	mysql_fetch_assoc($result)) {
    array_push($results, $child);
}
echo json_encode($results);
?>