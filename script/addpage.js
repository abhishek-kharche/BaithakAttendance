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
    /*
    $("#show_all").on('click', function(){
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/fetchall.php",
            success: function(data){
                //alert(data);
                $('#columns').columns({data:JSON.parse(data)});
            }
        });
    });*/

    $('input[type="radio"]').on('click', function(){
        if ($(this).is(':checked'))
        {
            var operation = $(this).val();
            if(operation === "add"){
                $('#return_result_div').hide();
                var htmlString = "";
                htmlString = "<hr>" +
                    "<b>Please enter following details for new user</b><br>" +
                    "Name : <input type='text' id='firstName' placeholder='First Name'>" +
                    "<input type='text' id='middleName' placeholder='Middle Name'>" +
                    "<input type='text' id='lastName' placeholder='Last Name'><br>" +
                    "Address : <input type='text' id='city' placeholder='City'>" +
                    "<input type='text' id='state' placeholder='State'>" +
                    "<input type='text' id='country' placeholder='Country'><br>" +
                    "Authentication : <input type='text' id='emailId' placeholder='Email Id'>" +
                    "<input type='text' id='passWord' placeholder='Password'>" +
                    "<input type='text' id='userType' placeholder='Admin/User?'><br>" +
                    "<button onclick='myAddUserFunction()'>Add</button><br>"
                $('#operation_div').html(htmlString);
            }else if(operation === "add_relation"){
                $('#return_result_div').hide();
                var htmlString = "";
                htmlString = "<hr>" +
                    "Who's relation you want to add?<br>" +
                    "<input type='text' id='relationFirstName' placeholder='First Name'>" +
                    "<input type='text' id='relationLastName' placeholder='Last Name'>" +
                    //"<input type='button' value='Find' id='relationFindSubmit'>"+
                    "<button onclick='myRelationFunction()'>Find</button><br>" +
                    "<br><div class='boxed' id='find_div'></div>";

                $('#operation_div').html(htmlString);

            }else if(operation === "edit"){
                $('#return_result_div').hide();
                var htmlString = "";
                htmlString = "<hr>" +
                    "Who you want to edit?<br>" +
                    "<input type='text' id='editFirstName' placeholder='First Name'>" +
                    "<input type='text' id='editLastName' placeholder='Last Name'>" +
                    //"<input type='button' value='Find' id='relationFindSubmit'>"+
                    "<button onclick='myEditFunction()'>Find</button><br>" +
                    "<br><div class='boxed' id='edit_div'></div>";
                $('#operation_div').html(htmlString);
            }else if(operation === "delete"){
                $('#return_result_div').hide();
                var htmlString = "";
                htmlString = "<hr>" +
                    "Who you want to delete?<br>" +
                    "<input type='text' id='deleteFirstName' placeholder='First Name'>" +
                    "<input type='text' id='deleteLastName' placeholder='Last Name'>" +
                        //"<input type='button' value='Find' id='relationFindSubmit'>"+
                    "<button onclick='myDeleteFunction()'>Find</button><br>" +
                    "<br><div class='boxed' id='delete_div'></div>";
                $('#operation_div').html(htmlString);
            }
        }
    });
});



