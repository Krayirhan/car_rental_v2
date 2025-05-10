<?php
// ❗ DÜZELTİLDİ: db.php artık doğru yerden çekiliyor
require __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['name'] ?? '';
    $lastName  = $_POST['surname'] ?? '';
    $email     = $_POST['email'] ?? '';
    $topic     = $_POST['subject'] ?? '';
    $message   = $_POST['message'] ?? '';

    if ($firstName && $lastName && $email && $topic && $message) {
        $stmt = $pdo->prepare("INSERT INTO contact_messages (first_name, last_name, email, topic, message) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$firstName, $lastName, $email, $topic, $message]);

        echo json_encode(["ok" => true, "msg" => "Mesajınız gönderildi."]);
    } else {
        echo json_encode(["ok" => false, "msg" => "Tüm alanlar doldurulmalıdır."]);
    }
} else {
    echo json_encode(["ok" => false, "msg" => "Geçersiz istek."]);
}
?>
