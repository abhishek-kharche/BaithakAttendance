<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}

require_once('Auth.php');
$authObject = new Auth();

$first = $_POST['first_name'];
$last = $_POST['last_name'];

# confirm in js whether first and last name are non empty
//echo ($_POST);

$result = $authObject->findUser($first, $last);
$results = array();
while($row	=	mysql_fetch_assoc($result)) {
    array_push($results, $row);
}
# return 0 for admin and 1 for relation with the result so that we can identify it on front end
# handle the case when there are one or more user with same first and last name
# check in relation if result set is empty
if(count($results) == 0){
    # find the same in relations table
    $rslt = $authObject->findRelation($first, $last);
    while($row = mysql_fetch_assoc($rslt)){
        array_push($results, $row);
    }
}

echo json_encode($results);

?>