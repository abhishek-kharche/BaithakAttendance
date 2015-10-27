<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

# send all values from js
$first = $_POST['first_name'];
$middle = $_POST['middle_name'];
$last = $_POST['last_name'];
$uid = $_POST['user_id'];
$isRel = $_POST['isRel'];
if($isRel == "0") {
    $city = $_POST['city'];
    $state = $_POST['state'];
    $country = $_POST['country'];
    $emailId = $_POST['emailId'];
    $pwd = $_POST['passWord'];
    $type = $_POST['userType'];
    $result = $authObject->updateUser($first, $middle, $last, $city, $state, $country, $emailId, $pwd, intval($type), intval($uid));

    # $result will contain true or false, if emailid and pwd is set then this will update user_auth too
    $results = array();
    while($row	=	mysql_fetch_assoc($result)) {
        array_push($results, $row);
    }
    echo json_encode($results);
    //echo $result_val;
}else{
    $rel = $_POST['relation'];
    $result = $authObject->updateRelation($first, $middle, $last, $rel, intval($uid));

    # $result will contain true or false
    $results = array();
    while($row	=	mysql_fetch_assoc($result)) {
        array_push($results, $row);
    }
    echo json_encode($results);
    //echo $result_val;
}
?>