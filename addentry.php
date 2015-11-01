<?php
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
    <script src="script/profilepage.js"></script>
</strong>
<br>
<div align="center">
    <font size="6" color="606860">ADD / EDIT SADASYA</font>
    <!--<font size="6" color="606860">Sample Login</font>-->
</div>

<section class="addform cf">
    <span style="float: left;">
            <a href="profile.php">Profile</a>
            &nbsp;/&nbsp;
            <a href="admin.php">Admin Home</a>
        </span>
        <span style="float: right;">
            <a href="logout.php">Logout</a>
        </span>
    <div class="clear"></div>
    <br>
    Select an operation and submit the information.
    <br>
    <input type="radio" name="dofunction" value="add_users">Add User(s)
    &nbsp;&nbsp;&nbsp;
    <input type="radio" name="dofunction" value="add">Add Sadasya
    &nbsp;&nbsp;&nbsp;
    <input type="radio" name="dofunction" value="add_relation">Add Relation
    &nbsp;&nbsp;&nbsp;
    <input type="radio" name="dofunction" value="edit">Edit Sadasya
    &nbsp;&nbsp;&nbsp;
    <input type="radio" name="dofunction" value="delete">Delete Sadasya
    <!--<form name="login" action="login.php" method="POST" accept-charset="utf-8">-->
        <div id="operation_div"></div><br>
        <div id="return_result_div"></div>
    <!--</form>-->
</section>

<script src = "script/jquery-2.1.4.js"></script>
<script src="script/addpage.js"></script>

</body>
</html>
