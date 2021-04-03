<?php parse_str(implode('&', array_slice($argv, 1)), $_GET); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title></title>
</head>
<body>
  <?php
    $myvar = 'This is a cool variable!';
    echo "Yeah! $myvar ";
    echo $_GET['a'];
    echo($_GET['b']);
  ?>
</body>
</html>
