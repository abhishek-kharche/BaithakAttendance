<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$suid = $_POST['user_id'];
$first = $_POST['first_name'];
$middle = $_POST['middle_name'];
$last = $_POST['last_name'];
$relation = $_POST['relation'];

# confirm in js whether first and last name are non empty
//echo ($_POST);

$result = $authObject->updateRelationByUser(intval($suid), $first, $middle, $last, $relation);
$results = array();
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
echo json_encode($results);

?>