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
     alert(email + " " + password);
     });*/
    var passhtml = "<section class='loginform cf'>Change the password in order to register<br><br>";
    passhtml = passhtml +
        "<table><tr><td><b>Enter default password</b> : </td>" + "<td><input type='password' id='oldpass'></td></tr>" +
        "<tr><td><b>Enter New password</b> : </td>" + "<td><input type='password' id='newpass'></td></tr>" +
        "<tr><td><b>Retype password</b> : </td>" + "<td><input type='password' id='repass'></td></tr>" +
        "</table>" +
        "<input type='button' id='changepwdsubmit' value='Change Password'></section>";

    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/checkForDefaultPass.php",
        async: false,
        success: function (data) {
            //alert(data);
            if(data == "1") {
                $("#changePass").html(passhtml);
            }
        }
    });

    $("#submit").on('click', function(){
        //alert("Hello");
        var fName = $("#first_name").val();
        var fnameProvided = fName;
        var mName = $("#middle_name").val();
        var lName = $("#last_name").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var country = $("#country").val();
        //alert(fName + mName + lName + city + state + country);
        fName = "first_name="+fName;
        mName = "middle_name="+mName;
        lName = "last_name="+lName;
        city = "city="+city;
        state = "state="+state;
        country = "country="+country;
        var user = fName + "&" + mName + "&" + lName + "&" + city + "&" + state + "&" + country;
        //alert(user);
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/registerUser.php",
            async: false,
            data: user,
            success: function(data){
                //alert(data);
                var resultArray = JSON.parse(data);
                var result = resultArray[0];
                var registeredFirstName = result.first_name;
                //alert("Hello");
                if(registeredFirstName === fnameProvided){
                    alert("Registration Successful, hit OK to continue.");
                    window.location.href = "profile.php";
                }else{
                    alert("Refresh and Try Again...");
                }
            }
        });
    });

    $("#changepwdsubmit").on('click', function(){
        //alert("change password now");
        var oldpass = $("#oldpass").val();
        var newpass = $("#newpass").val();
        var repass = $("#repass").val();

        if(!oldpass){
            alert("Please provide default password");
            return;
        }else if(!newpass){
            alert("Please provide new password");
            return;
        }else if(!repass){
            alert("Please retype new password");
            return;
        }

        if(newpass != repass){
            alert("Retyped password doesn't match with new password, please try again");
            return;
        }
        var oldmatched = "0";
        //var passdata = "password=" + oldpass;
        var passdata = {password:oldpass};
        //alert(passdata);
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/checkpassprovided.php",
            async: false,
            data: passdata,
            success: function(data){
                //alert("data " + data);
                if(data == "1"){
                    oldmatched = "1";
                }
            }
        });

        if(oldmatched == "0"){
            alert("Current Password doesn't match with the password you provided");
            return;
        }
        var updatedata = {password:newpass};
        //alert(updatedata);
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/updateUserPassByUser.php",
            async: false,
            data: updatedata,
            success: function(data){
                //alert("data update " + data);
                if(data == "1"){
                    alert("Password changed successfully");
                    $("#changePass").hide();
                }else{
                    alert("Please try again");
                }
            }
        });
    });
});

