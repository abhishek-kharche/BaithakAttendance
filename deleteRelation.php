<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$suid = $_POST['user_id'];
$result = $authObject->deleteRelation(intval($suid));

$results = array();
//$userFamily =  (mysql_fetch_assoc($user_family);
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
echo json_encode($results);
?>