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

var useruid = "";
var sub_user_id = "";
var first_name = "";
var middle_name = "";
var last_name = "";
var city = "";
var state = "";
var country = "";
var preferred_time = "";
var cfirst_name = "";
var cmiddle_name = "";
var clast_name = "";
var crelation = "";
$(document).ready(function(){
    /*$("#login_submit").on('click', function(){
     var email=$("#email_id").val();
     var password=$("#typed_password").val();
     alert(email + " " + password);
     });*/

    // Get user details
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/findUserByUser.php",
        async: false,
        success: function(data){
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            useruid = result.user_id;
            first_name = result.first_name;
            middle_name = result.middle_name;
            last_name = result.last_name;
            city = result.city;
            state = result.state;
            country = result.country;
            preferred_time = result.preferred_time
            if(!preferred_time){
                preferred_time = "";
            }

        }
    });

    // Get Children details
    var family = $.parseJSON($("#session_family").attr("data"));
    var childrenHtml = "";
    for(var i=0; i<family.length; i++){
        if(i==0){
            childrenHtml = childrenHtml + "<br><hr><br><b>Select your dependent to update their details</b><br><br>";
        }
        var child = family[i];
        var child_user_id = child.child_id;
        var child_first_name = child.first_name;
        var child_last_name = child.last_name;
        childrenHtml = childrenHtml + "<input id='session_family' type='hidden' data= />";
        childrenHtml = childrenHtml + '<input type="radio" id="child_'+ i +'" name="updatechildren" value="' + child_user_id + '"> ' + child_first_name + ' ' + child_last_name + '<br>';
    }
    //alert(childrenHtml);
    var htmlString = "";
    //htmlString = htmlString +
        /*"<ul>" +
        "<li>" +
        "<label>First Name</label>" +
    "<input type='text' id='first_name' placeholder=" + mySpaceFunction(first_name) + "  autofocus>" +
    "</li>" +
    "<li>" +
    "<label>Middle Name</label>" +
    "<input type='text' id='middle_name' placeholder=" + mySpaceFunction(middle_name) + " ></li>" +
    "<li>" +
    "<label>Last name</label>" +
    "<input type='text' id='last_name' placeholder=" + mySpaceFunction(last_name) + " ></li>" +
    "</li>" +
    "<li>" +
    "<label>City</label>" +
    "<input type='text' id='city' placeholder=" + mySpaceFunction(city) + " ></li>" +
    "</li>" +
    "<li>" +
    "<label>State</label>" +
    "<input type='text' id='state' placeholder=" + mySpaceFunction(state) + " ></li>" +
    "</li>" +
    "<li>" +
    "<label>Country</label>" +
    "<input type='text' id='country' placeholder=" + mySpaceFunction(country) + " ></li>" +
    "</li>" +
        "</ul>" +
        //"<input type='button' onclick='myUserUpdateFunction()' value='Update' id='update'>";
            "<div>"+
        "<button onclick='myUserUpdateFunction()' style='display: block'>Updte</button>" +
            "</div>" +
        "<div class='clear'></div>";*/
    htmlString = htmlString +
        "<table><tr>" +
        "<td><b>First Name </b>: " + "</td><td><input type='text' id='first_name' placeholder=" + mySpaceFunction(first_name) + "  autofocus></td>" +
        "<td><b>Middle Name </b>: " + "</td><td><input type='text' id='middle_name' placeholder=" + mySpaceFunction(middle_name) + "></td>" +
        "<td><b>Last Name </b>: " + "</td><td><input type='text' id='last_name' placeholder=" + mySpaceFunction(last_name) +"></td></tr><tr>" +
        "<td><b>City</b>: " + "</td><td><input type='text' id='city' placeholder=" + mySpaceFunction(city) +"></td>" +
        "<td><b>State</b>: " + "</td><td><input type='text' id='state' placeholder=" + mySpaceFunction(state) +"></td>" +
        "<td><b>Country</b>: " + "</td><td><input type='text' id='country' placeholder=" + mySpaceFunction(country) +"></td>" +
        "</tr>" +
        "</table>" +
        "<br><button style='align-items: center' onclick='myUserUpdateFunction()'>Update</button>";
    $('#updateDetails').html(htmlString);
    $('#showChildren').html(childrenHtml);


    //  ------------- TIME --------------
    var prehtml = "<br><hr><br>Set/Change preferred time for your Baithak<br><br>" +
        "<b>Time </b>: <input type='text' id='prefTime' placeholder=" + mySpaceFunction(preferred_time) + ">" +
        "<button onclick='myTimeFunction()'>Set</button>";

    $('#preferred_time').html(prehtml);


    // -------------- PASSWORD ---------------
    var passhtml = "";

    $('#passbutton').on('click', function() {
        passhtml = "<br>" +
            "<b>Old Password</b> : <input type='password' id='oldpass'>" +
            "<b>New Password</b> : <input type='password' id='newpass'>" +
            "<b>Retype Password</b> : <input type='password' id='repass'>" +
            "<br><br><button onclick='myUpdatePasswordFunction()'>Change Password</button>";
        $('#passbutton').hide();
        $('#changepass').html(passhtml);
    });

    $('input[type="radio"]').on('click', function() {
        $('#updateChildren').hide();
        $('#successResult').hide();
        var childHtml = "";
        childHtml = childHtml + "<br><hr><br>";
        if ($(this).is(':checked')) {
            sub_user_id= $(this).val();
            sub_user_id = "user_id=" + sub_user_id;
            //alert(sub_user_id);
            $.ajax({
                type: "POST",
                url: "http://localhost:3003/my_project/findRelationByUser.php",
                async: false,
                data: sub_user_id,
                success: function(data){
                    var childresultArray = JSON.parse(data);
                    var childresult = childresultArray[0];
                    cfirst_name = childresult.first_name;
                    cmiddle_name = childresult.middle_name;
                    clast_name = childresult.last_name;
                    crelation = childresult.relation;
                    childHtml = childHtml +
                        "<table><tr>" +
                        "<td><b>First Name </b>: " + "</td><td><input type='text' id='cfirst_name' placeholder=" + mySpaceFunction(cfirst_name) + "  autofocus></td>" +
                        "<td><b>Middle Name </b>: " + "</td><td><input type='text' id='cmiddle_name' placeholder=" + mySpaceFunction(cmiddle_name) + "></td>" +
                        "<td><b>Last Name </b>: " + "</td><td><input type='text' id='clast_name' placeholder=" + mySpaceFunction(clast_name) +"></td></tr><tr>" +
                        "<td><b>Relation</b>: " + "</td><td><input type='text' id='relation' placeholder=" + mySpaceFunction(crelation) +"></td>" +
                        "</tr>" +
                        "</table>" +
                        "<br><button style='align-items: center' onclick='myChildUpdateFunction()'>Update</button>";
                        /*"<ul>" +
                        "<li>" +
                        "<label>First Name</label>" +
                        "<input type='text' id='cfirst_name' placeholder=" + mySpaceFunction(cfirst_name) + "  autofocus>" +
                        "</li>" +
                        "<li>" +
                        "<label>Middle Name</label>" +
                        "<input type='text' id='cmiddle_name' placeholder=" + mySpaceFunction(cmiddle_name) + " ></li>" +
                        "<li>" +
                        "<label>Last name</label>" +
                        "<input type='text' id='clast_name' placeholder=" + mySpaceFunction(clast_name) + " ></li>" +
                        "</li>" +
                        "<li>" +
                        "<label>Relation</label>" +
                        "<input type='text' id='relation' placeholder=" + mySpaceFunction(crelation) + " ></li>" +
                        "</li>" +
                        "</ul>";*/
                }
            });
            //childHtml = childHtml + "<br><br><div style='text-align: center'><input type='button' onclick='myChildUpdateFunction()' value='Update' id='childUpdate'></div>";
            $('#updateChildren').html(childHtml);
            $('#updateChildren').show();
        }

    });

});

