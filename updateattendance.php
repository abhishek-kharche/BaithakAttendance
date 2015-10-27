<?php
@session_start();
// Redirect user back to index page if post body is empty
    if(!isset($_POST['media']))
        header("location:index.php");
//print_r($_POST);

    require_once('Auth.php');
    $authObject = new Auth();

    $date = $_POST['date'];
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
print_r($dependent);
    foreach($dependent as $id){
        $result = $authObject->checkIfDatePresent($id, $date);
        $rows = mysql_fetch_assoc($result);
        $start = $date." ".$start_time;
        $end = $date." ".$end_time;
        if($rows['result'] == 0){
            echo "insert";
            $insert = $authObject->insertAttendance($id, $date, $start, $end, $media);
        }else{
            echo "update";
            $update = $authObject->updateAttendance($id, $date, $start, $end, $media);
        }
    }
    $_SESSION["done"] = 1;
    header("location:done.php");
?>