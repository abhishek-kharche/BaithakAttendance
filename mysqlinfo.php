<?php
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}
    $db_hostname = "localhost";
    $db_username = "root";
    $db_password = "password";
    $database = "test_1"
?>