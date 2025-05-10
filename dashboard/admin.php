<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Yönetici Paneli</title>
  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body class="dark-mode" style="padding: 2rem; font-family: Poppins, sans-serif;">
  <div class="container">
    <h2 class="text-glow">Yönetici Paneli</h2>

    <!-- Araç Ekleme -->
    <h3>Araç Ekle</h3>
    <form action="../backend/admin/add-car.php" method="POST" style="margin-bottom:2rem;">
      <input type="text" name="name" placeholder="Araç Adı" required />
      <input type="number" name="price" placeholder="Günlük Fiyat" required />
      <input type="text" name="year" placeholder="Model Yılı" required />
      <input type="text" name="description" placeholder="Açıklama" />
      <button type="submit" class="btn">Ekle</button>
    </form>

    <!-- Mevcut Araçlar -->
    <h3>Mevcut Araçlar</h3>
    <div id="car-list-admin">
      <?php
        require '../backend/db.php';
        $cars = $pdo->query("SELECT * FROM cars ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($cars as $car):
      ?>
        <div style="margin-bottom: 1rem; padding: 1rem; background: #252532; border-radius: 8px;">
          <strong><?= htmlspecialchars($car['name']) ?></strong> -
          <?= htmlspecialchars($car['year']) ?> -
          <?= number_format($car['price'], 2) ?> ₺/gün
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Rezervasyonlar -->
    <h3>Rezervasyonlar</h3>
    <div id="reservations">
      <?php
        $stmt = $pdo->query("
          SELECT r.*, u.name AS user_name, c.name AS car_name
          FROM reservations r
          JOIN users u ON r.user_id = u.id
          JOIN cars c ON r.car_id = c.id
          ORDER BY r.created_at DESC
        ");
        $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($reservations as $res):
      ?>
        <div style="margin-bottom:1rem; padding:1rem; background:#2b2b3c; border-radius:8px;">
          <strong><?= htmlspecialchars($res['user_name']) ?></strong> |
          <span><?= htmlspecialchars($res['car_name']) ?></span><br>
          <span>📅 <?= $res['start_date'] ?> - <?= $res['end_date'] ?></span><br>
          <span>💳 Toplam Fiyat: <?= number_format($res['total_price'], 2) ?> ₺</span><br>
          <span>🟡 Durum: <?= htmlspecialchars($res['status']) ?></span><br>
          <small style="color:#888;">Kayıt: <?= $res['created_at'] ?></small>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- İletişim Mesajları -->
    <h3>Gelen Mesajlar</h3>
    <div id="contact-messages">
      <?php
        $messages = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($messages as $msg):
      ?>
        <div style="margin-bottom:1.5rem; padding:1rem; background:#2b2b3c; border-radius:10px">
          <strong><?= htmlspecialchars($msg['first_name'] . " " . $msg['last_name']) ?></strong>
          <span style="color:#999; font-size:0.9rem;">(<?= htmlspecialchars($msg['email']) ?>)</span><br>
          <em style="color:#ff006e;"><?= htmlspecialchars(ucfirst($msg['topic'])) ?></em>
          <p><?= nl2br(htmlspecialchars($msg['message'])) ?></p>
          <small style="color:#888;">Gönderim Tarihi: <?= $msg['created_at'] ?></small>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</body>
</html>
