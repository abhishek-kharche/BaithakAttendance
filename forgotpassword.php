<?php

?>

<!DOCTYPE html>
<html>
<title>Forgot Password</title>

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
    <font size="6" color="606860">RESET PASSWORD</font>
    <!--<font size="6" color="606860">Sample Login</font>-->
</div>

<section class="loginform cf">
        <ul>
            <li>
                <label for="usermail" >Email</label>
                <input type="email" id="email_id" placeholder="username@email.com" required autofocus>
            </li>
            <li>
                <input type="button" value="Send token" id ="send_token">
            </li>
            <div class="clear"></div>
        </ul>
        <ul><li><br></li>
            <li>
                <label for="token" >Token</label>
                <input type="text" id="token" placeholder="token" required>
            </li>
            <li>
                <input type="button" value="Reset Password" id ="token_submit">
            </li>
            <div class="clear"></div>
        </ul>
        <div id="resetPwd"></div>
</section>

<script src = "script/jquery-2.1.4.js"></script>
<script src="script/forgotpassword.js"></script>

</body>
</html>