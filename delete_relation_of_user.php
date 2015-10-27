<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$uid = $_POST['user_id'];
$result = $authObject->deleteRelationOfUser(intval($uid));
echo json_encode($result);
?>