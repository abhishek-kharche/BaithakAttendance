<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();
//echo "Hello";

// example
//$lastSunday =  date('Y-m-d',strtotime('last Sunday', strtotime('2015-10-30')));
//echo "Try 3 ".$lastSunday;

//echo $response;
//echo "Hello";

$done = "0";
$today = date('Y-m-d');
//echo $today;
$lastSunday = $today;

//$thisDay = $lastSunday;
//$lastSunday =  date('Y-m-d',strtotime('last Sunday', strtotime($thisDay)));
//$lastSunday =  date('Y-m-d',strtotime('last Sunday', '2015-10-30'));
//echo "This day is " . $thisDay . " " . $lastSunday;
$sundays = array();
$count = 0;
$place = "";
$newdate = "";
$q = "";
$rslt = "";
while($done == "0") {
    $thisDay = $lastSunday;
    $lastSunday =  date('Y-m-d',strtotime('last Sunday', strtotime($thisDay)));
    //array_push($sundays, $lastSunday);

    $validDateResult = $authObject->checkDateInDates($lastSunday);
    $row = mysql_fetch_assoc($validDateResult);
    //$q = $validDateResult;
    //$resultCount = $validResult['result'];
    //$rslt = (string)$resultCount;
    if ($row['result'] == 0) {
        $done = "1";
    }
    $foundDate = "";
    if($done == "1"){
        $place = "newValid";
        $validNewDate = $authObject->checkNewValidDate($lastSunday);
        // if found entry then make done 0 and assign this to last sunday
        $result = mysql_fetch_assoc($validNewDate);
        //$q = $validNewDate;
        $foundDate = $result['date'];
        //$newdate = $foundDate;
        if(isset($foundDate)){
            $lastSunday = $foundDate;
        }
        break;
    }
    //break;
    $count = $count + 1;
}
//echo "sundays " . implode("/",$sundays);
//echo "Try 12 ". "place is " .$place. " results is " .$rslt. "done is". $done; // ." query is ". $q;
//echo "try 6 " . $lastSunday . " place " .$place . " new_date " . $newdate; // . " query " .$q;
echo $lastSunday;
?>