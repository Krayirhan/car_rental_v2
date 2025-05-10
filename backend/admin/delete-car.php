<?php
require '../db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM cars WHERE id = ?");
    $stmt->execute([$id]);
    echo "Araç silindi.";
} else {
    echo "ID gönderilmedi.";
}
?>
