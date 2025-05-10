<?php
require '../db.php';

$name = $_POST['name'];
$price = $_POST['price'];
$year = $_POST['year'];
$description = $_POST['description'];

$stmt = $pdo->prepare("INSERT INTO cars (name, price, year, description) VALUES (?, ?, ?, ?)");
$stmt->execute([$name, $price, $year, $description]);

header("Location: ../../dashboard/admin.html");
?>