// ADD USER
function myAddUserFunction(){
    var first_name = $("#firstName").val();
    var middle_name = $("#middleName").val();
    var last_name = $("#lastName").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();
    var email = $("#emailId").val();
    var pwd = $("#passWord").val();

    // Handle mandatory parameters
    if(first_name.length == 0){
        alert("Please provide First Name");
        return;
    }
    if(last_name.length == 0){
        alert("Please provide Last Name");
        return;
    }
    if(email.length == 0){
        alert("Please provide E-Mail Id");
        return;
    }
    if(email.indexOf("@") == -1){
        alert("Please provide valid E-Mail Id");
        return;
    }
    first_name = "first_name="+first_name;
    middle_name = "middle_name="+middle_name;
    last_name = "last_name="+last_name;
    city = "city="+city;
    state = "state="+state;
    country = "country="+country;
    email = "emailId="+email;
    pwd = "passWord="+pwd;
    typeProvided = $("#userType").val();
    var type = "0";
    if(typeProvided.length > 0){
        if(typeProvided.toLowerCase() === "admin") {
            typeProvided = "1";
            type = "userType="+typeProvided;
        }else if(typeProvided.toLowerCase() === "user"){
            typeProvided = "0";
            type = "userType="+typeProvided;
        }else if(typeProvided === "1" || typeProvided === "0") {
            type = "userType=" + typeProvided;
        }else{
            alert("Invalid user type provided. Valid values are; {admin, user}")
            return;
        }
    }else{
        type = "userType="+type;
    }

    /*if(typeProvided.length > 0){
        if(typeProvided.toLowerCase() === "admin") {
            typeProvided = "1";
        }else if(typeProvided.toLowerCase() === "user"){
            typeProvided = "0";
        }else if(typeProvided === "1" || typeProvided === "0") {
            type = "userType=" + typeProvided;
        }else{
            alert("Invalid user type provided. Valid values are; {admin, user}")
        }
    }else{
        type = "userType=" + type;
    }*/

    var user = first_name + "&" + middle_name + "&" + last_name + "&" + city + "&" + state + "&" + country + "&" + email + "&" + pwd + "&" + type;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/add_user.php",
        async: false,
        data: user,
        success: function(data){
            //alert(data);
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            var fName = result.first_name;
            var mName = result.middle_name;
            var lName = result.last_name;
            var city = result.city;
            var state = result.state;
            var country = result.country;
            var email = result.username;
            var password = result.password;
            var type = result.user_type;
            //var htmlresult = "SUCCESSFULLY ADDED A USER"
            var htmlresult = "<hr><br>" +
                "SUCCESSFULLY ADDED A USER WITH FOLLOWING DETAILS" +
                "<br><b>Name</b> : " + fName + " " + mName + " " + lName + "<br>" +
                "<b>Address</b> : " + city + " " + state + " " + country +  "<br>" +
                "<b>User Name</b> : " + email + " <b>Password</b> : " + password + " <b>User Type</b> : " + type;
            $('#return_result_div').html(htmlresult);
            $('#return_result_div').show();
            // alert if added successfully
        }
    });
}



// ADD RELATION
var user_id = "";
var parentFName = "";
var parentLName = "";
function myRelationFunction(){
    //alert("hello");
    var first_name = "first_name="+$("#relationFirstName").val();
    var last_name = "last_name="+$("#relationLastName").val();
    var name = first_name + "&" + last_name;
    var isValid = "0";
    //alert(name);  //SUCCESSFUL
    htmlString = "<b>Shree Sadasya Details</b><br>";
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/find_user.php",
        async: false,
        data: name,
        success: function(data){
            //alert(data);   //SUCCESSFUL
            // HANDLE THE CASE WHEN 2 or more RESULTS ARE RETURNED...                   <------
            // HANDLE IF NO USER FOUND
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            var fName = result.first_name;
            parentFName = fName;
            var lName = result.last_name;
            parentLName = lName;
            var city = result.city;
            var state = result.state;
            var country = result.country;
            user_id=result.user_id;
            var relation = result.relation;
            if(relation){
                alert("This is not a primary user, cannot add relation");
            }else {
                isValid = "1";
                htmlString = htmlString +
                    "<b>Name</b> : " + fName + " " + lName +
                    "<br>" +
                    "<b>Address</b> : " + city + ", " + state + ", " + country + "." +
                    "<br>";
            }
        }
    });
    //alert(htmlString);
    if(isValid == "1") {
        htmlString = htmlString +
            "<hr><b>Add Relation Information</b><br>" +
            "<input type='text' id='relFirst' placeholder='First Name'>" +
            "<input type='text' id='relMiddle' placeholder='Middle Name'>" +
            "<input type='text' id='relLast' placeholder='Last Name'>" +
            "<input type='text' id='relRel' placeholder='Relation'><br>" +
            "<button onclick='myAddFunction()'>Add</button>";
        $('#find_div').html(htmlString);
    }
}

