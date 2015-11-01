<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();
$uid = $_POST['user_id'];
if(!isset($uid)){
    $uid = $_SESSION["user_id"];
}
$password = $_POST['password'];
$result = $authObject->updateUserPass(intval($uid), $password);
$response = "0";
if($result = "1"){
    $response = "1";
}
echo $response;
?>