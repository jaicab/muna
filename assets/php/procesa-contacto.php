<?php
if(isset($_POST['your-email'])) {

$email_to = "reservas@restaurantemuna.com";
$email_subject = "Contacto MU-NA";


if(!isset($_POST['name']) ||
!isset($_POST['email']) ||
!isset($_POST['phone']) ||
!isset($_POST['subject']) ||
!isset($_POST['address']) ||
!isset($_POST['message'])) {

?>
<script type="text/javascript">
alert("Ocurrió un error y el formulario no ha sido enviado. Por favor, revisa los datos y vuelve a intentarlo más tarde.");
</script>
<?php
/*echo "<b>Ocurrió un error y el formulario no ha sido enviado. </b><br />";
echo "Por favor, vuelva atrás y verifique la información ingresada<br />";
die();*/
}

$email_message = "Detalles del formulario de contacto:\n\n";
$email_message .= "Nombre: " . $_POST['name'] . "\n";
$email_message .= "Email: " . $_POST['email'] . "\n";
$email_message .= "Teléfono: " . $_POST['phone'] . "\n";
$email_message .= "Dirección: " . $_POST['address'] . "\n";
$email_message .= "Asunto: " . $_POST['subject'] . "\n";
$email_message .= "Mensaje: " . $_POST['message'] . "\n\n";


$headers = 'From: '.$email_to."\r\n".
'Reply-To: '.$email_to."\r\n" .
'X-Mailer: PHP/' . phpversion();

if (mail($email_to, $email_subject, $email_message, $headers)){
?>
<script type="text/javascript">
alert("¡El formulario se ha enviado con éxito!. Gracias por ponerse en contacto con nosotros, en breve recibirá un correo contestándole a todas sus dudas o preguntas.");
window.location.href = "http://www.restaurantemuna.com/";
</script>
<?php
} else {
	//header("Location: http://www.restaurantemuna.com/");
	?>
<script type="text/javascript">
alert("Ocurrió un error y el formulario no ha sido enviado. Por favor, revisa los datos y vuelve a intentarlo más tarde.");
window.location.href = "http://www.restaurantemuna.com/";
</script>
<?php
}

}
?>