function myAddFunction(){
    var first_name = $("#relFirst").val();
    var middle_name = $("#relMiddle").val();
    var last_name = $("#relLast").val();
    var relation = $("#relRel").val();

    //Handle checks
    if(first_name.length == 0){
        alert("Please provide First Name");
        return;
    }
    if(last_name.length == 0){
        alert("Please provide Last Name");
        return;
    }
    if(relation.length == 0){
        alert("Please provide relation of new user with " + parentFName + " " + parentLName);
        return;
    }

    first_name = "first_name="+first_name;
    middle_name = "middle_name="+middle_name;
    last_name = "last_name="+last_name;
    relation = "relation="+relation;
    var uid = "user_id="+user_id;
    var relationData = first_name + "&" + middle_name + "&" + last_name + "&" + relation + "&" + uid;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/add_relation.php",
        async: false,
        data: relationData,
        success: function(data){
            //alert(data);
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            var fName = result.first_name;
            var mName = result.middle_name;
            var lName = result.last_name;
            var relation = result.relation;
            var htmlresult = "<hr><br>" +
                "SUCCESSFULLY ADDED A Relation OF '" + parentFName.toUpperCase() + " " + parentLName.toLocaleUpperCase() + "' WITH FOLLOWING DETAILS" +
                "<br><b>Name</b> : " + fName + " " + mName + " " + lName + "<br>" +
                "<b>Relation</b> : " + relation;
            $('#return_result_div').html(htmlresult);
            $('#return_result_div').show();
            // alert if added successfully
        }
    });
}

// UPDATE USER
var oldFirstName = "";
var oldLastName = "";
var oldMiddlename = "";
var oldCity = "";
var oldState = "";
var oldCountry = "";
var oldEmail = "";
var oldType = "";
var oldRelation = "";
var isRel = "0";
function myEditFunction(){
    //alert("hello");
    var first_name = "first_name="+$("#editFirstName").val();
    var last_name = "last_name="+$("#editLastName").val();
    var name = first_name + "&" + last_name;
    var htmlString = "";
    htmlString = "<b>Shree Sadasya Current Details</b><br>";
    var relation = "";
    //alert(name); //SUCCESSFUL
    // FIRST SEARCH IN USER DETAILS AND IF NOT PRESENT THEN IN RELATIONS TABLE
    var fName = "";
    var mname = "";
    var lName = "";
    var city = "";
    var state = "";
    var country = "";
    var email = "";
    var type = "";
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/find_user.php",
        async: false,
        data: name,
        success: function(data){
            //alert(data); //SUCCESSFUL
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            fName = result.first_name;
            oldFirstName = fName;
            mname = result.middle_name;
            oldMiddlename = mname;
            lName = result.last_name;
            oldLastName = lName;
            city = result.city;
            oldCity = city;
            state = result.state;
            oldState = state;
            country = result.country;
            oldCountry = country;
            email = result.username;
            oldEmail = email;
            type = result.user_type;
            if(type === "0"){
                type = "User"
            }else if(type === "1"){
                type = "Admin"
            }
            oldType = type;
            relation = result.relation;
            oldRelation = relation;
            user_id = result.user_id;
            htmlString = htmlString +
                "<b>Name</b> : " + fName + " " + mname + " "+ lName +
                "<br>";
            if(!relation) {
                htmlString = htmlString +
                "<b>Address</b> : " + city + ", " + state + ", " + country + "." +
                "<br>" +
                "<b>Username</b> : " + email +
                "<br>";
            }
            if(relation){
                htmlString = htmlString +
                        "<b>Parent Address</b> : " + city + ", " + state + ", " + country + "." +
                        "<br>" +
                        "<b>Relation</b> : " + relation +
                        "<br>";
            }
        }
    });
    htmlString = htmlString + "<hr><b>Edit information</b><br>";
    if(!relation) {
        //var stateArray = state.split(" ");
        htmlString = htmlString +
            "Name <input type='text' id='updatefirstName' placeholder="+ mySpaceFunction(fName) +">" +
            "<input type='text' id='updatemiddleName' placeholder="+ mySpaceFunction(mname) +">" +
            "<input type='text' id='updatelastName' placeholder=" + mySpaceFunction(lName) +"><br>" +
            "Address<input type='text' id='updatecity' placeholder=" + mySpaceFunction(city) + ">" +
            "<input type='text' id='updatestate' placeholder=" + mySpaceFunction(state) + ">" +
            "<input type='text' id='updatecountry' placeholder=" +mySpaceFunction(country)+ "><br>" +
            "Authentication<input type='text' id='updateemailId' placeholder="+email+">" +
            "<input type='text' id='updatepassWord' placeholder='Password'>" +
            "<input type='text' id='updateuserType' placeholder="+type+"><br>";
    }else{
        isRel = "1";
        htmlString = htmlString +
            "<input type='text' id='updatefirstName' placeholder='First Name'>" +
            "<input type='text' id='updatemiddleName' placeholder='Middle Name'>" +
            "<input type='text' id='updatelastName' placeholder='Last Name'>" +
            "<input type='text' id='updaterelation' placeholder='Relation'>";
    }
    htmlString = htmlString +
        "<br><button onclick='myUpdateFunction()'>Update</button>";
    $('#edit_div').html(htmlString);
}

