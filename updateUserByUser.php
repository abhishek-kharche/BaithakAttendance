<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$uid = $_POST['user_id'];
$first = $_POST['first_name'];
$middle = $_POST['middle_name'];
$last = $_POST['last_name'];
$city = $_POST['city'];
$state = $_POST['state'];
$country = $_POST['country'];

# confirm in js whether first and last name are non empty
//echo ($_POST);

$result = $authObject->updateUserByUser(intval($uid), $first, $middle, $last, $city, $state, $country);
$results = array();
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
echo json_encode($results);

?>