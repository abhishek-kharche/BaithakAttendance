<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$uid = $_SESSION["user_id"];
$first = $_POST['first_name'];
$middle = $_POST['middle_name'];
$last = $_POST['last_name'];
$city = $_POST['city'];
$state = $_POST['state'];
$country = $_POST['country'];
$result = $authObject->registerUser(intval($uid), $first, $middle, $last, $city, $state, $country);

$results = array();
//$userFamily =  (mysql_fetch_assoc($user_family);
$userDetails = array();
while($row	=	mysql_fetch_assoc($result)) {
    $userDetails = $row;
    array_push($results, $row);
}
$userDetailsJson = json_encode($results);
//$userDetails = $userDetailsJson[0];
$_SESSION["first_name"] = $userDetails['first_name'];
$_SESSION["last_name"] = $userDetails['last_name'];
$_SESSION["city"] = $userDetails['city'];
$_SESSION["state"] = $userDetails['state'];
$_SESSION["country"] = $userDetails['country'];
$_SESSION["user_type"] = 0;

echo $userDetailsJson;
?>