function myUpdateFunction(){
    var first_name = $("#updatefirstName").val();
    var middle_name = $("#updatemiddleName").val();
    var last_name = $("#updatelastName").val();
    var cityProvided = $("#updatecity").val();

    //Handle checks
    if(first_name.length == 0){
        first_name = oldFirstName;
    }
    if(middle_name.length == 0){
        middle_name = oldMiddlename;
    }
    if(last_name.length == 0){
        last_name = oldLastName;
    }
    //alert(first_name + " " + middle_name + " " +last_name);
    //return;
    var first_name = "first_name="+first_name;
    var middle_name = "middle_name="+middle_name;
    var last_name = "last_name="+last_name;

    var city = "";
    var state = "";
    var country = "";
    var email = "";
    var pwd = "";
    var type = "0";
    var relation = "";
    var updateData = "";
    if(isRel == "0") {
        // Handle Checks
        if(cityProvided.length == 0){
            cityProvided = oldCity;
        }
        var stateProvided = $("#updatestate").val();
        var countryProvided = $("#updatecountry").val();
        var emailProvided = $("#updateemailId").val();
        var passwordProvided = $("#updatepassWord").val();
        var typeProvided = $("#updateuserType").val();

        //Handle Checks
        if(stateProvided.length == 0){
            stateProvided = oldState;
        }
        if(countryProvided.length == 0){
            countryProvided = oldCountry;
        }
        if(emailProvided.length == 0){
            emailProvided = oldEmail;
        }
        if(passwordProvided.length == 0){
            passwordProvided = "";
        }
        //alert(stateProvided + " " + countryProvided + " " +emailProvided + " " + passwordProvided);
        //return;
        city = "city="+cityProvided;
        state = "state=" + stateProvided;
        country = "country=" + countryProvided;
        email = "emailId=" + emailProvided;
        pwd = "passWord=" + passwordProvided;

        if(typeProvided){
            if(typeProvided.toLowerCase() === "admin") {
                typeProvided = "1";
                type = "userType=" + typeProvided;
            }else if(typeProvided.toLowerCase() === "user"){
                typeProvided = "0";
                type = "userType=" + typeProvided;
            }else if(typeProvided === "1" || typeProvided === "0") {
                type = "userType=" + typeProvided;
            }else{
                alert("Invalid user type provided. Valid values are; {admin, user}");
                return;
            }
        }else{
            type = "userType=" + type;
        }

        updateData = first_name + "&" + middle_name + "&" + last_name + "&" + city + "&" + state + "&" + country + "&" + email + "&" + pwd + "&" + type + "&" + "isRel=" + isRel + "&" + "user_id=" + user_id;
    }else if(isRel == "1"){
        //isRel = "1";
        var relationProvided = $("#updaterelation").val();
        if(relationProvided.length == 0){
            relationProvided = oldRelation.split(" ")[0];
            //relationProvided = oldRelation;
        }
        relation = "relation=" + relationProvided;
        updateData = first_name + "&" + middle_name + "&" + last_name + "&" + relation + "&" + "isRel=" + isRel + "&" + "user_id=" + user_id;
    }
    //alert("update data " + updateData);
    //return;
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/update_user.php",
        async: false,
        data: updateData,
        success: function(data){
            //alert(data)
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            var fName = result.first_name;
            var mName = result.middle_name;
            var lName = result.last_name;
            if(isRel === "0"){
                // This is a user
                var city = result.city;
                var state = result.state;
                var country = result.country;
                var email = result.username;
                var password = result.password;
                var type = result.user_type;
                //var htmlresult = "SUCCESSFULLY ADDED A USER"
                var htmlresult = "<hr><br>" +
                    "SUCCESSFULLY EDITED '" +oldFirstName +" "+ oldLastName +"' WITH FOLLOWING DETAILS" +
                    "<br><b>Name</b> : " + fName + " " + mName + " " + lName + "<br>" +
                    "<b>Address</b> : " + city + " " + state + " " + country +  "<br>" +
                    "<b>User Name</b> : " + email + " <b>Password</b> : " + password + " <b>User Type</b> : " + type;
                $('#return_result_div').html(htmlresult);
                $('#return_result_div').show();
            }else if(isRel === "1"){
                // This is a relation
                var relation = result.relation;
                var htmlresult = "<hr><br>" +
                    "SUCCESSFULLY EDITED '" +oldFirstName +" "+ oldLastName +"' WITH FOLLOWING DETAILS" +
                    "<br><b>Name</b> : " + fName + " " + mName + " " + lName + "<br>" +
                    "<b>Relation</b> : " + relation;
                $('#return_result_div').html(htmlresult);
                $('#return_result_div').show();
            }
            // alert if successfully updated.
        }
    });
}

