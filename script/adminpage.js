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

});
