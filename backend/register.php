<?php
require "db.php";

$name  = trim($_POST['name']  ?? '');
$email = trim($_POST['email'] ?? '');
$pass  = trim($_POST['password'] ?? '');

if(!$name || !$email || !$pass){
    echo json_encode(["ok"=>false,"msg"=>"Eksik alan"]);
    exit;
}

/* e-posta zaten var mı? */
$stmt = $pdo->prepare("SELECT id FROM users WHERE email=?");
$stmt->execute([$email]);
if($stmt->rowCount()){
    echo json_encode(["ok"=>false,"msg"=>"Bu e-posta zaten kayıtlı"]);
    exit;
}

/* kayıt */
$hash = password_hash($pass,PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users(name,email,password) VALUES(?,?,?)");
$stmt->execute([$name,$email,$hash]);

$_SESSION['uid']  = $pdo->lastInsertId();
$_SESSION['name'] = $name;

echo json_encode(["ok"=>true,"name"=>$name]);
