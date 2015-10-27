<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

# check mandatory parameters in js
$first = $_POST['first_name'];
$middle = $_POST['middle_name'];
$last = $_POST['last_name'];
$rel = $_POST['relation'];
$uid = $_POST['user_id'];


$result = $authObject->addRelation($first, $middle, $last, $rel, intval($uid));

# $result will contain true or false
//$result_val = mysql_fetch_assoc($result);
//echo $result_val;

$results = array();
//$userFamily =  (mysql_fetch_assoc($user_family);
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
echo json_encode($results);

?>