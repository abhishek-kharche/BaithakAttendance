<?php
@session_start();

require_once('Auth.php');
$authObject = new Auth();

$start_day = $_POST['start_date'];
$end_day = $_POST['end_date'];
$day = $_POST['single_date'];

if(strlen($start_day) > 0) {
    $attendance = $authObject->getMultiAttendance($start_day, $end_day);
    $results = array();
    //$userFamily =  (mysql_fetch_assoc($user_family);
    while($child	=	mysql_fetch_assoc($attendance)) {
        array_push($results, $child);
    }
    echo json_encode($results);
}else if(strlen($day) > 0){
    $result = $authObject->getSingleAttendance($day);
    $results = array();
    //$userFamily =  (mysql_fetch_assoc($user_family);
    while($child	=	mysql_fetch_assoc($attendance)) {
        array_push($results, $child);
    }
    echo json_encode($results);
}
?>