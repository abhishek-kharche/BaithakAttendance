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
$city = $_POST['city'];
$state = $_POST['state'];
$country = $_POST['country'];
$emailId = $_POST['emailId'];
$pwd = $_POST['passWord'];
$type = $_POST['userType'];

$result = $authObject->addUser($first, $middle, $last, $city, $state, $country, $emailId, $pwd, intval($type));

# $result will contain true or false, if $emailId and $pwd is set then it will add in user_auth too else not
//$result_val = mysql_fetch_assoc($result);
$results = array();
//$userFamily =  (mysql_fetch_assoc($user_family);
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
echo json_encode($results);
//echo $result_val;

?>