// DELETE
var deleteOldfn = "";
var deleteOldmn = "";
var deleteOldln = "";
var deleteOldcity = "";
var deleteOldstate = "";
var deleteOldcountry = "";
var deleteOldemail = "";
var deleteOldtype = "";
var deleteUid = "";
var isDeleteRel = "0";

function myDeleteFunction(){
    var first_name = "first_name="+$("#deleteFirstName").val();
    var last_name = "last_name="+$("#deleteLastName").val();
    var name = first_name + "&" + last_name;
    var htmlString = "";
    htmlString = "<br><b>Shree Sadasya Current Details</b><br><br>";
    var relation = "";
    //alert(name); //SUCCESSFUL
    // FIRST SEARCH IN USER DETAILS AND IF NOT PRESENT THEN IN RELATIONS TABLE
    var fName = "";
    var mname = "";
    var lName = "";
    var city = "";
    var state = "";
    var country = "";
    var email = "";
    var type = "";
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/my_project/find_user.php",
        async: false,
        data: name,
        success: function(data){
            //alert(data); //SUCCESSFUL
            var resultArray = JSON.parse(data);
            var result = resultArray[0];
            fName = result.first_name;
            deleteOldfn = fName;
            mname = result.middle_name;
            deleteOldmn = mname;
            lName = result.last_name;
            deleteOldln = lName;
            city = result.city;
            deleteOldcity = city;
            state = result.state;
            deleteOldstate = state;
            country = result.country;
            deleteOldcountry = country;
            email = result.username;
            deleteOldemail = email;
            type = result.user_type;
            if(type === "0"){
                type = "User"
            }else if(type === "1"){
                type = "Admin"
            }
            deleteOldtype = type;
            relation = result.relation;
            oldRelation = relation;
            deleteUid = result.user_id;
            //alert(deleteUid);
            htmlString = htmlString +
                "<b>Name</b> : " + fName + " " + mname + " "+ lName +
                "<br>";
            if(!relation) {
                isDeleteRel = "0";
                htmlString = htmlString +
                    "<b>Address</b> : " + city + ", " + state + ", " + country + "." +
                    "<br>" +
                    "<b>Username</b> : " + email +
                    "<br>";
            }
            if(relation){
                isDeleteRel = "1";
                htmlString = htmlString +
                    "<b>Parent Address</b> : " + city + ", " + state + ", " + country + "." +
                    "<br>" +
                    "<b>Relation</b> : " + relation +
                    "<br>";
            }
        }
    });

    htmlString = htmlString +
        "<br><button onclick='deleteUser()'>Delete</button><br>";
    $('#delete_div').html(htmlString);
}

