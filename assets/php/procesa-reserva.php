<?php
if(isset($_POST['your-email'])) {

$email_to = "reservas@restaurantemuna.com";
$email_subject = "Contacto MU-NA";


if(!isset($_POST['nombre']) ||
!isset($_POST['email']) ||
!isset($_POST['phone']) ||
!isset($_POST['comensales']) ||
!isset($_POST['date']) ||
!isset($_POST['time']) ||
!isset($_POST['mensaje'])) {

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
$email_message .= "Nombre: " . $_POST['nombre'] . "\n";
$email_message .= "Email: " . $_POST['email'] . "\n";
$email_message .= "Teléfono: " . $_POST['phone'] . "\n";
$email_message .= "Comensales: " . $_POST['comensales'] . "\n";
$email_message .= "Calendario: " . $_POST['date'] . "\n";
$email_message .= "Hora: " . $_POST['time'] . "\n";
$email_message .= "Mensaje: " . $_POST['mensaje'] . "\n\n";


$headers = 'From: '.$email_to."\r\n".
'Reply-To: '.$email_to."\r\n" .
'X-Mailer: PHP/' . phpversion();

if (mail($email_to, $email_subject, $email_message, $headers)){
?>
<script type="text/javascript">
alert("¡El formulario se ha enviado con éxito!. Gracias por ponerse en contacto con nosotros, en breve recibirá un correo confirmando la reserva.");
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