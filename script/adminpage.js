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





    $("#date_submit").on('click', function(){
       //alert("hello");
        var single_date=$("#date").val();
        var start_date=$("#sdate").val();
        var end_date=$("#edate").val();

        //alert(single_date + " " + start_date + " " + end_date);

        if(start_date.length != 0 && end_date.length != 0){
            $.ajax({
                type: "POST",
                url: "../fetchresults.php",
                data: {start_day: start_date, end_day: end_date},
                success: function(data){
                    // Print this data
                    alert(data);
                }
            });
        }else if(single_date.length != 0){
            $.ajax({
                type: "POST",
                url: "../fetchresults.php",
                data: {day: single_date},
                success: function(data){
                    // Print this data
                    alert("Hello");
                }
            });
        }else{
            alert("Please select a single day or date range")
        }
    });

});
