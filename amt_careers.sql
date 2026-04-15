-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 15, 2026 at 04:04 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amt_careers`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` bigint UNSIGNED NOT NULL,
  `vacancy_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` tinyint UNSIGNED DEFAULT NULL,
  `applied_position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `cover_letter` text COLLATE utf8mb4_unicode_ci,
  `ai_analysis` json DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cv_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `vacancy_id`, `user_id`, `name`, `email`, `phone`, `address`, `age`, `applied_position`, `start_date`, `cover_letter`, `ai_analysis`, `source`, `cv_path`, `status`, `is_read`, `created_at`, `updated_at`) VALUES
(209, 12, NULL, 'Sherman Windler', 'jewell48@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'accepted', 0, '2024-11-15 06:33:46', '2024-11-26 06:33:46'),
(210, 12, NULL, 'Eino Mitchell', 'katherine09@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'accepted', 0, '2025-09-07 06:33:46', '2025-09-18 06:33:46'),
(211, 12, NULL, 'Marcia Altenwerth', 'waelchi.crystal@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'reviewed', 0, '2025-12-06 06:33:46', '2025-12-13 06:33:46'),
(212, 12, NULL, 'Juwan Mayert', 'lisette.gusikowski@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2025-05-02 06:33:46', '2025-05-10 06:33:46'),
(213, 12, NULL, 'Kristin Leannon', 'houston.weimann@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'accepted', 0, '2025-06-24 06:33:46', '2025-07-08 06:33:46'),
(214, 12, NULL, 'Elliott Kunze', 'ksteuber@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'pending', 0, '2025-09-24 06:33:46', '2025-09-28 06:33:46'),
(215, 12, NULL, 'Leo Harris', 'darian33@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'pending', 0, '2024-10-19 06:33:46', '2024-11-01 06:33:46'),
(216, 12, NULL, 'Brionna Mante', 'jocelyn.reichel@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'rejected', 0, '2026-01-11 06:33:46', '2026-01-22 06:33:46'),
(217, 12, NULL, 'Stefanie Rowe I', 'urath@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'pending', 0, '2025-07-19 06:33:46', '2025-07-21 06:33:46'),
(218, 12, NULL, 'Henri Hoppe', 'fklein@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2025-06-04 06:33:46', '2025-06-13 06:33:46'),
(219, 12, NULL, 'Joaquin Schowalter', 'pboehm@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2024-09-18 06:33:46', '2024-09-28 06:33:46'),
(220, 12, NULL, 'Federico Witting', 'donald.lockman@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2025-09-25 06:33:46', '2025-10-06 06:33:46'),
(221, 12, NULL, 'Prof. Maddison Barrows', 'brady21@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'pending', 0, '2024-10-20 06:33:46', '2024-11-03 06:33:46'),
(222, 12, NULL, 'Mrs. River Fadel IV', 'jamel.leffler@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'rejected', 0, '2024-12-05 06:33:46', '2024-12-17 06:33:46'),
(223, 12, NULL, 'Dr. Dudley Effertz Jr.', 'ngutmann@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'rejected', 0, '2024-08-15 06:33:46', '2024-08-29 06:33:46'),
(224, 12, NULL, 'Mr. Nathanial Wilderman', 'wstanton@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2024-05-10 06:33:46', '2024-05-15 06:33:46'),
(225, 12, NULL, 'Prof. Hoyt Price', 'mueller.adele@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2025-03-07 06:33:46', '2025-03-10 06:33:46'),
(226, 12, NULL, 'Pedro Hills V', 'nina05@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'pending', 0, '2024-10-03 06:33:46', '2024-10-16 06:33:46'),
(227, 12, NULL, 'Pinkie Reinger', 'zstanton@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2024-09-09 06:33:46', '2024-09-22 06:33:46'),
(228, 13, NULL, 'Hermann Spencer', 'raul.gibson@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'accepted', 0, '2024-08-16 06:33:46', '2024-08-27 06:33:46'),
(229, 13, NULL, 'Mrs. Eryn Kris MD', 'mckenzie.oberbrunner@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2025-10-30 06:33:46', '2025-11-13 06:33:46'),
(230, 13, NULL, 'Demond Schroeder', 'schaefer.florence@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'pending', 0, '2025-12-31 06:33:46', '2026-01-01 06:33:46'),
(231, 13, NULL, 'Kyra Parker', 'lucie.kirlin@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2025-05-03 06:33:46', '2025-05-05 06:33:46'),
(232, 13, NULL, 'Dan Gleichner', 'parker.jade@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2026-03-15 06:33:46', '2026-03-29 06:33:46'),
(233, 13, NULL, 'Marisol Heller', 'mitchell.jordan@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'rejected', 0, '2025-01-04 06:33:46', '2025-01-18 06:33:46'),
(234, 13, NULL, 'Ms. Justine Emard', 'hettinger.elsa@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2024-09-04 06:33:46', '2024-09-12 06:33:46'),
(235, 13, NULL, 'Dr. Bailey Vandervort', 'bcummerata@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'reviewed', 0, '2025-06-08 06:33:46', '2025-06-09 06:33:46'),
(236, 13, NULL, 'Urban Jacobs Sr.', 'umertz@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2025-02-14 06:33:46', '2025-02-26 06:33:46'),
(237, 13, NULL, 'Katelin Bosco DVM', 'koss.bart@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'reviewed', 0, '2025-05-17 06:33:46', '2025-05-27 06:33:46'),
(238, 13, NULL, 'Marcelino Conn', 'wmoore@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'reviewed', 0, '2024-08-15 06:33:46', '2024-08-16 06:33:46'),
(239, 13, NULL, 'Davin Runolfsson', 'heller.justice@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2024-08-01 06:33:46', '2024-08-02 06:33:46'),
(240, 13, NULL, 'Dr. Hettie Witting MD', 'consuelo74@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2025-09-09 06:33:46', '2025-09-17 06:33:46'),
(241, 13, NULL, 'Lyric Padberg', 'abrekke@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2026-03-22 06:33:46', '2026-03-25 06:33:46'),
(242, 13, NULL, 'Richmond Pagac', 'heller.kiara@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'reviewed', 0, '2024-12-12 06:33:46', '2024-12-24 06:33:46'),
(243, 13, NULL, 'Dayana Rowe', 'verda67@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2024-12-18 06:33:46', '2025-01-01 06:33:46'),
(244, 13, NULL, 'Leatha Schneider PhD', 'qreynolds@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2025-03-25 06:33:46', '2025-03-27 06:33:46'),
(245, 13, NULL, 'Susan Ward', 'wilfredo.ferry@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2025-09-19 06:33:46', '2025-09-25 06:33:46'),
(246, 13, NULL, 'Larissa Koss', 'mwiza@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'rejected', 0, '2024-12-29 06:33:46', '2025-01-05 06:33:46'),
(247, 13, NULL, 'Haskell Cremin', 'brock.mayer@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'reviewed', 0, '2024-08-31 06:33:46', '2024-09-09 06:33:46'),
(248, 13, NULL, 'Destany Larson', 'ftremblay@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'reviewed', 0, '2025-05-15 06:33:46', '2025-05-27 06:33:46'),
(249, 13, NULL, 'April Spencer', 'mzboncak@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'pending', 0, '2024-06-24 06:33:47', '2024-06-27 06:33:47'),
(250, 13, NULL, 'Karianne Larson', 'helena.beatty@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'reviewed', 0, '2024-06-10 06:33:47', '2024-06-11 06:33:47'),
(251, 13, NULL, 'Mckayla Wisozk', 'jeremie.casper@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'accepted', 0, '2024-04-17 06:33:47', '2024-04-21 06:33:47'),
(252, 14, NULL, 'Austyn Runte', 'jaylen.bins@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'rejected', 0, '2024-05-17 06:33:47', '2024-05-25 06:33:47'),
(253, 14, NULL, 'Susanna Torphy', 'darwin97@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'accepted', 0, '2025-04-19 06:33:47', '2025-04-27 06:33:47'),
(254, 14, NULL, 'Rodger Kreiger', 'skiles.jaylen@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2025-05-15 06:33:47', '2025-05-20 06:33:47'),
(255, 14, NULL, 'Miss Samanta Mayert DDS', 'kskiles@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'reviewed', 0, '2024-04-18 06:33:47', '2024-04-28 06:33:47'),
(256, 14, NULL, 'Demarco Toy', 'lina02@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2025-12-04 06:33:47', '2025-12-05 06:33:47'),
(257, 14, NULL, 'Willow West', 'mante.allene@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2024-09-12 06:33:47', '2024-09-13 06:33:47'),
(258, 14, NULL, 'Miss Polly Larson', 'steve.rice@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'pending', 0, '2025-06-23 06:33:47', '2025-07-03 06:33:47'),
(259, 14, NULL, 'Alf Wunsch II', 'uheller@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'accepted', 0, '2024-12-01 06:33:47', '2024-12-02 06:33:47'),
(260, 14, NULL, 'Prof. Lorenz Metz II', 'mraz.tressie@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2025-05-13 06:33:47', '2025-05-19 06:33:47'),
(261, 14, NULL, 'Aryanna Armstrong', 'hills.candace@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'reviewed', 0, '2025-09-19 06:33:47', '2025-09-23 06:33:47'),
(262, 14, NULL, 'Dr. Judah Price Jr.', 'aurelio55@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2025-05-29 06:33:47', '2025-06-06 06:33:47'),
(263, 14, NULL, 'Ms. Hettie Stoltenberg', 'gcarter@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'pending', 0, '2025-05-11 06:33:47', '2025-05-18 06:33:47'),
(264, 14, NULL, 'Marilou Daugherty', 'zmurazik@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'rejected', 0, '2025-10-01 06:33:47', '2025-10-13 06:33:47'),
(265, 14, NULL, 'Alan Blick', 'dwalter@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'rejected', 0, '2024-12-10 06:33:47', '2024-12-23 06:33:47'),
(266, 14, NULL, 'Alexandra Goodwin', 'alexie00@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'pending', 0, '2025-11-21 06:33:47', '2025-12-02 06:33:47'),
(267, 14, NULL, 'Sasha Buckridge', 'gorn@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'rejected', 0, '2025-05-19 06:33:47', '2025-05-25 06:33:47'),
(268, 14, NULL, 'Alfreda Von', 'vkoch@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'accepted', 0, '2024-11-29 06:33:47', '2024-12-09 06:33:47'),
(269, 14, NULL, 'Miss Santina Zulauf', 'cindy49@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'pending', 0, '2026-03-14 06:33:47', '2026-03-26 06:33:47'),
(270, 14, NULL, 'Freeda Stracke PhD', 'kellie.price@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2025-09-21 06:33:47', '2025-09-26 06:33:47'),
(271, 15, NULL, 'Marlene Green Jr.', 'herzog.karlie@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'accepted', 0, '2025-03-15 06:33:47', '2025-03-24 06:33:47'),
(272, 15, NULL, 'Marianna Toy', 'kendra29@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'accepted', 0, '2025-12-14 06:33:47', '2025-12-25 06:33:47'),
(273, 15, NULL, 'Lavern Pagac Jr.', 'fhaag@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2024-07-03 06:33:47', '2024-07-13 06:33:47'),
(274, 15, NULL, 'Clarabelle Reichel', 'sydni.king@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2025-05-01 06:33:47', '2025-05-14 06:33:47'),
(275, 15, NULL, 'Angel Goldner', 'antonietta88@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2024-07-14 06:33:47', '2024-07-26 06:33:47'),
(276, 15, NULL, 'Burnice Raynor', 'daugherty.josephine@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'accepted', 0, '2025-10-03 06:33:47', '2025-10-11 06:33:47'),
(277, 15, NULL, 'Lori Johnston', 'morar.mallie@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2024-10-16 06:33:47', '2024-10-21 06:33:47'),
(278, 15, NULL, 'Mr. Eliseo Hoeger III', 'stephon27@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'reviewed', 0, '2026-02-12 06:33:47', '2026-02-26 06:33:47'),
(279, 15, NULL, 'Gwendolyn Watsica', 'rkoelpin@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'pending', 0, '2025-01-21 06:33:47', '2025-01-26 06:33:47'),
(280, 15, NULL, 'Mr. Torey Jones Jr.', 'marge.jacobi@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'accepted', 0, '2025-12-29 06:33:47', '2026-01-04 06:33:47'),
(281, 15, NULL, 'Dina Bergnaum', 'oschuppe@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'accepted', 0, '2024-09-04 06:33:47', '2024-09-07 06:33:47'),
(282, 15, NULL, 'Rosemary Prosacco', 'taurean40@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2024-07-21 06:33:47', '2024-07-30 06:33:47'),
(283, 15, NULL, 'Donald Oberbrunner', 'raven07@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2025-08-06 06:33:47', '2025-08-17 06:33:47'),
(284, 15, NULL, 'Dr. Alvah Boyle', 'wehner.noelia@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'reviewed', 0, '2026-01-27 06:33:47', '2026-02-02 06:33:47'),
(285, 15, NULL, 'Prof. Vickie Bartell III', 'cristian.predovic@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2025-07-11 06:33:47', '2025-07-18 06:33:47'),
(286, 15, NULL, 'Prof. Karson Anderson Jr.', 'itzel.anderson@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'reviewed', 0, '2025-03-26 06:33:47', '2025-04-04 06:33:47'),
(287, 15, NULL, 'Jack Larkin', 'arjun.bechtelar@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'rejected', 0, '2024-06-11 06:33:47', '2024-06-17 06:33:47'),
(288, 15, NULL, 'Jana Olson', 'jschulist@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'reviewed', 0, '2025-03-23 06:33:47', '2025-04-01 06:33:47'),
(289, 16, NULL, 'Mr. Pierce Fay', 'dawson.herman@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2025-08-09 06:33:47', '2025-08-21 06:33:47'),
(290, 16, NULL, 'Miss Telly Bode', 'nia.conn@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'rejected', 0, '2025-12-15 06:33:47', '2025-12-23 06:33:47'),
(291, 16, NULL, 'Gwendolyn Dietrich DDS', 'alessandro04@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'reviewed', 0, '2025-06-24 06:33:47', '2025-06-27 06:33:47'),
(292, 16, NULL, 'Kianna Baumbach', 'leone74@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2026-02-27 06:33:47', '2026-03-07 06:33:47'),
(293, 16, NULL, 'Alana Dooley DDS', 'wosinski@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'pending', 0, '2026-01-11 06:33:47', '2026-01-24 06:33:47'),
(294, 16, NULL, 'Mr. Lamar Willms DDS', 'afton.grady@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'reviewed', 0, '2024-12-09 06:33:47', '2024-12-16 06:33:47'),
(295, 16, NULL, 'Anissa Prohaska', 'krajcik.payton@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'reviewed', 0, '2025-11-04 06:33:47', '2025-11-09 06:33:47'),
(296, 16, NULL, 'Pierre Grady', 'wintheiser.lonnie@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'rejected', 0, '2024-09-10 06:33:47', '2024-09-22 06:33:47'),
(297, 16, NULL, 'Dr. Angelica Mills PhD', 'willis.goldner@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'accepted', 0, '2025-12-18 06:33:47', '2025-12-21 06:33:47'),
(298, 16, NULL, 'Fanny Barrows', 'olson.addie@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'pending', 0, '2025-07-29 06:33:47', '2025-08-06 06:33:47'),
(299, 16, NULL, 'Kyle Schiller PhD', 'idenesik@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'reviewed', 0, '2026-02-12 06:33:47', '2026-02-21 06:33:47'),
(300, 16, NULL, 'Catherine Ruecker', 'oboyer@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2025-10-13 06:33:47', '2025-10-19 06:33:47'),
(301, 16, NULL, 'Destiny Hartmann', 'lschaefer@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'reviewed', 0, '2024-05-01 06:33:47', '2024-05-12 06:33:47'),
(302, 16, NULL, 'Cristian Roob', 'adonis.nitzsche@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'accepted', 0, '2025-12-16 06:33:47', '2025-12-18 06:33:47'),
(303, 16, NULL, 'Greyson Franecki', 'cummings.malinda@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'reviewed', 0, '2025-07-21 06:33:47', '2025-07-29 06:33:47'),
(304, 17, NULL, 'Evert Hudson', 'usawayn@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'reviewed', 0, '2024-11-15 06:33:47', '2024-11-24 06:33:47'),
(305, 17, NULL, 'Kiera Corkery PhD', 'dhudson@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2024-09-12 06:33:47', '2024-09-18 06:33:47'),
(306, 17, NULL, 'Camylle Batz', 'predovic.niko@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'rejected', 0, '2025-01-21 06:33:47', '2025-01-22 06:33:47'),
(307, 17, NULL, 'Antwon Ziemann', 'torp.zoey@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'rejected', 0, '2025-03-21 06:33:47', '2025-03-26 06:33:47'),
(308, 17, NULL, 'Prof. Alfonzo Parisian I', 'glegros@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'pending', 0, '2025-09-21 06:33:47', '2025-09-23 06:33:47'),
(309, 17, NULL, 'Ms. Aisha Hermann DDS', 'wilson.donnelly@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2024-10-10 06:33:47', '2024-10-17 06:33:47'),
(310, 17, NULL, 'Aubree Price', 'sipes.rachelle@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2025-10-23 06:33:47', '2025-10-30 06:33:47'),
(311, 17, NULL, 'Nelda Kuvalis', 'urowe@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2024-12-05 06:33:47', '2024-12-06 06:33:47'),
(312, 17, NULL, 'Sven Rau', 'zklein@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'rejected', 0, '2025-08-19 06:33:47', '2025-09-01 06:33:47'),
(313, 17, NULL, 'Prof. Stephen Langworth Jr.', 'dicki.hiram@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'accepted', 0, '2025-09-13 06:33:47', '2025-09-20 06:33:47'),
(314, 17, NULL, 'Willie Lubowitz', 'estella93@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'reviewed', 0, '2025-07-27 06:33:47', '2025-08-05 06:33:47'),
(315, 17, NULL, 'Dr. Marcel Jones II', 'marks.erwin@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'pending', 0, '2026-02-23 06:33:47', '2026-03-03 06:33:47'),
(316, 17, NULL, 'Mr. Lula Quigley', 'daija04@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'reviewed', 0, '2025-04-05 06:33:47', '2025-04-10 06:33:47'),
(317, 17, NULL, 'Ms. Zoey Rau DDS', 'justice.feeney@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2025-09-20 06:33:47', '2025-09-21 06:33:47'),
(318, 17, NULL, 'Mr. Buster Stamm', 'harris.iva@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2024-12-20 06:33:47', '2025-01-02 06:33:47'),
(319, 17, NULL, 'Aida Jaskolski', 'bradtke.rasheed@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'reviewed', 0, '2025-05-31 06:33:47', '2025-06-01 06:33:47'),
(320, 17, NULL, 'Dr. Alene Jast IV', 'dax60@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'pending', 0, '2025-03-25 06:33:47', '2025-04-06 06:33:47'),
(321, 18, NULL, 'Mr. Isaiah Howe', 'josh.friesen@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'reviewed', 0, '2025-02-10 06:33:47', '2025-02-15 06:33:47'),
(322, 18, NULL, 'Friedrich Hermann', 'ines.becker@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'accepted', 0, '2025-12-13 06:33:47', '2025-12-18 06:33:47'),
(323, 18, NULL, 'Casandra Turner', 'wilbert.mcglynn@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'rejected', 0, '2025-04-18 06:33:47', '2025-04-25 06:33:47'),
(324, 18, NULL, 'Vaughn Kuhn V', 'qjerde@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2024-11-01 06:33:47', '2024-11-15 06:33:47'),
(325, 18, NULL, 'Sidney Stracke', 'west.lawson@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'reviewed', 0, '2025-05-31 06:33:47', '2025-06-01 06:33:47'),
(326, 18, NULL, 'Miss Leila Legros', 'udach@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'accepted', 0, '2024-05-05 06:33:47', '2024-05-16 06:33:47'),
(327, 18, NULL, 'Prof. Ada Hahn Sr.', 'dillon.trantow@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'pending', 0, '2025-04-09 06:33:47', '2025-04-14 06:33:47'),
(328, 18, NULL, 'Mrs. Fatima Huels III', 'florine.stracke@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'rejected', 0, '2025-09-23 06:33:47', '2025-10-04 06:33:47'),
(329, 18, NULL, 'Allie Schmitt DDS', 'heber28@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2025-11-11 06:33:47', '2025-11-22 06:33:47'),
(330, 18, NULL, 'Nyah O\'Reilly', 'steve.zieme@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'rejected', 0, '2025-09-22 06:33:47', '2025-09-23 06:33:47'),
(331, 18, NULL, 'Darwin Daugherty I', 'drake20@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TikTok', NULL, 'accepted', 0, '2024-07-16 06:33:47', '2024-07-24 06:33:47'),
(332, 18, NULL, 'Saul Walker', 'brain.ortiz@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Zalo', NULL, 'reviewed', 0, '2024-05-23 06:33:47', '2024-06-05 06:33:47'),
(333, 18, NULL, 'Prof. Nathan Nolan PhD', 'egottlieb@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2025-01-04 06:33:47', '2025-01-12 06:33:47'),
(334, 18, NULL, 'Leonard Zboncak', 'braeden66@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'pending', 0, '2025-02-03 06:33:47', '2025-02-13 06:33:47'),
(335, 18, NULL, 'Jedidiah Ferry', 'ottis.flatley@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'pending', 0, '2025-11-25 06:33:47', '2025-11-29 06:33:47'),
(336, 18, NULL, 'Alfred Considine', 'king.garrett@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'pending', 0, '2024-08-05 06:33:47', '2024-08-06 06:33:47'),
(337, 18, NULL, 'Elsie Hahn', 'oankunding@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'reviewed', 0, '2026-03-12 06:33:47', '2026-03-24 06:33:47'),
(338, 18, NULL, 'Kattie Quitzon', 'ruthe.olson@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Người quen giới thiệu', NULL, 'reviewed', 0, '2024-09-15 06:33:47', '2024-09-28 06:33:47'),
(339, 18, NULL, 'Alexie Monahan', 'grant.leonie@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trang tuyển dụng công ty', NULL, 'accepted', 0, '2025-12-28 06:33:47', '2026-01-06 06:33:47'),
(340, 18, NULL, 'Constance Gleason', 'jovan98@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Trực tiếp tại cổng', NULL, 'accepted', 0, '2024-05-19 06:33:47', '2024-05-28 06:33:47'),
(341, 18, NULL, 'Mrs. Addison Emard DVM', 'lamar13@example.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'reviewed', 0, '2025-01-11 06:33:47', '2025-01-15 06:33:47'),
(342, 18, NULL, 'Prof. Vicky Kohler', 'howe.leanne@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Facebook', NULL, 'rejected', 0, '2024-04-30 06:33:47', '2024-05-07 06:33:47'),
(343, 18, NULL, 'Wilhelmine Stamm', 'blanca.feest@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'accepted', 0, '2025-01-29 06:33:47', '2025-02-05 06:33:47'),
(344, 18, NULL, 'Garrison Abernathy', 'chelsie.terry@example.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TopCV', NULL, 'pending', 0, '2024-11-28 06:33:47', '2024-12-01 06:33:47');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-manhhd0901@gmail.com|127.0.0.1', 'i:2;', 1776166714),
('laravel-cache-manhhd0901@gmail.com|127.0.0.1:timer', 'i:1776166714;', 1776166714),
('laravel-cache-manhhd09901@gmail.com|127.0.0.1', 'i:3;', 1776167037),
('laravel-cache-manhhd09901@gmail.com|127.0.0.1:timer', 'i:1776167037;', 1776167037);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `history` text COLLATE utf8mb4_unicode_ci,
  `mission` text COLLATE utf8mb4_unicode_ci,
  `vision` text COLLATE utf8mb4_unicode_ci,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`id`, `name`, `history`, `mission`, `vision`, `address`, `email`, `phone`, `logo`, `images`, `created_at`, `updated_at`) VALUES
(1, 'Công ty TNHH Almus Tech', 'Công ty TNHH Almus Tech là doanh nghiệp có vốn đầu tư nước ngoài, chuyên sản xuất linh kiện điện tử. Được thành lập nhằm đáp ứng nhu cầu ngày càng cao của thị trường công nghệ, đặc biệt là trong lĩnh vực sản xuất tai nghe và phụ kiện điện thoại.', 'Xây dựng môi trường làm việc chuyên nghiệp, thu hút và phát triển nguồn nhân lực chất lượng cao, mang lại giá trị bền vững cho khách hàng và đối tác.', 'Trở thành doanh nghiệp hàng đầu trong lĩnh vực sản xuất linh kiện điện tử tại Việt Nam và khu vực.', 'Lô G3, Khu công nghiệp Quế Võ, P. Nam Sơn, TP. Bắc Ninh, Tỉnh Bắc Ninh', 'contact@almustech.com', '0222 123 000', 'company/i0z1D1ZR9Sjugvt9zImPFXSO1QSYMqUCyxAtdBYD.png', '[]', '2026-04-10 04:26:19', '2026-04-13 04:53:38');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_03_28_212725_create_vacancies_table', 1),
(5, '2026_03_28_212726_create_applications_table', 1),
(6, '2026_03_29_035223_add_source_to_applications_table', 1),
(7, '2026_03_29_052158_add_staff_fields_to_tables', 1),
(8, '2026_04_10_112503_create_company_info_table', 1),
(9, '2026_04_11_011114_update_applications_table_for_auth_and_notifications', 2),
(10, '2026_04_13_000001_add_profile_fields_to_applications_and_vacancies', 3),
(11, '2026_04_13_192020_add_ai_analysis_to_applications_table', 4),
(12, '2026_04_15_033253_add_factory_level_kpi_to_vacancies_table', 5),
(13, '2026_04_15_102716_create_oqc_steps_table', 6),
(14, '2026_04_15_102718_create_quality_standards_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `oqc_steps`
--

CREATE TABLE `oqc_steps` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Target',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oqc_steps`
--

