<?php
@session_start();
    // Redirect user back to index page if post body is empty
    if(!isset($POST['usermail']) || !isset($POST['password']))
        header("location:index.html");

    require_once('Auth.php');
    $authObject = new Auth();

    $email = $authObject->sanitizeString($_POST['usermail']);
    $password = sha1(md5($authObject->sanitizeString($_POST['password'])).$authObject->salt);
//  echo $email." ".$password;
//   sleep(1000);
    $result = $authObject->checkPassword($email,$password);

    $rows = mysql_fetch_assoc($result);

    if($rows['result'] == 1){
        $seconds = 3600 + time();
        $value = "profile";
        setcookie(loggedin, $value, $seconds, "/");

        $id = $rows['id'];
        $user_result = $authObject->getUserDetails($id);
        $userDetails = mysql_fetch_assoc($user_result);
        $user_type = $rows['user_type'];

        $user_family = $authObject->getFamily($id);
        $family = array();
        //$userFamily =  (mysql_fetch_assoc($user_family);
        while($child	=	mysql_fetch_assoc($user_family)) {
            array_push($family, $child);
        }

        $_SESSION["user_id"] = $id;
        $_SESSION["first_name"] = $userDetails['first_name'];
        $_SESSION["last_name"] = $userDetails['last_name'];
        $_SESSION["city"] = $userDetails['city'];
        $_SESSION["state"] = $userDetails['state'];
        $_SESSION["country"] = $userDetails['country'];
        $_SESSION["children"] = json_encode($family);
        $_SESSION["user_type"] = $user_type;
        header("location:profile.php");
    }else{
        // show incorrect username of password
        echo "Incorrect username or password";
    }
?>
