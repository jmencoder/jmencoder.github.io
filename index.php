<?php
require 'vendor/autoload.php';

use Carbon\Carbon;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
</head>
<body>
    Hola!
    <?=Carbon::now();?>
</body>
</html>