function deleteUser(){
    var deleteData = "user_id=" + deleteUid;
    var htmlresult = "";
    //alert(isDeleteRel + " " + deleteData);
    if(isDeleteRel === "0"){
        var resultArray = new Array();
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/findUserRelation.php",
            async: false,
            data: deleteData,
            success: function (data) {
                resultArray = JSON.parse(data);
            }
        });
        //alert(resultArray[0].first_name + " " + resultArray[0].last_name);
        //alert(resultArray[1].first_name + " " + resultArray[1].last_name);
        //alert(resultArray.length);
        //return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/delete_relation_of_user.php",
            async: false,
            data: deleteData,
            success: function (data) {
                if (resultArray.length > 0) {
                    htmlresult = "<hr><br>" +
                        "SUCCESSFULLY DELETED BELOW CHILDREN OF '" + deleteOldfn + " " + deleteOldln + "'<br>";
                    for (var i = 0; i < resultArray.length; i++) {
                        var child = resultArray[i];
                        var first_name = child.first_name;
                        var last_name = child.last_name;
                        var number = i + 1;
                        htmlresult = htmlresult + number + ") " + first_name + ' ' + last_name + '<br>';
                    }
                    //alert(htmlresult);
                }
            }
        });
        //alert(htmlresult);
        //return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/delete_user.php",
            async: false,
            data: deleteData,
            success: function (data) {
                var resultArray = JSON.parse(data);
                var result = resultArray[0];
                var fName = result.first_name;
                var mname = result.middle_name;
                var lName = result.last_name;
                var city = result.city;
                var state = result.state;
                var country = result.country;
                var email = result.username;
                var type = result.user_type;
                if (type === "0") {
                    type = "User"
                } else if (type === "1") {
                    type = "Admin"
                }
                htmlresult = htmlresult + "<hr><br>" +
                    "SUCCESSFULLY DELETED '" + deleteOldfn + " " + deleteOldln + "' WITH FOLLOWING DETAILS" +
                    "<br><b>Name</b> : " + fName + " " + mname + " " + lName +
                    "<br><b>Address</b> : " + city + " " + state + " " + country +
                    "<br><b>Username</b> : " + email + ", <b>Password</b> : '****' , <b>Type</b> : " + type;
            }
        });
        //alert(htmlresult);
    }else if(isDeleteRel === "1"){
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/my_project/deleteRelation.php",
            async: false,
            data: deleteData,
            success: function (data) {
                //alert(data);
                var resultArray = JSON.parse(data);
                var result = resultArray[0];
                var fName = result.first_name;
                var mname = result.middle_name;
                var lName = result.last_name;
                htmlresult = htmlresult + "<hr><br>" +
                    "SUCCESSFULLY DELETED '" + fName + " " + mname + " " + lName + "'";
            }
        });
    }
    $('#return_result_div').html(htmlresult);
    $('#return_result_div').show();
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

