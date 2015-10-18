<?php
    @session_start();
    if(!isset($_SESSION["done"]))
        header("location:index.html");
?>

<!DOCTYPE html>
<html>
<title>Successful</title>
<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<section class="loginformprofile cf">
</body>
<div align="left">
    <font size="4.5" color="#305050">
        Upasthiti updated successfully...
        <br>
        <a href='profile.php'>
            <span style="float: left;">Go back to profile</span>
        </a>
        <a href='logout.php'>
            <span style="float: right;">Logout</span>
        </a>
    </font>
</div>
</body>
</html>