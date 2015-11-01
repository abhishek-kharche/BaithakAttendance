<?php
@session_start();
if(!isset($_COOKIE['loggedin'])){
    header("location:index.php");
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<title>Shree Baithak Upasthiti</title>

<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body onload="startTime()">
<hr>
<!--<h1><center><font size="8">|| Shree Ram Samarth ||</font></center></h1>-->
<h1><center><font size="8">Sample Project</font></center></h1>
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
    <!--<font size="6" color="606860">REGISTER USA Baithak Upasthiti</font>-->
    <font size="6" color="606860">Sample Login</font>
</div>

<div id="changePass"></div>


<section class="loginform cf">
    <!--<form name="register">-->
        <ul>
            <li>
                <label>First Name</label>
                <input type="text" id="first_name" placeholder="First Name" required autofocus>
            </li>
            <li>
                <label>Middle Name</label>
                <input type="text" id="middle_name" placeholder="Middle Name" required></li>
            <li>
                <label>Last name</label>
                <input type="text" id="last_name" placeholder="Last Name" required></li>
            </li>
            <li>
                <label>City</label>
                <input type="text" id="city" placeholder="City" required></li>
            </li>
            <li>
                <label>State</label>
                <input type="text" id="state" placeholder="State" required></li>
            </li>
            <li>
                <label>Country</label>
                <input type="text" id="country" placeholder="Country" required></li>
            <!--<li>
                <input type="button" value="Register Me" id="submit">
            </li>-->
        </ul>
    <!--</form>-->
    <input type="button" value="Register Me" id="submit">
    <input type="button" value="Logout" onclick="document.location.href='logout.php'">
    <div class="clear"</div>
</section>

<script src = "script/jquery-2.1.4.js"></script>
<script src="script/registerpage.js"></script>

</body>
</html>
