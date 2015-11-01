<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$email = $_POST['email'];
$result = $authObject->addNewUser($email);
$row	=	mysql_fetch_assoc($result);
$response = "0";
//echo $row['result'];
if($row['result'] == 1){
    $response = "1";
}else if($result == "present"){
    $response = "present";
}
//echo $row['result'] . " " .$result;
echo $response;
?>