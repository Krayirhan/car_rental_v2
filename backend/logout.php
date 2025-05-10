<?php
session_start();
session_destroy();                 // sunucu tarafı oturumu sonlandır
echo json_encode(['ok' => true]);  // yalnızca JSON
exit;
