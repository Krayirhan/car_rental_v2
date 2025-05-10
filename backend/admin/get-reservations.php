<?php
require '../db.php';

$stmt = $pdo->query("
    SELECT r.id, c.name as car_name, r.start_date, r.end_date
    FROM reservations r
    JOIN cars c ON r.car_id = c.id
");

$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($reservations as $res) {
    echo "<p><strong>Araç:</strong> {$res['car_name']} | <strong>Başlangıç:</strong> {$res['start_date']} | <strong>Bitiş:</strong> {$res['end_date']}</p>";
}
?>
