<?php
/**
 * This example shows making an SMTP connection with authentication.
 */
// $email and $message are the data that is being
// posted to this page from our html contact form
$name = $_REQUEST['name'];
$email = $_REQUEST['email'] ;
$message = $_REQUEST['message'] ;
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require '/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "smtp.specttra.com.br";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "admin@specttra.com.br";
//Password to use for SMTP authentication
$mail->Password = "Specttra@2017";
//Set who the message is to be sent from
$mail->setFrom('admin@specttra.com.br', 'Website');
//Set an alternative reply-to address
$mail->addReplyTo($email, '');
//Set who the message is to be sent to
$mail->addAddress('admin@specttra.com.br', 'Contato Specttra');
//Set the subject line
$mail->Subject = 'Contato Website';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $message is the user's message they typed in
// on our contact us page. We set this variable at
// the top of this page with:
// $message = $_REQUEST['message'] ;
$mail->Body = "Nome    : {$name}<br />Email   : {$email}<br />Mensagem : {$message}";
//Replace the plain text body with one created manually
$mail->AltBody = "Nome    : {$name}<br />Email   : {$email}<br />Mensagem : {$message}";
//Attach an image file
$mail->addAttachment('');

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
	header("Location: http://www.specttra.com.br/thanks.html"); /* Redirect browser */
}