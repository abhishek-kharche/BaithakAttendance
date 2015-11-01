<?php
require_once('Auth.php');
$authObject = new Auth();

$uid = $_POST['user_id'];
$time = $_POST['time'];
$result = $authObject->updatePreferredTime(intval($uid), $time);
$row	=	mysql_fetch_assoc($result);
//echo $row['result'];
//echo $uid . " " . $time;
if($row['result'] == 1){
    echo "SUCCESSFULLY UPDATED PREFERRED TIME";
}else{
    echo "PLEASE TRY AGAIN";
}
?>