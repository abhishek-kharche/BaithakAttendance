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
$result = $authObject->checkUserPass(intval($uid), $password);
$row	=	mysql_fetch_assoc($result);
$response = "0";
//echo $row['result'];
if($row['result'] == 1){
    $response = "1";
}
echo $response;
//echo $uid;
?>