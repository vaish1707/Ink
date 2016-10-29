<?php

$toAddress = $_POST['toAddress'];

$subject = "Sensem Colours";


$message = "<div><b><p>Hi,</p><br/>" .
"Please find the estimate details below</b></div>" .
$_POST['content']; 

$message .="<b><p>Thankyou,<br>Sensemcolours</p></b>";
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <ink@sensemcolours.com>' . "\r\n";
//$headers .= 'Cc: abirami.vaishnavi@gmail.com' . "\r\n";


mail($toAddress,$subject,$message,$headers);
echo "Mail Sent";


?>


