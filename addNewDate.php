<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();
//echo "Hello";

$newDate = $_POST['newDate'];
$response = "0";
//echo $response;
//echo "Hello";

$checkDate = $authObject->checkDateInDates($newDate);
$checkResult = mysql_fetch_assoc($checkDate);
if($checkResult['result'] == 1){
    if(date('w', strtotime($newDate)) == 0){
        $deleteEntry = $authObject->deleteDateEntry($newDate);
        $deleteResult = mysql_fetch_assoc($deleteEntry);
        if($deleteResult['result'] == 0){
            echo "Baithak is added again for this date (Sunday)";
        }else{
            echo "Please try again";
        }
    }else{
        echo "Baithak is already set for this date";
    }
}else{
    if(date('w', strtotime($newDate)) == 0){
        echo "Baithak is already set as this is a Sunday";
    }else{
        $insertEntry = $authObject->insertDateEntry($newDate, 1);
        $insertResult = mysql_fetch_assoc($insertEntry);
        if($insertResult['result'] == 1){
            echo "Baithak is added for this date";
        }else{
            echo "Please try again";
        }
    }
}
?>