<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=amt_careers', 'root', '');
    echo "Success\n";
} catch (PDOException $e) {
    echo $e->getMessage() . "\n";
}
