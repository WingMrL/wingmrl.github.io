<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-25 20:51:30
 * @version $Id$
 */
?>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Test</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
</head>
<body>
	<?php
	$id = $_POST["id"];
	$password = $_POST["password"];
	echo "你的帐号是：".$id;
	echo "<br />";
	echo "你的密码是：".$password;
	echo "<br />";
	echo "这样，我就拿到你的帐号和密码了！！！！";
	echo "<br />";
	echo "注意真假网站，保障上网安全";
	error_log("id：".$id);
	error_log("password：".$password);
	?>
</body>
</html>