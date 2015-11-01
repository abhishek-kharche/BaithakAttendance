<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$daysString = $_POST["days"];
$days = explode(",", $daysString);
//$first = $days[2];
$year = date("Y");
$month = date("m");
$invalidDaysResult = $authObject->getInvalidSundays($year, $month);
$invalidDays = array();
//$userFamily =  (mysql_fetch_assoc($user_family);
while($row	=	mysql_fetch_assoc($invalidDaysResult)) {
    array_push($invalidDays, $row);
}

$returnDays = array();
$statuszero = array();
if(count($invalidDays>0)) {
    $flag = "";
    for ($i = 0; $i < count($days); $i++) {
        //print $days[$i];
        $flag = "0";
        for($k = 0; $k < count($invalidDays); $k++) {
            $invalidRow = $invalidDays[$k];
            //array_push($statuszero, $days[$i] . " " .$invalidRow["date"]);
            if ($days[$i] === $invalidRow["date"]) {
                $flag = "1";
                //array_push($statuszero, $invalidRow["date"]);
                break;
            }
        }
        if ($flag == "0") {
            array_push($returnDays, $days[$i]);
        }
    }
}

$additionalDaysResult = $authObject->getAdditionalDays($year, $month);
$moreDays = array();
//$userFamily =  (mysql_fetch_assoc($user_family);
while($row1	=	mysql_fetch_assoc($additionalDaysResult)) {
    array_push($moreDays, $row1);
}
$resultrow = array();
if(count($moreDays) > 0){
    for($x = 0; $x < count($moreDays); $x++) {
        $resultrow = $moreDays[$x];
        array_push($returnDays, $resultrow["date"]);
    }
}

echo json_encode($returnDays);
?>