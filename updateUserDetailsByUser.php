<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}
?>


<!DOCTYPE html>
<html>
<title>Shree Baithak Upasthiti</title>

<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body onload="startTime()">
<hr>
<h1><center><font size="8">|| Shree Ram Samarth ||</font></center></h1>
<!--<h1><center><font size="8">Sample Project</font></center></h1>-->
<hr>
<strong>
<span style="float: left;">
    <font size="4" color="#606860"><span id="Day"></span>, <span id="Date"></span> <span id="Month"></span> <span id="Year"></span>.
    </font>
</span>
<span style="float: right;">
    <font size="4" color="#606860">Time: <span id="time"></span></font>
</span>
    <div class="clear"></div>
</strong>
<br>
<div align="center">
    <font size="6" color="606860">UPDATE PROFILE</font>
    <!--<font size="6" color="606860">Sample Login</font>-->
</div>

<section class="updateform cf">
    <!--<form name="register">-->
     <span style="float: left;">
        <a href="profile.php"><b>Profile</b></a>
    </span>
    <span style="float: right;">
        <a href="logout.php"><b>Logout</b></a>
    </span>
    <div class="clear"></div><br>
    Update only required fields, leave everything else as it is<br><br>
    <div class="wrapper" id="updateDetails">
    <br>
    </div><div id="preferred_time"></div>
    <br><hr><button id="passbutton">Change Password</button><div id="changepass"></div>
    <input id="session_family" type="hidden" data='<?php echo $_SESSION["children"]; ?>' />
    <div id="showChildren"></div>
    <div id="updateChildren"></div>
    <div id="successResult"></div>
</section>

<script src = "script/jquery-2.1.4.js"></script>
<script src="script/updateUser.js"></script>

</body>
</html>
