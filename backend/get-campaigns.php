<?php
header("Content-Type: application/json");
require 'db.php';

// Kampanya türüne göre filtreleme (gunluk veya aylik)
$type = $_GET['type'] ?? null;

try {
    if ($type) {
        $stmt = $pdo->prepare("SELECT * FROM campaigns WHERE type = ?");
        $stmt->execute([$type]);
    } else {
        $stmt = $pdo->query("SELECT * FROM campaigns");
    }

    $campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($campaigns);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Veri alınırken bir hata oluştu."]);
}
