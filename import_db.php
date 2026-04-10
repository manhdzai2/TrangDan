<?php
$host = "127.0.0.1";
$user = "root";
$pass = "";
$db = "amt_careers";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = file_get_contents("database.sql");
    
    // Remove comments
    $sql = preg_replace('/--.*$/m', '', $sql);
    
    // Split by semicolon (naive split, but might work for this simple SQL)
    $queries = explode(";", $sql);
    
    foreach ($queries as $query) {
        $query = trim($query);
        if (!empty($query)) {
            $pdo->exec($query);
        }
    }
    
    echo "Database imported successfully.\n";
} catch (PDOException $e) {
    die("Error: " . $e->getMessage() . "\n");
}