function myUserUpdateFunction(){
    $('#successResult').hide();
    var ufirst_name = $("#first_name").val();
    var umiddle_name = $("#middle_name").val();
    var ulast_name = $("#last_name").val();
    var ucity = $("#city").val();
    var ustate = $("#state").val();
    var ucountry = $("#country").val();

    if(ufirst_name.length == 0){
        ufirst_name = first_name;
    }
    if(umiddle_name.length == 0){
        umiddle_name = middle_name;
    }
    if(ulast_name.length == 0){
        ulast_name = last_name;
    }
    if(ucity.length == 0){
        ucity = city;
    }
    if(ustate.length == 0){
        ustate = state;
    }
    if(ucountry.length == 0){
        ucountry = country;
    }

    var updateData = "user_id=" + useruid + "&first_name=" + ufirst_name + "&middle_name=" + umiddle_name + "&last_name=" + ulast_name + "&city=" + ucity + "&state=" + ustate + "&country=" + ucountry;

    var successResult = "<br><hr><br>";

    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/updateUserByUser.php",
        async: false,
        data: updateData,
        success: function(data){
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            var rfirst_name = result.first_name;
            var rmiddle_name = result.middle_name;
            var rlast_name = result.last_name;
            var rcity = result.city;
            var rstate = result.state;
            var rcountry = result.country;
            successResult = successResult + "SUCCESSFULLY UPDATED YOUR DETAILS AS BELOW" +
                "<br><b>Name</b> : " + rfirst_name + " " + rmiddle_name + " " + rlast_name +
                "<br><b>Address</b> : " + rcity + " " + rstate + " " + rcountry;
        }
    });
    $('#successResult').html(successResult);
    $('#successResult').show();

}

