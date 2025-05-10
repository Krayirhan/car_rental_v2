-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 10 May 2025, 15:25:29
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `car_rental`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `type` varchar(20) DEFAULT 'gunluk',
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `campaigns`
--

INSERT INTO `campaigns` (`id`, `title`, `image`, `description`, `start_date`, `end_date`, `type`, `details`) VALUES
(3, 'Hafta Sonu Özel: 3 Günlük Kiralamaya 1 Gün Hediye!', '🛞', 'Cuma\'dan Pazartesi\'ye 3 günlük kiralama yap, Pazartesi ücretsiz senin olsun!', NULL, NULL, 'gunluk', 'Bu kampanya yalnızca **Cuma, Cumartesi veya Pazar** günü başlayan 3 günlük kiralamalarda geçerlidir.\n\n📅 Geçerlilik Tarihleri: 10 Haziran - 30 Haziran 2025\n\n🛞 Kampanya yalnızca binek araçlar için geçerlidir ve stoklarla sınırlıdır.\n\n✅ Hediye edilen gün (Pazartesi), sistem tarafından otomatik olarak eklenir.\n\n⚠️ Diğer kampanyalarla birleştirilemez. Ticari müşteriler kampanyadan faydalanamaz.\n\n📌 Rezervasyon yapılırken kampanya koşullarını kabul etmiş sayılırsınız.');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `segment` varchar(80) NOT NULL,
  `image` varchar(255) NOT NULL,
  `passengers` tinyint(3) UNSIGNED DEFAULT NULL,
  `luggage` tinyint(3) UNSIGNED DEFAULT NULL,
  `fuel` enum('Benzin','Dizel','Elektrikli','Hibrit') NOT NULL,
  `gearbox` enum('Otomatik','Manuel') NOT NULL,
  `abs` tinyint(1) DEFAULT 1,
  `airbag` tinyint(1) DEFAULT 1,
  `year` smallint(6) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `cars`
--

INSERT INTO `cars` (`id`, `name`, `segment`, `image`, `passengers`, `luggage`, `fuel`, `gearbox`, `abs`, `airbag`, `year`, `description`, `price`, `created_at`) VALUES
(1, 'BMW 3 Serisi', 'Premium Sedan', 'assets/img/bmw.png', 5, 2, 'Benzin', 'Otomatik', 1, 1, 2022, NULL, 1450.00, '2025-05-08 18:26:08'),
(2, 'Renault Clio', 'Ekonomik Hatchback', 'assets/img/clio.png', 5, 2, 'Benzin', 'Manuel', 1, 1, 2021, NULL, 990.00, '2025-05-08 18:26:08'),
(3, 'Volkswagen Tiguan', 'SUV Kiralık Araçlar', 'assets/img/tiguan.png', 5, 3, 'Dizel', 'Otomatik', 1, 1, 2023, NULL, 1750.00, '2025-05-08 18:26:08'),
(4, 'Audi A3', 'Premium Hatchback', 'assets/img/audi-a3.png', 5, 2, 'Benzin', 'Otomatik', 1, 1, 2022, NULL, 1590.00, '2025-05-08 18:26:08'),
(5, 'Peugeot 3008', 'SUV Kiralık Araçlar', 'assets/img/peugeot-3008.png', 5, 3, 'Dizel', 'Otomatik', 1, 1, 2023, NULL, 1390.00, '2025-05-08 18:26:08');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `car_stock`
--

CREATE TABLE `car_stock` (
  `car_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `qty` smallint(5) UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `car_stock`
--

INSERT INTO `car_stock` (`car_id`, `city_id`, `qty`) VALUES
(1, 1, 4),
(1, 2, 1),
(1, 3, 2),
(2, 1, 7),
(2, 2, 5),
(2, 3, 6),
(3, 1, 3),
(3, 2, 1),
(3, 3, 2),
(4, 1, 2),
(4, 2, 1),
(4, 3, 2),
(5, 1, 5),
(5, 2, 2),
(5, 3, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(1, 'İstanbul'),
(2, 'Ankara'),
(3, 'İzmir');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `topic` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `first_name`, `last_name`, `email`, `topic`, `message`, `created_at`) VALUES
(1, 'Furkan', 'Turan', 'fusturan@gmail.com', 'destek', 'Destek\r\n', '2025-05-10 12:05:34'),
(2, 'Furkan', 'Turan', 'fusturan@gmail.com', 'destek', 'Destek2', '2025-05-10 12:06:56'),
(3, 'Furkan', 'Turan', 'fusturan@gmail.com', 'destek', 'Destek2', '2025-05-10 12:07:56'),
(4, 'Furkan', 'Turan', 'fusturan@gmail.com', 'destek', 'Destek3', '2025-05-10 12:08:04');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('beklemede','onaylı','iptal') DEFAULT 'beklemede',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `car_id`, `start_date`, `end_date`, `total_price`, `status`, `created_at`) VALUES
(1, 1, 4, '2025-05-10', '2025-05-11', 1590.00, 'beklemede', '2025-05-10 13:11:34'),
(2, 2, 3, '2025-05-10', '2025-05-11', 1750.00, 'beklemede', '2025-05-10 13:13:09');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Furkan Turan', 'fusturan@gmail.com', '$2y$10$PFMTh/t7d/P81zg7FSFt/eLXKJoZl536riYeZr1KbDeCnzhDIZwJq', '2025-05-08 18:40:28'),
(2, 'Muhsin Furkan Turan', 'fturan01@hotmail.com', '$2y$10$XsKbWpwYyfvJGDY1e09Efej5yOxuxh2EnmnflGXT0X.lMO.56fiLe', '2025-05-08 19:21:45'),
(3, 'dıjwekjckş', 'asdsadfusturan@gmail.com', '$2y$10$ufdGkiz9F4OBlt7GhQ/zMeRbg0yv2lEMS/wv0KxNpC6OnD/9z4oi.', '2025-05-09 13:15:05');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `car_stock`
--
ALTER TABLE `car_stock`
  ADD PRIMARY KEY (`car_id`,`city_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Tablo için indeksler `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `car_stock`
--
ALTER TABLE `car_stock`
  ADD CONSTRAINT `car_stock_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `car_stock_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
