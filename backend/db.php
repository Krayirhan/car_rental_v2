<?php
$host     = "localhost";
$dbname   = "car_rental";
$username = "root";      // XAMPP varsayılan
$password = "";          // şifresiz

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4",
                   $username, $password,
                   [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    exit("DB bağlantı hatası: " . $e->getMessage());
}
?>
