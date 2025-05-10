<?php
/*  oturum durumunu JSON olarak döndürür  */
session_start();
header('Content-Type: application/json; charset=utf-8');

if (isset($_SESSION['uid'])) {
    echo json_encode([
        'logged' => true,
        'name'   => $_SESSION['name'] ?? 'Kullanıcı'
    ]);
} else {
    echo json_encode(['logged' => false]);
}
exit;
