<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$childId = $_POST['childId'];
//$children = explode(",", $childrenId);
$month = date('Y-m');
//foreach ($children as $child){
$result = $authObject->getChildAttendance(intval($childId), $month);
$results = array();
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
//}
echo json_encode($results);
?>