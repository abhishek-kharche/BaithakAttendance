<?php
@session_start();
    if(isset($_COOKIE['loggedin'])){
		header("location:profile.php");
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
    <!--<font size="6" color="606860">USA Baithak Upasthiti</font>-->
    <font size="6" color="606860">Sample Login</font>
</div>

<section class="loginform cf">
    <form name="login" action="login.php" method="POST" accept-charset="utf-8">
        <ul>
            <li>
                <label for="usermail" >Email</label>
                <input type="email" id="email_id" name="usermail" placeholder="username@email.com" required autofocus>
            </li>
            <li>
                <label for="password">Password</label>
                <input type="password" id="typed_password" name="password" placeholder="password" required></li>
            <li>
                <input type="submit" value="Login" id ="login_submit">
                <label for="forgotpwd">Forgot Password?</label>
            </li>
        </ul>
    </form>
</section>

<script src = "script/jquery-2.1.4.js"></script>
<script src="script/loginpage.js"></script>

</body>
</html>