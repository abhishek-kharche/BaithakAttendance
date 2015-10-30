<?php
@session_start();
    // Redirect user back to index page if post body is empty
    if(!isset($_POST['usermail']) || !isset($_POST['password'])) {
        //sleep(2);
        header("location:index.php");
    }

    require_once('Auth.php');
    $authObject = new Auth();

    $email = $authObject->sanitizeString($_POST['usermail']);
    $password = sha1(md5($authObject->sanitizeString($_POST['password'])).$authObject->salt);
//  echo $email." ".$password;
//   sleep(1000);
    $result = $authObject->checkPassword($email,$password);
    //echo $result;
    $rows = mysql_fetch_assoc($result);
    //echo $email."<br/>".$password;
    $_SESSION = array();
    if($rows['result'] == 1){
        $seconds = 3600 + time();
        $value = "profile";
        setcookie(loggedin, $value, $seconds, "/");

        $id = $rows['id'];
        $_SESSION["user_id"] = $id;
        $_SESSION["first_name"] = $userDetails['first_name'];

        $user_result = $authObject->getUserDetails($id);
        $userDetails = mysql_fetch_assoc($user_result);

        // Check if this is a new user
        if(strlen($userDetails['first_name']) === 0){

            header("location:register.php");
        }else {
            $_SESSION["registered"] = "true";
            $user_type = $rows['user_type'];
            $user_family = $authObject->getFamily($id);
            $family = array();
            while ($child = mysql_fetch_assoc($user_family)) {
                array_push($family, $child);
            }
            $_SESSION["first_name"] = $userDetails['first_name'];
            $_SESSION["last_name"] = $userDetails['last_name'];
            $_SESSION["city"] = $userDetails['city'];
            $_SESSION["state"] = $userDetails['state'];
            $_SESSION["country"] = $userDetails['country'];
            $_SESSION["children"] = json_encode($family);
            $_SESSION["user_type"] = $user_type;

            //echo "before Header";
            header("location:profile.php");
        }
    }else{
        // show incorrect username of password
        //echo "Incorrect username or password";
        echo "<script type='text/javascript'>alert('Incorrect username or password');</script>";
        //header("location:index.php");
        print "<script type='text/javascript'>window.location='index.php';</script>";
    }
?>
