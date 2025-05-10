<?php
require 'db.php';
header('Content-Type: application/json; charset=utf-8');

$stmt = $pdo->query("
  SELECT cities.id, cities.name, COUNT(cars.id) AS total_cars
  FROM cities
  LEFT JOIN cars ON cars.city_id = cities.id
  GROUP BY cities.id
");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
