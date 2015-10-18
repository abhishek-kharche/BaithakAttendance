

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

var startTime = function () {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

var checkTime = function (i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var today = new Date();
document.getElementById('Day').innerHTML=weekday[today.getDay()];
document.getElementById('Date').innerHTML=today.getDate();
document.getElementById('Month').innerHTML=month[today.getMonth()];
document.getElementById('Year').innerHTML=today.getFullYear();

function populatedatedropdown(dayfield, monthfield, yearfield){
    var dayfield=document.getElementById(dayfield)
    var monthfield=document.getElementById(monthfield)
    var yearfield=document.getElementById(yearfield)
    for (var i=0; i<31; i++)
        dayfield.options[i]=new Option(i, i+1)
    dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true) //select today's day
    for (var m=0; m<12; m++)
        monthfield.options[m]=new Option(month[m], month[m])
    monthfield.options[today.getMonth()]=new Option(month[today.getMonth()], month[today.getMonth()], true, true) //select today's month
    var thisyear=today.getFullYear()
    for (var y=0; y<2; y++){
        yearfield.options[y]=new Option(thisyear, thisyear)
        thisyear+=1
    }
    yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true) //select today's year
}
var ampm = ["am", "pm"];
var mins = [0,5,10,15,20,25,30,35,40,45,50,55];
function populatetimedropdown (starthr, startmin, startampm, endhr, endmin, endampm){
    var starthr=document.getElementById(starthr)
    var startmin=document.getElementById(startmin)
    var endhr=document.getElementById(endhr)
    var endmin=document.getElementById(endmin)
    var startampm=document.getElementById(startampm)
    var endampm=document.getElementById(endampm)
    for(var i=1; i<13; i++)
        starthr.options[i]=new Option(i, i+1)
    for(var i=0; i<12; i++)
        startmin.options[i] = new Option(mins[i], mins[i])
    for(var i=0; i<2; i++)
        startampm.options[i]=new Option(ampm[i], ampm[i])
    for(var i=1; i<13; i++)
        endhr.options[i]=new Option(i, i+1)
    for(var i=0; i<12; i++)
        endmin.options[i] = new Option(mins[i], mins[i])
    for(var i=0; i<2; i++)
        endampm.options[i]=new Option(ampm[i], ampm[i])
}




$(document).ready(function(){

    startTime();
    //populatedatedropdown('daydropdown', 'monthdropdown', 'yeardropdown');
    //populatetimedropdown('starthrdropdown','startmindropdown','startampmdropdown','endhrdropdown','endmindropdown','endampmdropdown');

    console.log($("#session_family").attr("data"));
    var family = $.parseJSON($("#session_family").attr("data"));
    console.log(family);
    console.log(family.child_id);

    var html = "";
    for(var i=0; i<family.length; i++){
        var child = family[i];
        var user_id = child.child_id;
        var first_name = child.first_name;
        var last_name = child.last_name;
        html = html + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="child_' + i + '"value=' + user_id + '> ' + first_name + ' ' + last_name + '<br>';
    }
    console.log(html);
    if(html.length>0) {
        var str = '<hr>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check below for your family members:<br>';
        //$('#family_div').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check below for your family members:<br>');
        $('#family_div').html(str + html);
    }

    var user_type = ($("#admin").attr("data"));
    if(user_type == 1){
        var admin_html = '<a href="admin.php">Admin Page</a>'
        $('#admin_div').html(admin_html);
    }

});
