<?php
@session_start();
    if(!isset($_COOKIE['loggedin'])){
		header("location:index.php");
	}
    echo "<h3> PHP List All Session Variables</h3>";
    foreach ($_SESSION as $key=>$val)
        echo $key." ".$val."<br/>";
?>
<!DOCTYPE html>
<html>
<title>Shree Baithak Upasthiti</title>
<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">

</head>
<body>
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
    <script src="script/profilepage.js"></script>
</strong>
<br><br>
<!--
<marquee loop="1" direction="left" behavior="slide">
    <font size="4" color="#000080">Notice:
    Shree sadguru aadnya .....
    </font>
</marquee>
-->
<br><br>
<section class="loginformprofile cf">

<div align="left">
    <font size="4.5" color="#305050">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <?php
        echo "Baithak Upasthiti for <u>" . $_SESSION["first_name"] . "</u> <u>" . $_SESSION["last_name"] . "</u>" .
            "<input id='admin' type='hidden' data=". $_SESSION["user_type"] ." />" .
            "<div id ='admin_div' style= 'float: right'></div>" .
        "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" .
        "Location : " . $_SESSION["city"] . ", " . $_SESSION["state"] . ", " . $_SESSION["country"]
        ?>
        <span style="float: right;">
                <a href="updateUserDetailsByUser.php">Update Details</a>
            </span>
        <div class="clear"></div>
        <br>
    </font>
</div>
    <form method="post" action="updateattendance.php">
        <font size="4" color="#305050">

            <input id="session_family" type="hidden" data='<?php echo $_SESSION["children"]; ?>' />
            <div id="family_div"></div>
            <hr>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Date:
                <input type="date" data-date-inline-picker="true" name="date">
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Time:
                <input type="time" name="start_time">
            &nbsp;&nbsp;to&nbsp;&nbsp;
                <input type="time" name="end_time">
            &nbsp;&nbsp;EST
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Media:&nbsp;
                    <input type="radio" name="media" value="Teleconferencing">Teleconferencing&nbsp;
                    <input type="radio" name="media" value="EZStream">EZStream&nbsp;
                    <input type="radio" name="media" value="Skype">Skype
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="float: left;">
                <input type="submit" value="Submit">
            </span>
            <br>
            <span style="float: right;">
                <a href="logout.php">Logout</a>
            </span>
            <div class="clear"></div>
            <br>

        </font>
    </form>
</section>

<br><br>

<div align="left">
    <font size="3">For further questions and to update your profile, please contact <a
            href="mailto:vinaygawand@yahoo.com">vinaygawand@yahoo.com</a> or
        <a href="mailto:mpevekar@hotmail.com">mpevekar@hotmail.com</a>
    </font>
</div>


<script src = "script/jquery-2.1.4.js"></script>
<script type="text/javascript" src="script/profilepage.js"></script>

</body>
</html>