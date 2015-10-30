var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array(12);
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var today = new Date();
document.getElementById('Day').innerHTML=weekday[today.getDay()];
document.getElementById('Date').innerHTML=today.getDate();
document.getElementById('Month').innerHTML=month[today.getMonth()];
document.getElementById('Year').innerHTML=today.getFullYear();

$(document).ready(function() {
    $("#send_token").on('click', function () {
        var email = $("#email_id").val();
        var emailData = "email=" + email;
        //alert(emailData);
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/generateTokenAndSendEmail.php",
            async: false,
            data: emailData,
            success: function (data) {
                //alert(data);
                //alert("Hi");
                if (data === "0") {
                    alert("PLEASE CHECK YOUR MAILBOX FOR TOKEN");
                } else {
                    alert("PLEASE TRY AGAIN OR CONTACT {vinaygawand@yahoo.com OR mpevekar@hotmail.com}");
                }
            }
        });
    });

    $("#token_submit").on('click', function () {
        var token = $("#token").val();
        var tokenData = "token=" + token;
        //alert(emailData);
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/verifyToken.php",
            async: false,
            data: tokenData,
            success: function (data) {
                //alert(data);
                //alert("Hi");
                if (data === "0") {
                    //alert("successful");
                    //window.location.href = "resetPassword.php";
                    var htmlString = "";
                    htmlString = htmlString +
                        "<br><hr><br><ul>" +
                        "<li>" +
                        "<label for='token' >New Password</label>" +
                        "<input type='password' id='newPassword' placeholder='Password' required>" +
                        "</li>" +
                        "<li>" +
                        "<label for='token' >Retype Password</label>" +
                        "<input type='password' id='retypePassword' placeholder='Password' required>" +
                        "</li>" +
                    "<li>" +
                    "<button onclick='passwordSubmitFunction()'>Submit</button>" +
                        "</li>" +
                        "<div class='clear'></div>" +
                        "</ul>";
                    $("#resetPwd").html(htmlString);
                }else{
                    alert("INVALID TOKEN PROVIDED, PLEASE TRY AGAIN");
                }
            }
        });
    });
});

function passwordSubmitFunction(){
    //alert("hi");
    var password = $("#newPassword").val();
    var repassword = $("#retypePassword").val();
    if(!(password == repassword)){
        alert("Please re-type the same password, both passwords doesn't match");
    }
    var passwordData = "newPassword=" + password;
    //alert(passwordData);
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/resetPassword.php",
        async: false,
        data: passwordData,
        success: function (data) {
            //alert(data);
            //alert("Hi");
            if (data === "0") {
                alert("PASSWORD RESET SUCCESSFUL");
                window.location.href="index.php";
            }else{
                alert("PASSWORD RESET FAILED");
            }
        }
    });
}
