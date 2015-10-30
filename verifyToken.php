<?php
@session_start();
if(!isset($_POST['token'])) {
    header("location:forgotpassword.php");
}

require_once('forgotAuth.php');
$authObject = new forgotAuth();
//echo "Hello";

$token = $_POST['token'];
$response = "1";
//echo $response;
//echo "Hello";
$checkEmail = $authObject->verifyToken($token);
$rows = mysql_fetch_assoc($checkEmail);
//echo $rows['result'];

if($rows['result'] == 1){
    //header("location:resetPassword.php");
    $response = "0";
    //$response = "uid = " . $_SESSION["user_id"] . " token = " . $_SESSION["token"] . " email = " . $_SESSION["email"];
}

echo $response;
?>