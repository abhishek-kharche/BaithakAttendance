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


$(document).ready(function(){

    startTime();

    $("#adddelete").hide();


    $("#date_submit").on('click', function(){
       //alert("hello");
        var single_date="single_date="+$("#date").val();
        var start_date=$("#sdate").val();
        var end_date=$("#edate").val();
        var date_range = "start_date="+start_date+"&end_date="+end_date;

        if(start_date.length != 0 && end_date.length != 0){
            $.ajax({
                type: "POST",
                url: "http://localhost:3003/my_project/fetchresults.php",
                data: date_range,
                success: function(data){
                    $('#columns').columns({data:JSON.parse(data)});
                }
            });

        }else if(single_date.length != 0){
            $.ajax({
                type: "POST",
                url: "http://localhost:3003/my_project/fetchresults.php",
                data: single_date,
                success: function(data){
                    $('#columns').columns({data:JSON.parse(data)});
                }
            });
        }else{
            alert("Please select a single day or date range")
        }
    });
    $("#show_all").on('click', function(){
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/fetchall.php",
            success: function(data){
                //alert(data);
                $('#columns').columns({data:JSON.parse(data)});
            }
        });
    });
    $("#add_entry").on('click', function(){
        window.location.href='addentry.php';
    });
    $("#edit_days").on('click', function(){
        $("#adddelete").show();
        //Left
        var addNewhtml = "";
        addNewhtml = addNewhtml + "<br>";
        addNewhtml = addNewhtml + "Select date to add <br><br>";
        addNewhtml = addNewhtml + "<input type='date' id='addedDate'><br><br>";
        //addNewhtml = addNewhtml + "Date: <input type='text' id='datepicker'>";
        addNewhtml = addNewhtml + "<button onclick='myAddFunction()'>Add New Baithak Date</button>";
        //$( "#datepicker" ).datepicker();
        $("#addNew").html(addNewhtml);

        // Right
        var date = new Date();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        //alert(lastDay);
        var sundays = new Array();
        for(var i=1; i<= lastDay.getDate(); i++){
            var year = lastDay.getYear() + 1900;
            var thisDate = new Date(year, lastDay.getMonth(), i);
            if(thisDate.getDay() === 0){
                var dt = "";
                if(i<10){
                    dt = "0" + i.toString();
                }else{
                    dt = i.toString();
                }
                sundays.push(year + "-" + (lastDay.getMonth() + 1) + "-" + dt);
            }
        }
        //alert(sundays);
        var dayhtml = "<br>";
        //dayhtml = dayhtml + "<button id='addnew'>Add New Baithak Date</button><br><div id='addDate'></div><br>";
        dayhtml = dayhtml + "Baithak this month<br><br>";

        var days = "days=" + sundays;
        var allDays = new Array();
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/getValidDays.php",
            async: false,
            data: days,
            success: function (data) {
                //alert(data);
                var resultArray = JSON.parse(data);
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
                    dayhtml = dayhtml +
                        "<input type='radio' name='delete_date' value='" + result + "'>" + n + " ("  + showDate + ")" +
                        "&nbsp;&nbsp;";
                }
            }
        });
        dayhtml = dayhtml + "<br><br><button onclick='myDeleteFunction()'>Delete Baithak Date</button>";
        $("#monthdays").html(dayhtml);
    });
    //alert("hi");
});

function myAddFunction(){
    //alert("Hello");
    var newDate = $("#addedDate").val();
    if(!newDate){
        alert("Please provide the date to be added");
        return;
    }
    var adddate = "newDate=" + newDate;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/addNewDate.php",
        async: false,
        data: adddate,
        success: function (data) {
            alert(data);
            $("#adddelete").hide();
            /*if(data == "1"){
             alert("New date added successfully");
             }else if(data == "0"){
             alert("Please try again");
             }*/
        }
    });
}

function myDeleteFunction(){
    var deleteDate = $( "input:radio[name=delete_date]:checked" ).val();
    //alert(deleteDate);
    if(!deleteDate){
        alert("Please provide the date to be deleted");
        return;
    }
    var deletedata = "deleteDate=" + deleteDate;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/deleteDate.php",
        async: false,
        data: deletedata,
        success: function (data) {
            alert(data);
            $("#adddelete").hide();
            /*if(data == "1"){
                alert("New date added successfully");
            }else if(data == "0"){
                alert("Please try again");
            }*/
        }
    });
}
