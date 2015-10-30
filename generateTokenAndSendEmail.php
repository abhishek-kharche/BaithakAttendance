<?php
@session_start();
if(!isset($_POST['email'])) {
    header("location:index.php");
}
$_SESSION = array();
require_once('forgotAuth.php');
$authObject = new forgotAuth();
//echo "Hello";

$email = $_POST['email'];
$response = "1";
//echo $response;
//echo "Hello";
$checkEmail = $authObject->checkEmail($email);
$rows = mysql_fetch_assoc($checkEmail);
//echo $rows['result'];

if($rows['result'] == 1){
    $_SESSION["user_id"] = $rows['user_id'];
    $generateToken = $authObject->generateToken($email);
    $result = mysql_fetch_assoc($generateToken);
    $token = $result['token'];
    $_SESSION["token"] = $result['token'];
    $_SESSION["email"] = $email;
    //echo $token;
    // Send email

    require 'PHPMailer/PHPMailerAutoload.php';
    $mail = new PHPMailer;
    $mail->isSMTP();                                      // Set mailer to use SMTP
    //$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'sample.sample.abhi@gmail.com';                 // SMTP username
    $mail->Password = 'sample123';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->SMTPDebug = 0;

    $mail->setFrom('sample.sample.abhi@gmail.com', 'abhishek kharche');
    $mail->addAddress($email, 'Abhishek Kharche');     // Add a recipient

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Reset Password : Token';
    $mail->Body    = 'Hello,' . '<br><br>' . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please use <b>' . $token . '</b> to reset password.' . '<br>' . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For any questions, please contact vinaygawand@yahoo.com or mpevekar@hotmail.com.' . '<br><br>' . 'Jai Sadguru.';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if($mail->send()) {
        $response = "0";
        //$response = "uid = " . $_SESSION["user_id"] . " token = " . $_SESSION["token"] . " email = " . $_SESSION["email"];
    }
}

echo $response;
?>