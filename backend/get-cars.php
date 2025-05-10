<?php
require __DIR__ . '/db.php';
header('Content-Type: application/json');

// ID varsa sadece tek araç dön, yoksa tüm araçları listele
if (isset($_GET['id'])) {
  $id = intval($_GET['id']);
  if ($id <= 0) {
    echo json_encode(["ok" => false, "msg" => "Geçersiz ID"]);
    exit;
  }

  $stmt = $pdo->prepare("SELECT * FROM cars WHERE id = ?");
  $stmt->execute([$id]);
  $car = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$car) {
    echo json_encode(["ok" => false, "msg" => "Araç bulunamadı."]);
  } else {
    echo json_encode(["ok" => true, "car" => $car], JSON_UNESCAPED_UNICODE);
  }
} else {
  // ID parametresi yoksa tüm araçları döndür
  try {
    $stmt = $pdo->query("SELECT * FROM cars ORDER BY id DESC");
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cars, JSON_UNESCAPED_UNICODE);
  } catch (PDOException $e) {
    echo json_encode(["ok" => false, "msg" => "Veritabanı hatası: " . $e->getMessage()]);
  }
}
