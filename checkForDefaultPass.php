<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$uid = $_SESSION['user_id'];
$result = $authObject->checkForDefaultPass(intval($uid));
$row	=	mysql_fetch_assoc($result);
$response = "0";
//echo $row['result'];
if($row['result'] == 1){
    $response = "1";
}
//echo $row['result'] . " " .$result;
echo $response;
?>