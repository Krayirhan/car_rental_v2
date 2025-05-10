<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require 'db.php';

$user_id = $_SESSION['uid'] ?? 0;
$car_id  = intval($_POST['car_id'] ?? 0);
$start   = $_POST['start'] ?? '';
$end     = $_POST['end'] ?? '';

if(!$user_id){ http_response_code(401); echo json_encode(['ok'=>false,'msg'=>'Oturum açmalısınız.']); exit; }
if(!$car_id || !$start || !$end){ http_response_code(400); echo json_encode(['ok'=>false,'msg'=>'Tüm alanları doldurun.']); exit; }

// Araç fiyatını çek
$stmt = $pdo->prepare("SELECT price FROM cars WHERE id = ?");
$stmt->execute([$car_id]);
$car = $stmt->fetch();

if (!$car) {
  echo json_encode(['ok' => false, 'msg' => 'Araç bulunamadı.']);
  exit;
}

// Gün farkı hesapla
$days = (strtotime($end) - strtotime($start)) / (60 * 60 * 24);
if ($days <= 0) {
  echo json_encode(['ok' => false, 'msg' => 'Geçerli bir tarih aralığı seçin.']);
  exit;
}

$total = $car['price'] * $days;

// Rezervasyon ekle
$stmt = $pdo->prepare("INSERT INTO reservations(user_id, car_id, start_date, end_date, total_price, status)
                       VALUES (?, ?, ?, ?, ?, 'beklemede')");
$stmt->execute([$user_id, $car_id, $start, $end, $total]);

echo json_encode(['ok' => true, 'msg' => 'Rezervasyon başarılı.']);
