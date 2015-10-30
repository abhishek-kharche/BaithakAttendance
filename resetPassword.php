<?php
@session_start();
if(!isset($_SESSION["user_id"]) || !isset($_SESSION["token"])) {
    //echo $_SESSION[0];
    //$output = "";
    //foreach ($_SESSION as $key=>$val)
        //$output = $output + $key." ".$val."<br/>";
    //echo "uid = " . $_SESSION["user_id"] . " token = " . $_SESSION["token"] . " email = " . $_SESSION["email"];
    header("location:forgotpassword.php");
}
$response = "1";
require_once('forgotAuth.php');
$authObject = new forgotAuth();

$uid = $_SESSION["user_id"];
$password = $_POST["newPassword"];

$resetPwd = $authObject->resetPassword(intval($uid), $password);
//$result = mysql_fetch_assoc($resetPwd);
$rows = mysql_fetch_assoc($resetPwd);
//echo $rows['result'];

if($rows['result'] == 1){
    //header("location:resetPassword.php");
    $response = "0";
    $_SESSION = array();
    session_destroy();
    //$response = "uid = " . $_SESSION["user_id"] . " token = " . $_SESSION["token"] . " email = " . $_SESSION["email"];
}
echo $response;
?>