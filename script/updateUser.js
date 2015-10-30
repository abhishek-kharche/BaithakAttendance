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
        }
    });

    // Get Children details
    var family = $.parseJSON($("#session_family").attr("data"));
    var childrenHtml = "";
    for(var i=0; i<family.length; i++){
        if(i==0){
            childrenHtml = childrenHtml + "<br><br><hr><b>Select below to update your dependents</b><br><br>";
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
    htmlString = htmlString +
        "<ul>" +
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
        "<input type='button' onclick='myUserUpdateFunction()' value='Update' id='update'>";
    $('#updateDetails').html(htmlString);
    $('#showChildren').html(childrenHtml);


    var cfirst_name = "";
    var cmiddle_name = "";
    var clast_name = "";
    var crelation = "";
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
                        "<ul>" +
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
                        "</ul>";
                }
            });
            childHtml = childHtml + "<br><br><div style='text-align: center'><input type='button' onclick='myChildUpdateFunction()' value='Update' id='childUpdate'></div>";
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

