<?php
$host = "127.0.0.1";
$user = "root";
$pass = "";
$db = "amt_careers";

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    echo "Database '$db' created successfully.\n";
} catch (PDOException $e) {
    die("Error: " . $e->getMessage() . "\n");
}
