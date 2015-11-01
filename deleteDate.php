<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();
//echo "Hello";

$newDate = $_POST['deleteDate'];
$response = "0";
//echo $response;
//echo "Hello";
//echo $newDate;
$checkDate = $authObject->checkDateInDates($newDate);
$checkResult = mysql_fetch_assoc($checkDate);
if($checkResult['result'] == 1){
    if(date('w', strtotime($newDate)) == 0){
        echo "This Baithak is already deleted, ideally this message should never appear";
    }else{
        $deleteEntry = $authObject->deleteDateEntry($newDate);
        $deleteResult = mysql_fetch_assoc($deleteEntry);
        if($deleteResult['result'] == 0){
            echo "Baithak is deleted for this date";
        }else{
            echo "Please try again";
        }
    }
}else{
    if(date('w', strtotime($newDate)) == 0){
        $insertEntry = $authObject->insertDateEntry($newDate, 0);
        $insertResult = mysql_fetch_assoc($insertEntry);
        if($insertResult['result'] == 1){
            echo "Baithak is deleted for this date (Sunday)";
        }else{
            echo "Please try again";
        }
    }else{
        echo "This is not a Sunday so no need to delete, ideally this message should never appear";
    }
}
?>