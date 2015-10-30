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

    $('input[type="submit"]').on('click', function(){
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
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/registerUser.php",
            async: false,
            data: user,
            success: function(data){
                var resultArray = JSON.parse(data);
                var result = resultArray[0];
                var registeredFirstName = result.first_name;
                if(registeredFirstName === fnameProvided){
                    alert("Registration Successful, hit OK to continue.");
                    window.location.href = "profile.php";
                }else{
                    alert("Refresh and Try Again...");
                }
            }
        });
    });
});

