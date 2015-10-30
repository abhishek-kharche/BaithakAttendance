<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$uid = $_POST['user_id'];

# confirm in js whether first and last name are non empty
//echo ($_POST);

$result = $authObject->findRelationByUser($uid);
$results = array();
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
echo json_encode($results);

?>