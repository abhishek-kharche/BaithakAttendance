<?php
    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbname = "ATTENDANCE";
    //var_dump($_POST);

    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    //$sql = "SELECT username, password FROM Authentication";
    $sql = ("SELECT username, password FROM Authentication WHERE username = '" . mysql_real_escape_string
    ($_POST['usermail']) . "';");
    $result = $conn->query($sql);

    while($row = $result->fetch_assoc()) {
           // echo "username is: " . $row["username"]. " "."password is " . $row["password"].
            // "<br>";
             //echo $result->num_rows;
        }

    if ($result->num_rows == 0){
       // echo "
        //You typed invalid email address, please try again.";
        header("Location: index.html"); /* Redirect browser */
        exit();
    } else {
        if($result->num_rows > 1){
        // HANDLE ERROR
        } else {
            if ($row["password"] == $POST["password"]){
            //echo "
              //  Welcome now you can submit your attendance.";
                header("Location: profile.html"); /* Redirect browser */
                exit();
            }
            else {

                header("Location: index.html"); /* Redirect browser */
                exit();
                //echo "
                //INCORRECT Password
                //";
            }
        }
    }
    //if ($result->num_rows > 0) {
        // output data of each row
      //  while($row = $result->fetch_assoc()) {
            //echo "username: " . $row["username"]. " "."password " . $row["password"].
             //"<br>";
       // }
    //} else {
       // echo "0 results";
    //}
    $conn->close();
?>