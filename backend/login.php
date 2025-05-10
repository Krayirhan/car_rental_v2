<?php
session_start();                  // oturum başlat
require __DIR__ . '/db.php';      // veritabanı

$email = trim($_POST['email']    ?? '');
$pass  = trim($_POST['password'] ?? '');

$stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

/* ---- HATALI GİRİŞ ---- */
if (!$user || !password_verify($pass, $user['password'])) {
    http_response_code(401);                              // → JS .ok false
    echo json_encode(["ok"=>false,"msg"=>"Hatalı e-posta veya şifre"]);
    exit;
}

/* ---- BAŞARILI GİRİŞ ---- */
$_SESSION['uid']  = $user['id'];
$_SESSION['name'] = $user['name'];

echo json_encode(["ok"=>true,"name"=>$user['name']]);      // SADECE JSON
exit;
