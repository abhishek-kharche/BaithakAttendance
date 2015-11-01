<?php
@session_start();
// Redirect user back to index page if post body is empty
    if(!isset($_POST['media']))
        header("location:index.php");
//print_r($_POST);

    require_once('Auth.php');
    $authObject = new Auth();

    $date = $_POST['date'];
    $dates = explode(",",$date);
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $media = $_POST['media'];

    $child_count = 0;
    $dependent = array();
    while(true){
        $child_id = 'child_'.$child_count;
        if(isset($_POST[$child_id]))
            array_push($dependent, $_POST[$child_id]);
        else
            break;
        $child_count = $child_count + 1;
    }
    array_push($dependent, $_SESSION["user_id"]);
//print_r($dependent);

    $response = "0";
    foreach($dates as $dt) {
        foreach ($dependent as $id) {
            $result = $authObject->checkIfDatePresent($id, $dt);
            $rows = mysql_fetch_assoc($result);
            $start = $dt . " " . $start_time;
            $end = $dt . " " . $end_time;
            $response = "1";
            if ($rows['result'] == 0) {
                //echo "insert";
                $insert = $authObject->insertAttendance($id, $dt, $start, $end, $media);
                if ($insert != "1") {
                    $response = "0";
                    break;
                }
            } else {
                //echo "update";
                $update = $authObject->updateAttendance($id, $dt, $start, $end, $media);
                if ($update != "1") {
                    $response = "0";
                    break;
                }
            }
        }
        if($response == "0"){
            break;
        }
    }
    $_SESSION["done"] = 1;
    //header("location:done.php");$
    echo $response;
?>