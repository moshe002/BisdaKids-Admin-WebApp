<?php

header('Access-Control-Allow-Origin: *');

$databaseHost = '127.0.0.1';// localhost
$databaseName = 'caregraver'; //  db_name
$databaseUsername = 'root'; // root by default for localhost 
$databasePassword = '';  // by defualt empty for localhost

$conn = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

?>