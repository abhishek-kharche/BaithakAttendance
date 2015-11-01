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

$(document).ready(function(){
    /*$("#login_submit").on('click', function(){
        var email=$("#email_id").val();
        var password=$("#typed_password").val();
        //alert(email + " " + password);
        var logindata = "email=" + email + "&password=" + password;
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/validateLogin.php",
            async: false,
            data: logindata,
            success: function (data) {
                //alert(data);
                if(data == "1"){
                    window.location.href = "profile.php";
                }else if(data = "2"){
                    window.location.href = "register.php";
                }else{
                    window.location.href = "index.php";
                }
            }
        });
    });*/

});

