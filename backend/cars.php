<?php
// backend/cars.php
require __DIR__ . '/db.php';
header('Content-Type: application/json');

$cars = $pdo->query("SELECT * FROM cars ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($cars);
  