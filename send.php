<?php

$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$userComment = $_POST['userComment'];

var_dump('<pre>'.$_COOKIE.'</pre>', true);

// Load Composer's autoloader
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'fat.semga@gmail.com';                     // SMTP username
    $mail->Password   = 'megaALEX42';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to
    $mail->CharSet    = 'UTF-8';

    //Recipients
    $mail->setFrom('fat.semga@gmail.com');
    $mail->addAddress('feng-shui-kemerovo@mail.ru');     // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = "Имя заказчика: {$userName}, его телефон: {$userPhone}, комментарий: {$userComment}, заказ {$_COOKIE}";

    $mail->send();
    // header('Location: sanks.html');
} catch (Exception $e) {
    echo "Заказ не отправлен, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}