INSERT INTO `oqc_steps` (`id`, `title`, `description`, `icon`, `order`, `created_at`, `updated_at`) VALUES
(1, 'Vật tư đầu vào', 'Kiểm tra và xác định chất lượng vật tư từ nhà cung cấp trước khi đưa vào sản xuất.', 'PackageSearch', 1, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(2, 'Kiểm soát quá trình (IPQC)', 'Giám sát liên tục các thông số kỹ thuật và máy móc để đảm bảo tính ổn định.', 'Settings2', 2, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(3, 'Kiểm tra thành phẩm (FQC)', 'Thực hiện kiểm tra ngẫu nhiên hoặc 100% sản phẩm sau khi hoàn thiện.', 'ShieldCheck', 3, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(4, 'Kiểm soát xuất xưởng (OQC)', 'Đánh giá cuối cùng về đóng gói, nhãn mác và số lượng trước khi vận chuyển.', 'Truck', 4, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(5, 'Cải tiến liên tục', 'Phân tích dữ liệu lỗi để tối ưu quy trình và nâng cao tỷ lệ sản phẩm đạt chuẩn.', 'Zap', 5, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(6, 'Vật tư đầu vào', 'Kiểm tra và xác định chất lượng vật tư từ nhà cung cấp trước khi đưa vào sản xuất.', 'PackageSearch', 1, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(7, 'Kiểm soát quá trình (IPQC)', 'Giám sát liên tục các thông số kỹ thuật và máy móc để đảm bảo tính ổn định.', 'Settings2', 2, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(8, 'Kiểm tra thành phẩm (FQC)', 'Thực hiện kiểm tra ngẫu nhiên hoặc 100% sản phẩm sau khi hoàn thiện.', 'ShieldCheck', 3, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(9, 'Kiểm soát xuất xưởng (OQC)', 'Đánh giá cuối cùng về đóng gói, nhãn mác và số lượng trước khi vận chuyển.', 'Truck', 4, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(10, 'Cải tiến liên tục', 'Phân tích dữ liệu lỗi để tối ưu quy trình và nâng cao tỷ lệ sản phẩm đạt chuẩn.', 'Zap', 5, '2026-04-15 03:35:16', '2026-04-15 03:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quality_standards`
--

CREATE TABLE `quality_standards` (
  `id` bigint UNSIGNED NOT NULL,
  `type` enum('pass','fail') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pass',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quality_standards`
--

INSERT INTO `quality_standards` (`id`, `type`, `title`, `description`, `image_path`, `order`, `created_at`, `updated_at`) VALUES
(1, 'pass', 'Độ phẳng bề mặt', 'Bề mặt sản phẩm không có vết lõm hoặc lồi vượt quá 0.05mm.', NULL, 1, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(2, 'pass', 'Độ bóng đồng nhất', 'Phản chiếu ánh sáng đều khắp bề mặt, không có hiện tượng loang màu.', NULL, 2, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(3, 'fail', 'Dính bụi sơn', 'Xuất hiện các hạt nhỏ li ti trên bề mặt do môi trường phòng sơn không sạch.', NULL, 1, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(4, 'fail', 'Trầy xước cơ học', 'Các vết xước do va chạm trong quá trình vận chuyển hoặc lắp máy.', NULL, 2, '2026-04-15 03:31:52', '2026-04-15 03:31:52'),
(5, 'pass', 'Độ phẳng bề mặt', 'Bề mặt sản phẩm không có vết lõm hoặc lồi vượt quá 0.05mm.', NULL, 1, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(6, 'pass', 'Độ bóng đồng nhất', 'Phản chiếu ánh sáng đều khắp bề mặt, không có hiện tượng loang màu.', NULL, 2, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(7, 'fail', 'Dính bụi sơn', 'Xuất hiện các hạt nhỏ li ti trên bề mặt do môi trường phòng sơn không sạch.', NULL, 1, '2026-04-15 03:35:16', '2026-04-15 03:35:16'),
(8, 'fail', 'Trầy xước cơ học', 'Các vết xước do va chạm trong quá trình vận chuyển hoặc lắp máy.', NULL, 2, '2026-04-15 03:35:16', '2026-04-15 03:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('cC2PPRRxE4FLDDmiqQ5hDVANkchnJgVYFa8KYE9F', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJVaGlxZDh0aGhDeFhwZTFKWnVlaUtjVTRVTjBOWWlDTXRTajFwNXZCIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI6MX0=', 1776250533),
('dvUVt1oqwkOliZqo5Re4zQ9nIORLQD64TObDfZ3j', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJKN0NaZGoxTjJPdmF3TkZleXcxbVFBd0VlUVE2SHo1cXFGcGlpU2h0IiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJsb2NhbGUiOiJ2aSIsImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoxfQ==', 1776260099),
('V1ObEbzyFdWsairr1vvdaUP9Sb08Pys6gbwjcCR8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJCY1l6TjVhSXczZEJBVHk4WHlVU2dsZ282eTJndVZKbng4NDJ6TzFCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1776267739);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `phone`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'AMT Admin', 'admin@amt.com', NULL, NULL, NULL, '$2y$12$KvrXPV..4sD2bJBVkuGnFO5iP6UyL1gwJdXyPF5stsVXEZ6a494bi', 'admin', NULL, '2026-04-10 04:26:18', '2026-04-10 04:26:18'),
(2, 'HR Staff', 'staff@amt.com', NULL, NULL, NULL, '$2y$12$opadEYuvaX97xU1sdpPK/OReKhtRb518zWsaaJTSugeALMJpZp8CO', 'staff', NULL, '2026-04-10 04:26:18', '2026-04-10 04:26:18'),
(3, 'Manh Hoang', 'manhhd0901@gmail.com', NULL, NULL, NULL, '$2y$12$miTaxjWpzZG/mPC7ng9FI.soWozz7Rx/YBZsI./cJzaxp9QIrh0ZS', 'admin', NULL, '2026-04-10 18:21:17', '2026-04-15 03:40:21'),
(4, 'Manh Hoang', 'manhhd09901@gmail.com', NULL, NULL, NULL, '$2y$12$lhSTPKPdM8js.tzA0Vt3F.OawJNlhuMtS9GfHcYxmLDi/TBD/iEHq', 'user', NULL, '2026-04-13 05:12:01', '2026-04-13 05:12:01'),
(5, 'Manh Hoang', 'manhhd09801@gmail.com', NULL, NULL, NULL, '$2y$12$6j4xtQrCHjdGPEvDZ5d7AuXFZr3byjkjffUnDlHcgOW3xuUw5j8Le', 'user', NULL, '2026-04-14 04:44:03', '2026-04-14 04:44:03'),
(6, 'Manh Hoangkkkk', 'manhhd09701@gmail.com', NULL, NULL, NULL, '$2y$12$ViLrpRGPvH8aISln4f6w8egA51RNX5zfp/nM8qWbEi7gxtjvHcCFe', 'user', NULL, '2026-04-14 05:08:07', '2026-04-14 05:08:07');

-- --------------------------------------------------------

--
-- Table structure for table `vacancies`
--

CREATE TABLE `vacancies` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `recruitment_process` text COLLATE utf8mb4_unicode_ci,
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Full-time',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `factory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kpi_target` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vacancies`
--

INSERT INTO `vacancies` (`id`, `title`, `description`, `recruitment_process`, `requirements`, `benefits`, `location`, `salary`, `type`, `is_active`, `created_at`, `updated_at`, `user_id`, `factory`, `level`, `kpi_target`) VALUES
(12, 'Sản xuất và lắp ráp (Production & Assembly)', '<p>Tham gia trực tiếp vào dây chuyền sản xuất và lắp ráp các linh kiện điện tử, đảm bảo đúng quy trình và tiêu chuẩn kỹ thuật.</p>', NULL, NULL, NULL, 'Nhà máy Sản xuất', '8M - 12M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL),
(13, 'Vận hành máy (Machine Operator)', '<p>Điều khiển và giám sát hoạt động của các hệ thống máy móc sản xuất, xử lý các sự cố cơ bản kịp thời.</p>', NULL, NULL, NULL, 'Nhà máy Sản xuất', '9M - 14M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL),
(14, 'Kiểm tra Chất lượng (Quality Control - QC)', '<p>Kiểm tra chất lượng nguyên vật liệu đầu vào, giám sát quy trình và đánh giá chất lượng sản phẩm đầu ra theo tiêu chuẩn ISO.</p>', NULL, NULL, NULL, 'Nhà máy Sản xuất', '10M - 15M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL),
(15, 'Kỹ thuật Hỗ trợ (Technical Support)', '<p>Hỗ trợ giải quyết các vấn đề kỹ thuật liên quan đến quy trình sản xuất, đề xuất giải pháp cải tiến hiệu suất công việc.</p>', NULL, NULL, NULL, 'Nhà máy Sản xuất', '12M - 18M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL),
(16, 'Bảo trì (Maintenance Worker)', '<p>Bảo dưỡng và sửa chữa máy móc định kỳ, ngăn ngừa hỏng hóc và đảm bảo dây chuyền vận hành 24/7 không bị gián đoạn.</p>', NULL, NULL, NULL, 'Nhà máy Sản xuất', '10M - 16M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL),
(17, 'Kho & Logistics (Warehouse)', '<p>Quản lý xuất nhập tồn kho, sắp xếp hàng hóa khoa học và phối hợp với các bộ phận vận tải để đảm bảo tiến độ giao hàng.</p>', NULL, NULL, NULL, 'Kho bãi', '8M - 13M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL),
(18, 'Hoàn thiện & Đóng gói (Packaging)', '<p>Thực hiện các công đoạn hoàn thiện sản phẩm cuối cùng, đóng gói dán nhãn theo đúng quy cách để chuẩn bị lưu kho/xuất hàng.</p>', NULL, NULL, NULL, 'Nhà máy Sản xuất', '7M - 11M', 'Full-time', 1, '2026-04-15 06:32:13', '2026-04-15 06:32:13', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applications_vacancy_id_foreign` (`vacancy_id`),
  ADD KEY `applications_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oqc_steps`
--
ALTER TABLE `oqc_steps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `quality_standards`
--
ALTER TABLE `quality_standards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vacancies`
--
ALTER TABLE `vacancies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vacancies_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `oqc_steps`
--
ALTER TABLE `oqc_steps`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `quality_standards`
--
ALTER TABLE `quality_standards`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vacancies`
--
ALTER TABLE `vacancies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_vacancy_id_foreign` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vacancies`
--
ALTER TABLE `vacancies`
  ADD CONSTRAINT `vacancies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