function myChildUpdateFunction(){
    $('#successResult').hide();
    var cufirst_name = $("#cfirst_name").val();
    var cumiddle_name = $("#cmiddle_name").val();
    var culast_name = $("#clast_name").val();
    var curelation = $("#relation").val();

    if(cufirst_name.length == 0){
        cufirst_name = cfirst_name;
    }
    if(cumiddle_name.length == 0){
        cumiddle_name = cmiddle_name;
    }
    if(culast_name.length == 0){
        culast_name = clast_name;
    }
    if(curelation.length == 0){
        curelation = crelation;
    }

    var updateData = sub_user_id + "&first_name=" + cufirst_name + "&middle_name=" + cumiddle_name + "&last_name=" + culast_name + "&relation=" + curelation;
    //alert(updateData);
    var successResult = "<br><hr><br>";

    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/updateRelationByUser.php",
        async: false,
        data: updateData,
        success: function(data){
            //alert(data);
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            var crfirst_name = result.first_name;
            var crmiddle_name = result.middle_name;
            var crlast_name = result.last_name;
            var crrelation = result.relation;
            successResult = successResult + "SUCCESSFULLY UPDATED DEPENDENT AS BELOW" +
                "<br><b>Name</b> : " + crfirst_name + " " + crmiddle_name + " " + crlast_name +
                "<br><b>Relation</b> : " + crrelation;
        }
    });
    $('#successResult').html(successResult);
    $('#successResult').show();
}

function myTimeFunction(){
    var preTime = $("#prefTime").val();
    if(preTime.length == 0){
        preTime = preferred_time;
    }

    if(preTime.length == 0){
        alert("Please provide preferred Baithak time (hr:min hr:min)");
        return;
    }

    var preTimeSplitSpace = preTime.split(" ");
    if(!preTimeSplitSpace[0] || !preTimeSplitSpace[1]){
        alert("Please provide preferred time in proper format(hr:min hr:min), example --> (11:00 14:00)");
        return;
    }
    var start = preTimeSplitSpace[0];
    var end = preTimeSplitSpace[1];

    var startColon = start.split(":");
    var endColon = end.split(":");

    if(!startColon[0] || !startColon[1] || !endColon[0] || !endColon[1]){
        alert("Please provide preferred time in proper format(hr:min hr:min), example --> (11:00 14:00)");
        return;
    }

    var shr = startColon[0];
    var smin = startColon[1];
    var ehr = endColon[0];
    var emin = endColon[1];

    var startdate = new Date();
    var enddate = new Date();
    startdate.setHours(shr, smin, "00");
    enddate.setHours(ehr,emin, "00");

    if(startdate.getTime() > enddate.getTime()){
        alert("Please provide end time greater than start time");
        return;
    }
    var timedate = "user_id=" + useruid + "&time=" + shr + ":" + smin + " " + ehr + ":" + emin;
    //alert(timedate);
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/updatePreferredTime.php",
        async: false,
        data: timedate,
        success: function(data){
            alert(data);
        }
    });

}

function myUpdatePasswordFunction(){
    var oldpass = $("#oldpass").val();
    var newpass = $("#newpass").val();
    var repass = $("#repass").val();

    if(!oldpass){
        alert("Please provide your current password");
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
    var passdata = "user_id=" + useruid + "&password=" + oldpass;
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
    var updatedata = "user_id=" + useruid + "&password=" + newpass;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/updateUserPassByUser.php",
        async: false,
        data: updatedata,
        success: function(data){
            //alert("data " + data);
            if(data == "1"){
                alert("Password updated successfully");
            }else{
                alert("Please try again");
            }
        }
    });

}

function mySpaceFunction(abc){
    var Array = abc.split(" ");
    var ret = "";

    if(Array.length == 1){
        ret = Array[0];
    }else{
        var len = Array.length;
        for(var count = 0; count<len;count++)
        {
            ret = ret + Array[count] + "&nbsp;";
        }
    }
    return ret;
}

