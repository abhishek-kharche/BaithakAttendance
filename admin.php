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
    <link rel="stylesheet" href="css/classic.css">

</head>
<body>
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
<br><br>

<div align="center">
    <font size="6" color="606860">Admin Portal</font>
    <!--<font size="6" color="606860">Sample Login</font>-->
</div>

<section class="results cf">
        <span style="float: left;">
            <a href="profile.php">Back to Profile</a>
        </span>
        <span style="float: right;">
            <a href="logout.php">Logout</a>
        </span>
        <div class="clear"></div>
        <font size="3"><b>Baithak Upasthiti</b></font><br>
        <br>
        Date:
        <input type="date" name="date_selected" id="date">
        OR
        Range
        <input type="date" name="start_date" id="sdate">
        <input type="date" name="end_date" id="edate">
        <input type="submit" value="Submit" id="date_submit">
        <br><br>
        <input type="submit" value="Show All Sadasya" id="show_all">
        &nbsp;&nbsp;&nbsp;
        <input type="submit" value="Add/Edit Sadasya" id="add_entry">
        &nbsp;&nbsp;&nbsp;
        <input type="submit" value="Add/Delete Baithak" id="edit_days">
        <div id ="adddelete" style="width: 100%;">
            <hr>
            <div id="addNew" style="float:left; width: 30%; display: inline"></div>
            <div id="monthdays" style="float:right;width: 70%;display: inline"></div>
        </div>
        <div style="clear:both"></div>
</section>
<div id="columns" class="resultset"></div>
<script src = "script/jquery-2.1.4.js"></script>
<script src = "script/jquery-ui.js"></script>
<script type="text/javascript" src="script/adminpage.js"></script>
<script src="js/jquery.columns.min.js"></script>

</body>
</html>
