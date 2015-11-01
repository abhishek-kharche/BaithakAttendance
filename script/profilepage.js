

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

    //console.log($("#session_family").attr("data"));
    var childIds = new Array();
    try {
        var family = $.parseJSON($("#session_family").attr("data"));
        //console.log(family);
        //console.log(family.child_id);
        if(family) {
            var html = "";

            for (var i = 0; i < family.length; i++) {
                var child = family[i];
                var user_id = child.child_id;
                var first_name = child.first_name;
                var last_name = child.last_name;
                childIds.push(user_id);
                //html = html + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="child_' + i + '"value=' + user_id + '> ' + first_name + ' ' + last_name + '<br>';
                html = html + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class="children" name="child" value=' + user_id + '> ' + first_name + ' ' + last_name + '<br>';
            }
            //console.log(html);
            if (html.length > 0) {
                var str = '<hr>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check below for your family members:<br>';
                //$('#family_div').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check below for your family members:<br>');
                $('#family_div').html(str + html);
            }
        }
    }catch(err){
    }
    var user_type = ($("#admin").attr("data"));
    if(user_type == 1){
        var admin_html = '<a href="admin.php">Admin Page</a>'
        $('#admin_div').html(admin_html);
    }



    // Show available attendance dates
    var datehtml = "";

    //datehtml = datehtml +
      //      "Please select days for attendance<br>";

    var today = new Date();
    //alert(today);
    //today = new Date(2015, 9, 25);
        //datehtml = datehtml + " " + today.getDay() + " " + today.getDate() + " " + today.getMonth() + " " + today.getYear() + " " + today.getMonth() + "<br>";

    // get all sundays from 1st day to today.getDate
    var todayDate = today.getDate();
    var sundays = new Array();
    for(var i=1; i<= todayDate; i++){
        var year = today.getYear() + 1900;
        var thisDate = new Date(year, today.getMonth(), i);
        if(thisDate.getDay() === 0){
            var dt = "";
            if(i<10){
                dt = "0" + i.toString();
            }else{
                dt = i.toString();
            }
            sundays.push(year + "-" + (today.getMonth() + 1) + "-" + dt);
        }
    }
    var days = "days=" + sundays;
    var allDays = new Array();
    var getLastDate = "0";
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/getValidDays.php",
        async: false,
        data: days,
        success: function (data) {
            //alert(data);
            var resultArray = JSON.parse(data);
            if(resultArray.length == 0){
                getLastDate = "1";
            }
            for(var i=0; i<resultArray.length; i++) {
                var result = resultArray[i];
                //alert(result);
                var dateString = "";
                var dateArray = result.split("-");
                var showDate = "";
                for(var j=0; j< dateArray.length; j++){
                    if(j == 0){
                        dateString = dateString + dateArray[j];
                    }else {
                        dateString = dateString + ", " + dateArray[j];
                        if(j == dateArray.length - 1){
                            showDate = showDate + dateArray[j];
                        }else{
                            showDate = showDate + dateArray[j] + "/";
                        }
                    }
                }
                var thisDay = new Date(dateString);
                var weekday = new Array(7);
                weekday[0]=  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

                var n = weekday[thisDay.getDay()];
                allDays.push(result);
                datehtml = datehtml +
                    "<input type='radio' name='date' value='" + result + "'>" + n + " ("  + showDate + ")" +
                    "&nbsp;&nbsp;";
                if(i== 3){
                    datehtml = datehtml + "<br>";
                }
            }
            if(resultArray.length > 1) {
                datehtml = datehtml + " OR <input type='checkbox' name='date' value='all'>Select All";
            }
        }
    });
    //getLastDate = "1";
    if(getLastDate == "1"){
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/getLastDate.php",
            async: false,
            success: function (data) {
                //alert(data);
                //var resultArray = JSON.parse(data);
                //var result = resultArray[0];
                var lastdate = data;
                var showDate = "";
                var dateArray = lastdate.split("-");
                for(var j=0; j< dateArray.length; j++){
                    if(j == dateArray.length - 1){
                        showDate = showDate + dateArray[j];
                    }else if(j != 0){
                        showDate = showDate + dateArray[j] + "/";
                    }
                }

                var thisDay = new Date(lastdate);
                var weekday = new Array(7);
                weekday[0]=  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                var n = weekday[thisDay.getDay()];
                allDays.push(lastdate);
                datehtml = datehtml +
                    "<input type='radio' name='date' value='" + lastdate + "'>" + n + " ("  + showDate + ")" +
                    "&nbsp;&nbsp;";
            }
        });
    }

    for(var i=0; i<sundays.length; i++){
        //datehtml = datehtml + " " + sundays[i];
    }
    //datehtml = datehtml + " HELLOHELLO hihi HIELLO"
    $("#displayDate").html(datehtml);

    var timehtml = "";

    /*$.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/getValidDays.php",
        async: false,
        data: days,
        success: function (data) {

        }
    });*/
    timehtml = timehtml + "&nbsp;&nbsp;OR&nbsp;&nbsp;";
    var preferred_time = $("#session_time").attr("data");
    if(preferred_time) {
        var spaceSeparated = preferred_time.split(" ");
        var preferredStart = spaceSeparated[0];
        var preferredEnd = spaceSeparated[1];
        var preferredStartColon = preferredStart.split(":");
        var preferredEndColon = preferredEnd.split(":");
        var startString = "";
        var endString = "";
        if (preferredStartColon[0] > 12) {
            startString = (preferredStartColon[0] - 12) + ":" + preferredStartColon[1] + " PM";
        } else {
            startString = preferredStart + " AM";
        }
        if (preferredEndColon[0] > 12) {
            endString = (preferredEndColon[0] - 12) + ":" + preferredEndColon[1] + " PM";
        } else {
            endString = preferredEnd + " AM";
        }
        timehtml = timehtml + "<input type='checkbox' name='time' value='" + preferred_time + "'>" + startString + "&nbsp;to&nbsp;" + endString + "&nbsp;(EST)";
        //timehtml = timehtml + startString + " " + endString;
        //alert(preferred_time);
        $("#preferredTime").html(timehtml);
    }
    $("#attendance_submit").on('click', function(){
        //alert("Hello");
        var media = $( "input:radio[name=media]:checked" ).val();
        var date = $( "input:radio[name=date]:checked" ).val();
        var all = $( "input:checkbox[name=date]:checked" ).val();
        var pretime = $( "input:checkbox[name=time]:checked" ).val();
        var starttime = $( "#time1" ).val();
        var endtime = $( "#time2" ).val();

        var finalDate = "";
        if(!all){
            if(!date){
                alert("Please select a date of Upasthiti");
                return;
            }else {
                finalDate = date;
            }
        }else{
            finalDate = allDays.toString();
        }

        var finalStartTime = "";
        var finalEndTime = "";
        if(!starttime || !endtime){
            if(!pretime) {
                if (!starttime) {
                    alert("Please provide a start time or select preferred time (if you have set it).");
                }else if(!endtime){
                    alert("Please provide a start time or select preferred time (if you have set it).");
                }
            }else{
                //select preferred time
                finalStartTime = pretime.split(" ")[0];
                finalEndTime = pretime.split(" ")[1];
            }
        }else{
            finalStartTime = starttime;
            finalEndTime = endtime;
        }

        //var child1 = $( "input:checkbox[name=child]:checked" ).val();

        //alert(arr);
        //alert (finalDate + " " + finalStartTime + " " + finalEndTime + " " + media + " " + child1);

        var arr = [];
        var i=0;
        $('.children:checked').each(function () {
            arr[i++] = $(this).val();
        });

        if(arr.length == 0) {
            var attendanceData = "date=" + finalDate + "&start_time=" + finalStartTime + "&end_time=" + finalEndTime + "&media=" + media;
        }else{

            var children = "&";
            for(var i = 0;i<arr.length;i++){
                children = children + "child_" + i + "=" + arr[i];
                if(i < arr.length -1) {
                    children = children + "&";
                }
            }
            var attendanceData = "date=" + finalDate + "&start_time=" + finalStartTime + "&end_time=" + finalEndTime + "&media=" + media + children;
        }
        //alert(attendanceData);
        //return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/updateattendance.php",
            async: false,
            data: attendanceData,
            success: function (data) {
                //alert(data);
                if(data == "1"){
                    alert("Upasthiti submitted successfully");
                }else if(data == "0"){
                    alert("Please try again, upasthiti not submitted");
                }
            }
        });
    })

    //alert(childIds[0]);
    /*var userdata = "";
    for(var ch=0;ch <childIds.length;ch++){
        userdata = userdata + "child_" + ch + "=" + childIds[ch];
        if(ch < childIds.length - 1){
            userdata = userdata + "&";
        }
    }
    */
    var datesattended = "";
    datesattended = datesattended + "<section class='loginformprofile cf'><br>";
    var updated = 0;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/userDatesAttended.php",
        async: false,
        success: function (data) {
            var attendedDates = JSON.parse(data);
            for(var row=0; row <attendedDates.length ; row++) {
                updated = 1;
                var firstResult = attendedDates[row];
                //var dateA = firstResult.date;
                var fName = firstResult.first_name;
                var lName = firstResult.last_name;
                var date = firstResult.date;
                var starttime = firstResult.starttime;
                var endtime = firstResult.endtime;

                var dateArray = date.split("-");
                var showDate = "";
                for(var j=0; j< dateArray.length; j++){
                    if(j == dateArray.length - 1){
                        showDate = showDate + dateArray[j];
                    }else if(j != 0){
                        showDate = showDate + dateArray[j] + "/";
                    }
                }

                var thisDay = new Date(date + " 00:00:00");
                //alert(date + " " + thisDay);
                var weekday = new Array(7);
                weekday[0]=  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                var n = weekday[thisDay.getDay()];

                // Arrange time
                var startArray = starttime.split(":");
                var endArray = endtime.split(":");
                var startT = "";
                var entT = "";
                if(startArray[0] > 11){
                    var hr = "";
                    if(startArray[0]>12) {
                        hr = startArray[0] - 12;
                    }else{
                        hr = startArray[0];
                    }
                    startT = hr + ":" + startArray[1] + " PM";
                }else{
                    startT = startArray[0] + ":" + startArray[1] + " AM";
                }

                if(endArray[0] > 11){
                    var hr = "";
                    if(endArray[0]>12) {
                        hr = endArray[0] - 12;
                    }else{
                        hr = endArray[0];
                    }
                    entT = hr + ":" + endArray[1] + " PM";
                }else{
                    entT = endArray[0] + ":" + endArray[1] + " AM";
                }

                if(row == 0) {
                    datesattended = datesattended + "UPASTHITI SUBMITTED FOR THIS MONTH<br><br>";
                    datesattended = datesattended +
                        "--&nbsp;&nbsp;" + fName + "&nbsp;" + lName + "<br>";
                }
                datesattended = datesattended +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (row + 1) + ")&nbsp;" + n + "(" + showDate + ")" +"&nbsp;-&nbsp;" + startT + "&nbsp;to&nbsp;" + entT + "<br>";
            }
        }
    });
    datesattended = datesattended + "<br>";
    if(childIds.length > 0) {
        //var children = childIds.toString();
        //userdata = "children=" + userdata;
        //alert(userdata);
        for(var chld = 0; chld <childIds.length; chld++) {
            var userdata= "childId=" + childIds[chld];
            $.ajax({
                type: "POST",
                url: "http://localhost:3003/my_project/childDatesAttended.php",
                async: false,
                data: userdata,
                success: function (data) {
                    var attendedDates = JSON.parse(data);
                    for(var row=0; row <attendedDates.length ; row++) {
                        updated = 1;
                        var firstResult = attendedDates[row];
                        var dateA = firstResult.date;
                        var fName = firstResult.first_name;
                        var lName = firstResult.last_name;
                        var date = firstResult.date;
                        var starttime = firstResult.starttime;
                        var endtime = firstResult.endtime;

                        //alert("dateA " + dateA);

                        // Arrange Day
                        var dateArray = date.split("-");
                        var showDate = "";
                        for(var j=0; j< dateArray.length; j++){
                            if(j == dateArray.length - 1){
                                showDate = showDate + dateArray[j];
                            }else if(j != 0){
                                showDate = showDate + dateArray[j] + "/";
                            }
                        }

                        var thisDay = new Date(date + " 00:00:00");
                        var weekday = new Array(7);
                        weekday[0]=  "Sunday";
                        weekday[1] = "Monday";
                        weekday[2] = "Tuesday";
                        weekday[3] = "Wednesday";
                        weekday[4] = "Thursday";
                        weekday[5] = "Friday";
                        weekday[6] = "Saturday";
                        var n = weekday[thisDay.getDay()];
                        //alert(thisDay.getDay());


                        // Arrange time
                        var startArray = starttime.split(":");
                        var endArray = endtime.split(":");
                        var startT = "";
                        var entT = "";
                        if(startArray[0] > 11){
                            var hr = "";
                            if(startArray[0]>12) {
                                 hr = startArray[0] - 12;
                            }else{
                                hr = startArray[0];
                            }
                            startT = hr + ":" + startArray[1] + " PM";
                        }else{
                            startT = startArray[0] + ":" + startArray[1] + " AM";
                        }

                        if(endArray[0] > 11){
                            var hr = "";
                            if(endArray[0]>12) {
                                hr = endArray[0] - 12;
                            }else{
                                hr = endArray[0];
                            }
                            entT = hr + ":" + endArray[1] + " PM";
                        }else{
                            entT = endArray[0] + ":" + endArray[1] + " AM";
                        }

                        if(row == 0) {
                            datesattended = datesattended +
                                "--&nbsp;&nbsp;" + fName + "&nbsp;" + lName + "<br>";
                        }
                        datesattended = datesattended +
                                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (row + 1) + ")&nbsp;" + n + "(" + showDate + ")" +"&nbsp;-&nbsp;" + startT + "&nbsp;to&nbsp;" + entT + "<br>";
                        /*if (data == "1") {
                         alert("Upasthiti submitted successfully");
                         } else if (data == "0") {
                         alert("Please try again, upasthiti not submitted");
                         }*/
                    }
                }
            });
            datesattended = datesattended + "<br>";
        }
    }
    if(updated == 0){
        datesattended = "<section class='loginformprofile cf'><br>" + "NO UPASTHITI SUBMITTED FOR THIS MONTH";
    }
    datesattended = datesattended + "</section>";
        $("#attended").html(datesattended);

});
