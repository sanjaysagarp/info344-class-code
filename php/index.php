<?php
$url = parse_url($_SERVER['REQUEST_URI']);
$name = substr($url['path'], 1);
if (strlen($name) == 0) {
<<<<<<< HEAD
	$name = 'World';
=======
    $name = 'World';
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<<<<<<< HEAD
	<meta charset="UTF-8">
	<title>Hello <?= htmlentities($name)?></title>
</head>
<body>
	<h1>Hello <?= htmlentities($name) ?>!</h1>

</body>
</html>

=======
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Hello <?= htmlentities($name) ?></title>
</head>
<body>
    <h1>Hello <?= htmlentities($name) ?>!</h1>
    
</body>
</html>
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
