-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Server version:               5.6.24 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for wyssi
DROP DATABASE IF EXISTS `wyssi`;
CREATE DATABASE IF NOT EXISTS `wyssi` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `wyssi`;


-- Dumping structure for table wyssi.articles
DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `main_image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table wyssi.articles: ~0 rows (approximately)
DELETE FROM `articles`;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` (`id`, `title`, `description`, `content`, `creation_date`, `update_date`, `main_image`) VALUES
	(1, 'asdaqwr', 'qwefasf', 'wqfsafc', '2015-12-05 17:20:15', '2015-12-05 17:20:15', NULL);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;


-- Dumping structure for table wyssi.pages
DROP TABLE IF EXISTS `pages`;
CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `main_image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table wyssi.pages: ~4 rows (approximately)
DELETE FROM `pages`;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` (`id`, `title`, `description`, `content`, `creation_date`, `update_date`, `main_image`) VALUES
	(1, 'Page 1', 'desc of Page 1', 'Page 1: lorem ipsum dolor sit amet consectetur adisplicit elit.', '2015-11-15 18:14:21', '2015-11-15 18:14:22', ''),
	(2, 'Page 2', 'desc of Page 2', 'Page 2 content: blabla alabala some page 2 content', '2015-11-15 18:44:50', '2015-11-15 19:25:16', 'uploads/user_content/153063.jpg'),
	(28, '1234fgfdg', '1234', '1234', '2015-12-05 17:17:18', '2015-12-20 17:41:15', NULL),
	(29, 'asdaqwr', 'qwefasf', 'wqfsafc', '2015-12-05 17:19:05', '2015-12-05 17:19:05', NULL);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;


-- Dumping structure for table wyssi.settings
DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_admin_theme` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `current_theme` (`current_admin_theme`),
  CONSTRAINT `FK_settings_themes` FOREIGN KEY (`current_admin_theme`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table wyssi.settings: ~0 rows (approximately)
DELETE FROM `settings`;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;


-- Dumping structure for table wyssi.themes
DROP TABLE IF EXISTS `themes`;
CREATE TABLE IF NOT EXISTS `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `theme_path` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `theme_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'public',
  `current` int(1) NOT NULL DEFAULT '0',
  `preview_image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table wyssi.themes: ~8 rows (approximately)
DELETE FROM `themes`;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` (`id`, `theme_name`, `theme_path`, `theme_type`, `current`, `preview_image`) VALUES
	(1, 'Admin WYSSI', 'admin', 'admin', 0, ''),
	(2, 'Admin Classic', 'admin_classic', 'admin', 1, ''),
	(3, 'Base template', 'base', 'public', 0, ''),
	(4, 'CeeVee', 'ceevee', 'public', 0, ''),
	(5, 'Kreo', 'kreo', 'public', 0, ''),
	(6, 'Sparrow', 'sparrow', 'public', 0, ''),
	(7, 'Woo', 'woo', 'public', 1, ''),
	(8, 'Easy Admin Panel', 'easy_admin_panel', 'admin', 0, '');
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;


-- Dumping structure for table wyssi.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_entered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `avatar` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table wyssi.users: ~1 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `date_created`, `date_updated`, `last_entered`, `admin`, `avatar`) VALUES
	(1, 'admin', '1qaz', 'John', 'Dow', '2015-09-05 12:03:58', '2015-12-20 19:33:39', '2015-12-20 19:33:39', 1, 'dedsec_logo_jpg.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
