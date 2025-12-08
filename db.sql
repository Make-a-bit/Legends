-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.2.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for urheilijakanta
CREATE DATABASE IF NOT EXISTS `urheilijakanta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `urheilijakanta`;

-- Dumping structure for table urheilijakanta.kisat
CREATE TABLE IF NOT EXISTS `kisat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kisatyyppi_id` int(11) NOT NULL,
  `maa_id` int(11) DEFAULT NULL,
  `kisa` varchar(100) NOT NULL,
  `vuosi` year(4) NOT NULL,
  `kaupunki` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kisat_maat_idx` (`maa_id`),
  KEY `fk_kisat_kisatyypit_idx` (`kisatyyppi_id`) USING BTREE,
  CONSTRAINT `fk_kisat_kisatyypit` FOREIGN KEY (`kisatyyppi_id`) REFERENCES `kisatyypit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_kisat_maat` FOREIGN KEY (`maa_id`) REFERENCES `maat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.kisat: ~97 rows (approximately)
REPLACE INTO `kisat` (`id`, `kisatyyppi_id`, `maa_id`, `kisa`, `vuosi`, `kaupunki`) VALUES
	(12, 9, 9, 'Yleisurheilun MM-kisat', '2005', 'Helsinki'),
	(13, 21, 38, 'Kesäolympialaiset', '2004', 'Ateena'),
	(16, 21, 39, 'Kesäolympialaiset', '2008', 'Peking'),
	(17, 21, 49, 'Kesäolympialaiset', '2012', 'Lontoo'),
	(18, 9, 41, 'Yleisurheilun MM-kisat', '2007', 'Osaka'),
	(19, 9, 42, 'Yleisurheilun MM-kisat', '2009', 'Berliini'),
	(20, 9, 43, 'Yleisurheilun MM-kisat', '2011', 'Daegu'),
	(21, 9, 44, 'Yleisurheilun MM-kisat', '2013', 'Moskova'),
	(22, 9, 39, 'Yleisurheilun MM-kisat', '2015', 'Peking'),
	(23, 9, 49, 'Yleisurheilun MM-kisat', '2017', 'Lontoo'),
	(25, 22, 45, 'Yleisurheilun EM-kisat', '2006', 'Göteborg'),
	(26, 22, 46, 'Yleisurheilun EM-kisat', '2010', 'Barcelona'),
	(27, 22, 9, 'Yleisurheilun EM-kisat', '2012', 'Helsinki'),
	(28, 22, 14, 'Yleisurheilun EM-kisat', '2014', 'Zürich'),
	(29, 22, 47, 'Yleisurheilun EM-kisat', '2016', 'Amsterdam'),
	(30, 23, 48, 'IAAF:n yleisurheilufinaali', '2005', 'Monaco'),
	(31, 23, 48, 'IAAF:n yleisurheilufinaali', '2007', 'Stuttgart'),
	(32, 23, 42, 'IAAF:n yleisurheilufinaali', '2006', 'Stuttgart'),
	(33, 23, 38, 'IAAF:n yleisurheilufinaali', '2009', 'Thessaloniki'),
	(34, 23, 42, 'IAAF:n yleisurheilufinaali', '2008', 'Stuttgart'),
	(35, 24, 9, 'Kalevan kisat', '2004', 'Vaasa'),
	(36, 24, 9, 'Kalevan kisat', '2005', 'Pori'),
	(37, 24, 9, 'Kalevan kisat', '2006', 'Jyväskylä'),
	(38, 24, 9, 'Kalevan kisat', '2007', 'Lappeenranta'),
	(39, 24, 9, 'Kalevan kisat', '2010', 'Kajaani'),
	(40, 24, 9, 'Kalevan kisat', '2013', 'Vaasa'),
	(41, 24, 9, 'Kalevan kisat', '2016', 'Oulu'),
	(42, 24, 9, 'Kalevan kisat', '2017', 'Seinäjoki'),
	(43, 24, 9, 'Kalevan kisat', '2003', 'Helsinki'),
	(44, 24, 9, 'Kalevan kisat', '2008', 'Tampere'),
	(45, 24, 9, 'Kalevan kisat', '2015', 'Pori'),
	(46, 24, 9, 'Kalevan kisat', '2009', 'Espoo'),
	(47, 24, 9, 'Kalevan kisat', '2012', 'Lahti'),
	(48, 21, 40, 'Kesäolympialaiset', '2016', 'Rio De Janeiro'),
	(49, 26, 11, 'Yleisurheilun U20 MM-kisat', '2002', 'Kingston'),
	(50, 27, 50, 'Yleisurheilun U18 MM-kisat', '2003', 'Sherbrooke'),
	(51, 25, 51, '-', '2005', 'Nassau'),
	(52, 28, 38, 'Maailmancup', '2006', 'Thessaloniki'),
	(53, 42, 52, 'Snooker Masters', '2025', 'Jeddah'),
	(54, 43, 12, 'English Open', '2017', 'Barnsley'),
	(55, 44, 12, 'Northern Ireland Open', '2020', 'Milton Keynes'),
	(56, 44, 53, 'Northern Ireland Open', '2019', 'Belfast'),
	(57, 44, 53, 'Northern Ireland Open', '2018', 'Belfast'),
	(58, 45, 12, 'British Open', '2003', 'Brighton'),
	(59, 45, 12, 'British Open', '1995', '1995'),
	(60, 45, 12, 'British Open', '1994', 'Plymouth'),
	(61, 46, 12, 'UK Championship', '2023', 'York'),
	(62, 46, 12, 'UK Championship', '2018', 'York'),
	(63, 46, 12, 'UK Championship', '2017', 'York'),
	(64, 46, 12, 'UK Championship', '2014', 'York'),
	(65, 46, 12, 'UK Championship', '2007', 'Telford'),
	(66, 46, 12, 'UK Championship', '2001', 'York'),
	(67, 46, 12, 'UK Championship', '1997', 'Preston'),
	(68, 46, 12, 'UK Championship', '1993', 'Preston'),
	(69, 47, 54, 'Scottish Open', '1998', 'Aberdeen'),
	(70, 47, 54, 'Scottish Open', '2000', 'Aberdeen'),
	(71, 47, 12, 'Scottish Open', '2020', 'Milton Keynes'),
	(72, 48, 42, 'German Masters', '2012', 'Berliini'),
	(73, 48, 42, 'German Masters', '1996', 'Berliini'),
	(74, 49, 12, 'World Grand Prix', '2024', 'Leicester'),
	(75, 49, 12, 'World Grand Prix', '2021', 'Coventry'),
	(76, 49, 12, 'World Grand Prix', '2018', 'Preston'),
	(77, 50, 12, 'Players Championship', '2021', 'Milton Keynes'),
	(78, 50, 12, 'Players Championship', '2019', 'Preston, Lancashire'),
	(79, 50, 55, 'Players Championship', '2018', 'Llandudno'),
	(80, 51, 55, 'Welsh Open', '2021', 'Newport'),
	(81, 51, 55, 'Welsh Open', '2016', 'Cardiff'),
	(82, 51, 55, 'Welsh Open', '2014', 'Newport'),
	(83, 51, 55, 'Welsh Open', '2008', 'Newport'),
	(84, 51, 55, 'Welsh Open', '2005', 'Newport'),
	(85, 51, 55, 'Welsh Open', '2004', 'Cardiff'),
	(86, 52, 54, 'World Open', '2010', 'Glasgow'),
	(87, 52, 54, 'World Open', '2007', 'Aberdeen'),
	(88, 52, 12, 'World Open', '2005', 'Preston'),
	(89, 52, 12, 'World Open', '2004', 'Preston'),
	(90, 52, 12, 'World Open', '2000', 'Telford'),
	(91, 53, 12, 'Tour Championship', '2024', 'Manchester'),
	(92, 53, 12, 'Tour Championship', '2021', 'Newport'),
	(93, 53, 55, 'Tour Championship', '2019', 'Llandudno'),
	(94, 54, 12, 'World Championship', '2022', 'Sheffield'),
	(95, 54, 12, 'World Championship', '2020', 'Sheffield'),
	(96, 54, 12, 'World Championship', '2014', 'Sheffield'),
	(97, 54, 12, 'World Championship', '2013', 'Sheffield'),
	(98, 54, 12, 'World Championship', '2012', 'Sheffield'),
	(99, 54, 12, 'World Championship', '2008', 'Sheffield'),
	(100, 54, 12, 'World Championship', '2004', 'Sheffield'),
	(101, 54, 12, 'World Championship', '2001', 'Sheffield'),
	(102, 57, 9, 'Kausi 1991-1992', '1992', 'Helsinki'),
	(103, 57, 9, 'Euroopan Cup 1994-1995', '1995', 'Helsinki'),
	(104, 55, 13, 'Kausi 2005-2006', '2007', 'Anaheim'),
	(105, 56, 50, 'Kanada-Cup 1991', '1991', 'Toronto'),
	(106, 56, 50, 'MM-kisat', '2008', 'Québec'),
	(107, 56, 57, 'MM-kisat', '1999', 'Oslo'),
	(108, 21, 44, 'Talviolympialaiset', '2014', 'Sotši'),
	(109, 21, 58, 'Talviolympialaiset', '2006', 'Torino'),
	(110, 21, 41, 'Talviolympialaiset', '1998', 'Nagano'),
	(111, 21, 50, 'Talviolympialaiset', '2010', 'Vancouver');

-- Dumping structure for table urheilijakanta.kisatyypit
CREATE TABLE IF NOT EXISTS `kisatyypit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kisatyyppi` varchar(100) NOT NULL,
  `ranking_value` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.kisatyypit: ~25 rows (approximately)
REPLACE INTO `kisatyypit` (`id`, `kisatyyppi`, `ranking_value`) VALUES
	(9, 'MM-kisat', 2),
	(21, 'Olympialaiset', 1),
	(22, 'EM-kisat', 3),
	(23, 'IAAF:n yleisurheilufinaali', 4),
	(24, 'SM-kisat', 5),
	(25, 'Keski-Amerikan ja Karibian mestaruuskilpailut', 4),
	(26, 'U20 MM-kisat', 6),
	(27, 'U18 MM-kisat', 7),
	(28, 'Yleisurheilun Maailmancup', 4),
	(42, 'Saudi Arabia Masters', 13),
	(43, 'English Open', 8),
	(44, 'Northern Ireland Open', 9),
	(45, 'British Open', 11),
	(46, 'UK Championship', 2),
	(47, 'Scottish Open', 7),
	(48, 'German Masters', 12),
	(49, 'World Grand Prix', 5),
	(50, 'Players Championship', 4),
	(51, 'Welsh Open', 6),
	(52, 'World Open', 10),
	(53, 'Tour Championship', 3),
	(54, 'World Championship', 1),
	(55, 'NHL', 1),
	(56, 'Maajoukkue', 2),
	(57, 'SM-liiga', 3);

-- Dumping structure for table urheilijakanta.lajit
CREATE TABLE IF NOT EXISTS `lajit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urheilukategoria_id` int(11) NOT NULL,
  `laji` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `laji_UNIQUE` (`laji`),
  KEY `idx_lajit_urheilukategoriat` (`urheilukategoria_id`) USING BTREE,
  CONSTRAINT `FK_lajit_urheilukategoriat` FOREIGN KEY (`urheilukategoria_id`) REFERENCES `urheilukategoriat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.lajit: ~7 rows (approximately)
REPLACE INTO `lajit` (`id`, `urheilukategoria_id`, `laji`) VALUES
	(5, 4, 'Snooker'),
	(10, 4, '8-pallo'),
	(18, 17, 'Keihäänheitto'),
	(19, 6, '100 m'),
	(20, 6, '200 m'),
	(21, 6, '4 x 100 m'),
	(23, 8, 'Jääkiekko');

-- Dumping structure for table urheilijakanta.maat
CREATE TABLE IF NOT EXISTS `maat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `maa` varchar(100) NOT NULL,
  `lippu_url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maa_UNIQUE` (`maa`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.maat: ~25 rows (approximately)
REPLACE INTO `maat` (`id`, `maa`, `lippu_url`) VALUES
	(9, 'Suomi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/512px-Flag_of_Finland.svg.png?20230220191416'),
	(11, 'Jamaika', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Jamaica.svg/512px-Flag_of_Jamaica.svg.png?20250909172048'),
	(12, 'Englanti', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/512px-Flag_of_England.svg.png?20210524072131'),
	(13, 'Yhdysvallat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/512px-Flag_of_the_United_States.svg.png?20240524035322'),
	(14, 'Sveitsi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/512px-Flag_of_Switzerland_%28Pantone%29.svg.png?20210325011925'),
	(38, 'Kreikka', NULL),
	(39, 'Kiina', NULL),
	(40, 'Brasilia', NULL),
	(41, 'Japani', NULL),
	(42, 'Saksa', NULL),
	(43, 'Etelä-Korea', NULL),
	(44, 'Venäjä', NULL),
	(45, 'Ruotsi', NULL),
	(46, 'Espanja', NULL),
	(47, 'Hollanti', NULL),
	(48, 'Monaco', NULL),
	(49, 'Britannia', NULL),
	(50, 'Kanada', NULL),
	(51, 'Bahama', NULL),
	(52, 'Saudi Arabia', NULL),
	(53, 'Pohjois-Irlanti', NULL),
	(54, 'Scotland', NULL),
	(55, 'Wales', NULL),
	(57, 'Norja', NULL),
	(58, 'Italia', NULL);

-- Dumping structure for table urheilijakanta.saavutukset
CREATE TABLE IF NOT EXISTS `saavutukset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kisa_id` int(11) NOT NULL,
  `laji_id` int(11) DEFAULT NULL,
  `urheilija_id` int(11) NOT NULL,
  `saavutusluokka_id` int(11) DEFAULT NULL,
  `tulos` varchar(150) DEFAULT NULL,
  `lisatieto` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_saavutukset_urheilijat_idx` (`urheilija_id`),
  KEY `fk_saavutukset_kisat_idx` (`kisa_id`),
  KEY `fk_saavutukset_lajit_idx` (`laji_id`) USING BTREE,
  KEY `fk_saavutukset_saavutusluokat_idx` (`saavutusluokka_id`) USING BTREE,
  CONSTRAINT `fk_saavutukset_kisat` FOREIGN KEY (`kisa_id`) REFERENCES `kisat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_saavutukset_lajit` FOREIGN KEY (`laji_id`) REFERENCES `lajit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_saavutukset_saavutusluokat` FOREIGN KEY (`saavutusluokka_id`) REFERENCES `saavutusluokat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_saavutukset_urheilijat` FOREIGN KEY (`urheilija_id`) REFERENCES `urheilijat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.saavutukset: ~122 rows (approximately)
REPLACE INTO `saavutukset` (`id`, `kisa_id`, `laji_id`, `urheilija_id`, `saavutusluokka_id`, `tulos`, `lisatieto`) VALUES
	(25, 13, 18, 40, 14, '83,01', ''),
	(26, 16, 18, 40, 13, '86,16', ''),
	(27, 17, 18, 40, 15, '82,80', ''),
	(28, 48, 18, 40, 16, '79,56', ''),
	(29, 12, 18, 40, 17, '81,27', ''),
	(30, 18, 18, 40, 8, '90,33', ''),
	(31, 19, 18, 40, 15, '81,90', ''),
	(32, 20, 18, 40, 18, '79,46', ''),
	(33, 21, 18, 40, 12, '87,07', ''),
	(34, 22, 18, 40, 13, '87,64', ''),
	(35, 23, 18, 40, 15, '86,94', ''),
	(37, 25, 18, 40, 12, '86,44', ''),
	(38, 26, 18, 40, 13, '86,67', ''),
	(39, 27, 18, 40, 19, '74,89', ''),
	(40, 28, 18, 40, 13, '84,40', ''),
	(41, 29, 18, 40, 20, '80,52', ''),
	(42, 30, 18, 40, 8, '91,33', ''),
	(43, 31, 18, 40, 8, '88,19', ''),
	(44, 32, 18, 40, 12, '88,25', ''),
	(45, 33, 18, 40, 12, '84,09', ''),
	(46, 33, 18, 40, 13, '81,64', ''),
	(47, 35, 18, 40, 8, '82,82', ''),
	(48, 36, 18, 40, 8, '87,83', ''),
	(49, 37, 18, 40, 8, '88,17', ''),
	(50, 38, 18, 40, 8, '89,43', ''),
	(51, 39, 18, 40, 8, '85,19', ''),
	(52, 40, 18, 40, 8, '85,70', ''),
	(53, 41, 18, 40, 8, '82,05', ''),
	(54, 42, 18, 40, 8, '82,80', ''),
	(55, 43, 18, 40, 12, '80,45', ''),
	(56, 44, 18, 40, 12, '82,28', ''),
	(57, 45, 18, 40, 12, '87,82', ''),
	(58, 46, 18, 40, 13, '84,28', ''),
	(59, 47, 18, 40, 13, '83,48', ''),
	(60, 49, 20, 39, 8, '20,61', ''),
	(61, 50, 20, 39, 8, '20,40', ''),
	(62, 51, 20, 39, 8, '', ''),
	(63, 12, 20, 39, 14, '26,27', ''),
	(64, 32, 20, 39, 13, '20,10', ''),
	(65, 52, 20, 39, 12, '19,96', ''),
	(66, 18, 20, 39, 12, '19,91', ''),
	(67, 18, 21, 39, 12, '37,89', ''),
	(68, 16, 19, 39, 8, '9,69', 'OE, ME'),
	(69, 16, 20, 39, 8, '19,30', 'OE, ME'),
	(70, 19, 19, 39, 8, '9,58', 'ME'),
	(71, 19, 20, 39, 8, '19,19', 'ME'),
	(72, 19, 21, 39, 8, '37,31', ''),
	(73, 33, 20, 39, 8, '19,68', ''),
	(74, 20, 20, 39, 8, '19,40', ''),
	(75, 20, 21, 39, 8, '37,04', 'ME'),
	(76, 17, 19, 39, 8, '9,63', 'OE'),
	(77, 17, 20, 39, 8, '19,32', ''),
	(78, 17, 21, 39, 8, '36,84', 'OE, ME'),
	(79, 21, 19, 39, 8, '9,77', ''),
	(80, 21, 20, 39, 8, '19,66', ''),
	(81, 21, 21, 39, 8, '37,36', ''),
	(82, 22, 19, 39, 8, '9,79', ''),
	(83, 22, 20, 39, 8, '19,55', ''),
	(84, 22, 21, 39, 8, '37,36', ''),
	(85, 48, 19, 39, 8, '9,81', ''),
	(86, 48, 20, 39, 8, '19,78', ''),
	(87, 48, 21, 39, 8, '37,27', ''),
	(88, 23, 19, 39, 13, '9,95', ''),
	(89, 53, 5, 35, 22, '', ''),
	(90, 54, 5, 35, 21, '', ''),
	(91, 57, 5, 35, 22, '', ''),
	(92, 56, 5, 35, 22, '', ''),
	(93, 55, 5, 35, 22, '', ''),
	(94, 60, 5, 35, 21, '', ''),
	(95, 59, 5, 35, 21, '', ''),
	(96, 58, 5, 35, 22, '', ''),
	(97, 68, 5, 35, 21, '', ''),
	(98, 67, 5, 35, 21, '', ''),
	(99, 66, 5, 35, 21, '', ''),
	(100, 65, 5, 35, 21, '', ''),
	(101, 64, 5, 35, 21, '', ''),
	(102, 63, 5, 35, 21, '', ''),
	(103, 62, 5, 35, 21, '', ''),
	(104, 61, 5, 35, 21, '', ''),
	(105, 71, 5, 35, 22, '', ''),
	(106, 70, 5, 35, 21, '', 'Highest break'),
	(107, 69, 5, 35, 21, '', ''),
	(108, 73, 5, 35, 21, '', ''),
	(109, 72, 5, 35, 21, '', ''),
	(110, 76, 5, 35, 21, '', ''),
	(111, 75, 5, 35, 21, '', ''),
	(112, 74, 5, 35, 21, '', ''),
	(113, 79, 5, 35, 21, '', ''),
	(114, 78, 5, 35, 21, '', ''),
	(115, 77, 5, 35, 22, '', ''),
	(116, 85, 5, 35, 21, '', ''),
	(117, 84, 5, 35, 21, '', ''),
	(118, 83, 5, 35, 22, '', 'Highest break'),
	(119, 82, 5, 35, 21, '', 'Highest break'),
	(120, 81, 5, 35, 21, '', ''),
	(121, 80, 5, 35, 22, '', ''),
	(122, 90, 5, 35, 22, '', 'Highest break'),
	(123, 89, 5, 35, 21, '', ''),
	(124, 88, 5, 35, 22, '', ''),
	(125, 87, 5, 35, 22, '', ''),
	(126, 86, 5, 35, 22, '', 'Highest break'),
	(127, 93, 5, 35, 21, '', ''),
	(128, 92, 5, 35, 22, '', ''),
	(129, 91, 5, 35, 22, '', ''),
	(130, 101, 5, 35, 21, '', ''),
	(131, 100, 5, 35, 21, '', ''),
	(132, 99, 5, 35, 21, '', 'Highest break'),
	(133, 98, 5, 35, 21, '', ''),
	(134, 97, 5, 35, 21, '', ''),
	(135, 96, 5, 35, 22, '', ''),
	(136, 95, 5, 35, 21, '', ''),
	(137, 94, 5, 35, 21, '', ''),
	(138, 102, 23, 36, 24, '', ''),
	(139, 103, 23, 36, 24, '', ''),
	(140, 104, 23, 36, 24, '', ''),
	(141, 105, 23, 36, 13, '', ''),
	(142, 107, 23, 36, 12, '', ''),
	(143, 106, 23, 36, 13, '', ''),
	(144, 111, 23, 36, 13, '', ''),
	(145, 108, 23, 36, 13, '', ''),
	(146, 110, 23, 36, 13, '', ''),
	(147, 109, 23, 36, 12, '', '');

-- Dumping structure for table urheilijakanta.saavutusluokat
CREATE TABLE IF NOT EXISTS `saavutusluokat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saavutusluokka` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `saavutusluokka_UNIQUE` (`saavutusluokka`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.saavutusluokat: ~14 rows (approximately)
REPLACE INTO `saavutusluokat` (`id`, `saavutusluokka`) VALUES
	(19, '11.'),
	(20, '14.'),
	(18, '17.'),
	(16, '21.'),
	(17, '4.'),
	(15, '5. '),
	(14, '8. '),
	(12, 'Hopea'),
	(23, 'Kolmas'),
	(8, 'Kulta'),
	(24, 'Mestaruus'),
	(13, 'Pronssi'),
	(22, 'Toinen sija'),
	(21, 'Voitto');

-- Dumping structure for table urheilijakanta.urheilijat
CREATE TABLE IF NOT EXISTS `urheilijat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urheilukategoria_id` int(11) DEFAULT NULL,
  `maa_id` int(11) DEFAULT NULL,
  `etunimi` varchar(100) NOT NULL,
  `sukunimi` varchar(100) NOT NULL,
  `kutsumanimi` varchar(100) DEFAULT NULL,
  `syntymavuosi` year(4) NOT NULL,
  `paino` decimal(5,2) DEFAULT NULL,
  `kuva_url` varchar(1024) DEFAULT NULL,
  `info` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_urheilijat_lajit_idx` (`urheilukategoria_id`) USING BTREE,
  KEY `fk_urheilijat_maat_idx` (`maa_id`) USING BTREE,
  CONSTRAINT `fk_urheilijat_maat` FOREIGN KEY (`maa_id`) REFERENCES `maat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_urheilijat_urheilukategoriat` FOREIGN KEY (`urheilukategoria_id`) REFERENCES `urheilukategoriat` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.urheilijat: ~4 rows (approximately)
REPLACE INTO `urheilijat` (`id`, `urheilukategoria_id`, `maa_id`, `etunimi`, `sukunimi`, `kutsumanimi`, `syntymavuosi`, `paino`, `kuva_url`, `info`) VALUES
	(35, 4, 12, 'Ronnie', 'O\'Sullivan', 'The Rocket', '1975', NULL, 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Stephen_Maguire%2C_Ronnie_O%E2%80%99Sullivan%2C_and_Michaela_Tabb_at_German_Masters_Snooker_Final_%28DerHexer%29_2012-02-05_05_cropped.jpg?20200822043241', NULL),
	(36, 8, 9, 'Teemu', 'Selänne', 'The Finnish Flash', '1970', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Teemu_Selanne_on_the_ice_November_2010.jpg/256px-Teemu_Selanne_on_the_ice_November_2010.jpg?20111218102934', 'Suomalainen jääkiekkoilija, Stanley Cup -voittaja sekä olympia- ja MM-mitalisti. Hän pelasi mittavan uran Pohjois-Amerikan NHL-liigassa, ja häntä pidetään yhtenä kaikkien aikojen parhaista jääkiekkoilijoista.'),
	(39, 6, 11, 'Usain', 'Bolt', 'Lightning Bolt', '1986', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Usain_Bolt_after_4_%C3%97_100_m_Rio_2016.jpg/128px-Usain_Bolt_after_4_%C3%97_100_m_Rio_2016.jpg?20160820194538', 'Jamaikalainen pikajuoksija, joka päätti kilpailu-uransa vuoden 2017 MM-kisoihin. Hän on kaikkien aikojen menestynein pikajuoksija. Bolt on 100 ja 200 metrin matkoilla kuusinkertainen olympiavoittaja ja seitsenkertainen maailmanmestari. Hän pitää hallussaan molempien pikamatkojen maailmanennätyksiä. Henkilökohtaisten saavutusten lisäksi hän on Jamaikan pikaviestijoukkueen jäsenenä voittanut kaksi kultaa olympialaisissa ja neljä MM-kilpailuissa.'),
	(40, 17, 9, 'Tero', 'Pitkämäki', '', '1982', 92.00, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Tero_Pitk%C3%A4m%C3%A4ki_2014.JPG/256px-Tero_Pitk%C3%A4m%C3%A4ki_2014.JPG?20140826184746', 'Uransa päättänyt keihäänheittäjä, olympiamitalisti, maailmanmestari ja moninkertainen arvokisamitalisti. Pitkämäen ennätys on 26. kesäkuuta 2005 Kuortaneella heitetty 91,53 metriä. Pitkämäki on menestynein suomalainen keihäänheittäjä arvokisamitaleiden määrällä mitattuna.');

-- Dumping structure for table urheilijakanta.urheilukategoriat
CREATE TABLE IF NOT EXISTS `urheilukategoriat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kategoria_UNIQUE` (`kategoria`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table urheilijakanta.urheilukategoriat: ~4 rows (approximately)
REPLACE INTO `urheilukategoriat` (`id`, `kategoria`) VALUES
	(4, 'Biljardi'),
	(8, 'Jääkiekko'),
	(6, 'Pikajuoksu'),
	(17, 'Yleisurheilu');

-- Dumping structure for view urheilijakanta.nayta_kisat
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_kisat` (
	`id` INT(11) NOT NULL,
	`kisatyyppi_id` INT(11) NOT NULL,
	`kisatyyppi` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`kisa` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`vuosi` YEAR NOT NULL,
	`kaupunki` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`maa_id` INT(11) NULL,
	`maa` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`lippu_url` VARCHAR(512) NULL COLLATE 'utf8mb4_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_kisatyypit
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_kisatyypit` (
	`id` INT(11) NOT NULL,
	`kisatyyppi` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`ranking_value` INT(2) NULL
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_lajit
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_lajit` (
	`id` INT(11) NOT NULL,
	`urheilukategoria_id` INT(11) NOT NULL,
	`laji` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`kategoria` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_maat
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_maat` (
	`id` INT(11) NOT NULL,
	`maa` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`lippu_url` VARCHAR(512) NULL COLLATE 'utf8mb4_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_saavutukset
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_saavutukset` (
	`saavutus_id` INT(11) NOT NULL,
	`urheilija_id` INT(11) NOT NULL,
	`etunimi` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`sukunimi` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`kutsumanimi` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`syntymavuosi` YEAR NULL,
	`paino` DECIMAL(5,2) NULL,
	`info` TEXT NULL COLLATE 'utf8mb4_unicode_ci',
	`urheilijan_urheilukategoria_id` INT(11) NULL,
	`urheilijan_urheilukategoria` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`urheilija_maa_id` INT(11) NULL,
	`urheilijan_maa` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`urheilija_lippu_url` VARCHAR(512) NULL COLLATE 'utf8mb4_unicode_ci',
	`kuva_url` VARCHAR(1024) NULL COLLATE 'utf8mb4_unicode_ci',
	`kisa_id` INT(11) NOT NULL,
	`kisa_tapahtuma` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`kisatyyppi_id` INT(11) NULL,
	`kisa_kategoria` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`ranking_value` INT(2) NULL,
	`vuosi` YEAR NULL,
	`kaupunki` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`kisamaa_id` INT(11) NULL,
	`kisa_maa` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`kisa_lippu_url` VARCHAR(512) NULL COLLATE 'utf8mb4_unicode_ci',
	`saavutusluokka_id` INT(11) NULL,
	`laji_id` INT(11) NULL,
	`laji` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`saavutus` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`tulos` VARCHAR(150) NULL COLLATE 'utf8mb4_unicode_ci',
	`lisatieto` VARCHAR(150) NULL COLLATE 'utf8mb4_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_saavutustyypit
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_saavutustyypit` (
	`id` INT(11) NOT NULL,
	`saavutusluokka` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_urheilijat
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_urheilijat` (
	`id` INT(11) NOT NULL,
	`etunimi` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`sukunimi` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`kutsumanimi` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`syntymavuosi` YEAR NOT NULL,
	`paino` DECIMAL(5,2) NULL,
	`urheilukategoria_id` INT(11) NULL,
	`kategoria` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`kuva_url` VARCHAR(1024) NULL COLLATE 'utf8mb4_unicode_ci',
	`maa_id` INT(11) NULL,
	`maa` VARCHAR(100) NULL COLLATE 'utf8mb4_unicode_ci',
	`lippu_url` VARCHAR(512) NULL COLLATE 'utf8mb4_unicode_ci',
	`info` TEXT NULL COLLATE 'utf8mb4_unicode_ci',
	`ika` INT(5) UNSIGNED NULL
) ENGINE=MyISAM;

-- Dumping structure for view urheilijakanta.nayta_urheilukategoriat
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nayta_urheilukategoriat` (
	`id` INT(11) NOT NULL,
	`kategoria` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci'
) ENGINE=MyISAM;

-- Dumping structure for procedure urheilijakanta.lisaa_kisa
DELIMITER //
CREATE PROCEDURE `lisaa_kisa`(
	IN `p_kisatyyppi_id` INT,
	IN `p_maa_id` INT,
	IN `p_nimi` VARCHAR(100),
	IN `p_vuosi` YEAR,
	IN `p_kaupunki` VARCHAR(100),
	OUT `p_kisa_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_kisa_id = -1;
    END;
    
    START TRANSACTION;
    
    -- Validate that kisatyyppi exists if provided
    IF p_kisatyyppi_id IS NOT NULL THEN
    	IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisatyypit` WHERE `id` = p_kisatyyppi_id) THEN
    		SIGNAL SQLSTATE '45000'
    			SET MESSAGE_TEXT = 'Invalid kisatyyppi_id: Kisatyyppi does not exist';
    		END IF;
    END IF;
    
    -- Validate that maa exists if provided
    IF p_maa_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`maat` WHERE `id` = p_maa_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid maa_id: Country does not exist';
        END IF;
    END IF;
    
INSERT INTO `urheilijakanta`.`kisat` (
	`kisatyyppi_id`,
	`maa_id`,
	`kisa`,
	`vuosi`,
	`kaupunki`
) VALUES (
	p_kisatyyppi_id,
	p_maa_id,
	p_nimi,
	p_vuosi,
	p_kaupunki
);

SET p_kisa_id = LAST_INSERT_ID();

COMMIT;
  
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_kisatyyppi
DELIMITER //
CREATE PROCEDURE `lisaa_kisatyyppi`(
	IN `p_kisatyyppi` VARCHAR(100),
	IN `p_ranking_value` INT,
	OUT `p_kisatyyppi_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_kisatyyppi_id = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if kisatyyppi already exists
    IF EXISTS (SELECT 1 FROM `urheilijakanta`.`kisatyypit` WHERE `kisatyyppi` = p_kisatyyppi) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Kisatyyppi already exists';
    END IF;
    
    -- Insert new kisatyyppi
    INSERT INTO `urheilijakanta`.`kisatyypit` (
        `kisatyyppi`,
        `ranking_value`
    )
    VALUES (
        p_kisatyyppi,
        p_ranking_value
    );
    
    -- Get the newly created kisatyyppi ID
    SET p_kisatyyppi_id = LAST_INSERT_ID();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_laji
DELIMITER //
CREATE PROCEDURE `lisaa_laji`(
	IN `p_kategoria_id` INT,
	IN `p_laji` VARCHAR(100),
	OUT `p_laji_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_laji_id = -1;
    END;
    
    START TRANSACTION;
    
INSERT INTO `urheilijakanta`.`lajit` (
	`urheilukategoria_id`,
	`laji`
) VALUES (
	p_kategoria_id,
	p_laji
);

SET p_laji_id = LAST_INSERT_ID();

COMMIT;
  
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_maa
DELIMITER //
CREATE PROCEDURE `lisaa_maa`(
	IN `p_maa` VARCHAR(100),
	IN `p_lippu_url` VARCHAR(512),
	OUT `p_maa_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_maa_id = -1;
    END;
    
    START TRANSACTION;
     
INSERT INTO `urheilijakanta`.`maat` (
	`maa`,
	`lippu_url`
) VALUES (
	p_maa,
	p_lippu_url
);

SET p_maa_id = LAST_INSERT_ID();

COMMIT;
  
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_saavutus
DELIMITER //
CREATE PROCEDURE `lisaa_saavutus`(
	IN `p_kisa_id` INT,
	IN `p_laji_id` INT,
	IN `p_urheilija_id` INT,
	IN `p_saavutusluokka_id` INT,
	IN `p_tulos` VARCHAR(150),
	IN `p_lisatieto` VARCHAR(150),
	OUT `p_saavutus_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_saavutus_id = -1;
    END;
    
    START TRANSACTION;
    
    
    -- Validate that kisa exists if provided
	 SET @debug_msg = 'Kisa not found check';
    IF p_kisa_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisat` WHERE `id` = p_kisa_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid kisa_id: Kisa does not exist';
        END IF;
    END IF;

       -- Validate that laji exists if provided
	 SET @debug_msg = 'Laji not found check';
    IF p_laji_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`lajit` WHERE `id` = p_laji_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid luokka: Luokka does not exist';
        END IF;
    END IF;
    
    -- Validate that urheilija exists if provided
	 SET @debug_msg = 'Urheilija not found check';
    IF p_urheilija_id IS NOT NULL THEN
    	IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilijat` WHERE `id` = p_urheilija_id) THEN
    		SIGNAL SQLSTATE '45000'
    			SET MESSAGE_TEXT = 'Invalid urheilija_id: Urheilija does not exist';
    		END IF;
    END IF;
    
        -- Validate that saavutusluokka exists if provided
	 SET @debug_msg = 'Saavutusluokka not found check';
    IF p_saavutusluokka_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`saavutusluokat` WHERE `id` = p_saavutusluokka_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid saavutusluokka: Saavutusluokka does not exist';
        END IF;
    END IF;


INSERT INTO `urheilijakanta`.`saavutukset` (
	`kisa_id`,
	`laji_id`,
	`urheilija_id`,
	`saavutusluokka_id`,
	`tulos`,
	`lisatieto`
) VALUES (
	p_kisa_id,
	p_laji_id,	
	p_urheilija_id,
	p_saavutusluokka_id,
	p_tulos,
	p_lisatieto
);

SET p_saavutus_id = LAST_INSERT_ID();

COMMIT;
  
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_saavutusluokka
DELIMITER //
CREATE PROCEDURE `lisaa_saavutusluokka`(
	IN `p_saavutusluokka` VARCHAR(100),
	OUT `p_saavutusluokka_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_saavutusluokka_id = -1;
    END;
    
    START TRANSACTION;
    
INSERT INTO `urheilijakanta`.`saavutusluokat` (
	`saavutusluokka`
) VALUES (
	p_saavutusluokka
);

SET p_saavutusluokka_id = LAST_INSERT_ID();

COMMIT;
  
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_urheilija
DELIMITER //
CREATE PROCEDURE `lisaa_urheilija`(
	IN `p_urheilukategoria_id` INT,
	IN `p_maa_id` INT,
	IN `p_etunimi` VARCHAR(100),
	IN `p_sukunimi` VARCHAR(100),
	IN `p_kutsumanimi` VARCHAR(100),
	IN `p_syntymavuosi` YEAR,
	IN `p_paino` DECIMAL(5,2),
	IN `p_kuva_url` VARCHAR(512),
	IN `p_info` TEXT,
	OUT `p_urheilija_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_urheilija_id = -1;
    END;
    
    START TRANSACTION;
    
    -- Validate that laji exists if provided
    IF p_urheilukategoria_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilukategoriat` WHERE `id` = p_urheilukategoria_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid laji_id: Sport does not exist';
        END IF;
    END IF;
    
    -- Validate that maa exists if provided
    IF p_maa_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`maat` WHERE `id` = p_maa_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid maa_id: Country does not exist';
        END IF;
    END IF;
    
    -- Insert new athlete
    INSERT INTO `urheilijakanta`.`urheilijat` (
        `urheilukategoria_id`,
        `maa_id`,
        `etunimi`,
        `sukunimi`,
        `kutsumanimi`,
        `syntymavuosi`,
        `paino`,
        `kuva_url`,
        `info`
    ) VALUES (
        p_urheilukategoria_id,
        p_maa_id,
        p_etunimi,
        p_sukunimi,
        p_kutsumanimi,
        p_syntymavuosi,
        p_paino,
        p_kuva_url,
        p_info
    );
    
    -- Get the newly created athlete's ID
    SET p_urheilija_id = LAST_INSERT_ID();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.lisaa_urheilukategoria
DELIMITER //
CREATE PROCEDURE `lisaa_urheilukategoria`(
	IN `p_nimi` VARCHAR(100),
	OUT `p_laji_id` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_laji_id = -1;
    END;
    
    START TRANSACTION;
       
INSERT INTO `urheilijakanta`.`urheilukategoriat` (
	`kategoria`
) VALUES (
	p_nimi
);

SET p_laji_id = LAST_INSERT_ID();

COMMIT;
  
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_kisa
DELIMITER //
CREATE PROCEDURE `paivita_kisa`(
	IN `p_id` INT,
	IN `p_kisatyyppi_id` INT,
	IN `p_maa_id` INT,
	IN `p_kisa` VARCHAR(100),
	IN `p_vuosi` YEAR,
	IN `p_kaupunki` VARCHAR(100),
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if kisa exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Kisa not found';
    END IF;
    
    -- Validate that Kisatyyppi exists if provided
    IF p_kisatyyppi_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisatyypit` WHERE `id` = p_kisatyyppi_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid kisatyyppi_id: Kisatyyppi does not exist';
        END IF;
    END IF;
    
    -- Validate that Maa exists if provided
    IF p_maa_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`maat` WHERE `id` = p_maa_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid maa_id: Maa does not exist';
        END IF;
    END IF;
  
    
    -- Update Kisa
    UPDATE `urheilijakanta`.`kisat`
    SET
        `kisatyyppi_id` = p_kisatyyppi_id,
        `maa_id` = p_maa_id,
        `kisa` = p_kisa,
        `vuosi` = p_vuosi,
        `kaupunki` = p_kaupunki
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_kisatyyppi
DELIMITER //
CREATE PROCEDURE `paivita_kisatyyppi`(
	IN `p_id` INT,
	IN `p_kisatyyppi` VARCHAR(100),
	IN `p_ranking_value` INT,
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if kisatyyppi exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisatyypit` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Kisatyyppi not found';
    END IF;
    
   
    -- Update Kisatyyppi
    UPDATE `urheilijakanta`.`kisatyypit`
    SET
        `kisatyyppi` = p_kisatyyppi,
        `ranking_value` = p_ranking_value
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_laji
DELIMITER //
CREATE PROCEDURE `paivita_laji`(
	IN `p_id` INT,
	IN `p_urheilukategoria_id` INT,
	IN `p_laji` VARCHAR(100),
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if luokka exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`lajit` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Luokka not found';
    END IF;
    
   
    -- Update luokka
    UPDATE `urheilijakanta`.`lajit`
    SET
    	  `urheilukategoria_id` = p_urheilukategoria_id,
        `laji` = p_laji
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_maa
DELIMITER //
CREATE PROCEDURE `paivita_maa`(
    IN p_id INT,
    IN p_maa VARCHAR(100),
    IN p_lippu_url VARCHAR(512),
    OUT p_affected_rows INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if maa exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`maat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Maa not found';
    END IF;
    
   
    -- Update maa
    UPDATE `urheilijakanta`.`maat`
    SET
        `maa` = p_maa,
        `lippu_url` = p_lippu_url
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_saavutus
DELIMITER //
CREATE PROCEDURE `paivita_saavutus`(
	IN `p_id` INT,
	IN `p_kisa_id` INT,
	IN `p_laji_id` INT,
	IN `p_urheilija_id` INT,
	IN `p_saavutusluokka_id` INT,
	IN `p_tulos` VARCHAR(150),
	IN `p_lisatieto` VARCHAR(150),
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;

    -- Check if saavutus exists
    SET @debug_msg = 'Saavutus not found check';
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`saavutukset` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saavutus not found';
    END IF;
    
    -- Validate that kisa exists if provided
    SET @debug_msg = 'Kisa not found check';
    IF p_kisa_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisat` WHERE `id` = p_kisa_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid kisa_id: Kisa does not exist';
        END IF;
    END IF;

   -- Validate that laji exists if provided
    SET @debug_msg = 'Laji not found check';
    IF p_laji_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`lajit` WHERE `id` = p_laji_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid luokka_id: Luokka does not exist';
        END IF;
    END IF;

    -- Validate that Urheilija exists if provided
    SET @debug_msg = 'Urheilija not found check';
	     IF p_urheilija_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilijat` WHERE `id` = p_urheilija_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid urheilija_id: Urheilija does not exist';
        END IF;
    END IF;
    
   -- Validate that saavutusluokka exists if provided
    SET @debug_msg = 'Saavutusluokka not found check';
    IF p_saavutusluokka_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`saavutusluokat` WHERE `id` = p_saavutusluokka_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid saavutus_id: Saavutustyyppi does not exist';
        END IF;
    END IF;
	      

    -- Update Saavutus
    UPDATE `urheilijakanta`.`saavutukset`
    SET
        `kisa_id` = p_kisa_id,
	     `laji_id` = p_laji_id,
        `urheilija_id` = p_urheilija_id,
        `saavutusluokka_id` = p_saavutusluokka_id,
        `tulos` = p_tulos,
        `lisatieto` = p_lisatieto
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_saavutusluokka
DELIMITER //
CREATE PROCEDURE `paivita_saavutusluokka`(
	IN `p_id` INT,
	IN `p_saavutusluokka` VARCHAR(100),
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if saavutustyyppi exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`saavutusluokat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saavutustyyppi not found';
    END IF;
    
   
    -- Update saavutustyyppi
    UPDATE `urheilijakanta`.`saavutusluokat`
    SET
        `saavutusluokka` = p_saavutusluokka
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_urheilija
DELIMITER //
CREATE PROCEDURE `paivita_urheilija`(
	IN `p_id` INT,
	IN `p_urheilukategoria_id` INT,
	IN `p_maa_id` INT,
	IN `p_etunimi` VARCHAR(100),
	IN `p_sukunimi` VARCHAR(100),
	IN `p_kutsumanimi` VARCHAR(100),
	IN `p_syntymavuosi` YEAR,
	IN `p_paino` DECIMAL(5,2),
	IN `p_kuva_url` VARCHAR(512),
	IN `p_info` TEXT,
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if athlete exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilijat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Athlete not found';
    END IF;
    
    -- Validate that laji exists if provided
    IF p_urheilukategoria_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilukategoriat` WHERE `id` = p_urheilukategoria_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid laji_id: Sport does not exist';
        END IF;
    END IF;
    
    -- Validate that maa exists if provided
    IF p_maa_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`maat` WHERE `id` = p_maa_id) THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Invalid maa_id: Country does not exist';
        END IF;
    END IF;
    
    -- Update athlete
    UPDATE `urheilijakanta`.`urheilijat`
    SET
        `urheilukategoria_id` = p_urheilukategoria_id,
		  `maa_id` = p_maa_id,
        `etunimi` = p_etunimi,
        `sukunimi` = p_sukunimi,
        `kutsumanimi` = p_kutsumanimi,
        `syntymavuosi` = p_syntymavuosi,
        `paino` = p_paino,
        `kuva_url` = p_kuva_url,
        `info` = p_info
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.paivita_urheilukategoria
DELIMITER //
CREATE PROCEDURE `paivita_urheilukategoria`(
	IN `p_id` INT,
	IN `p_nimi` VARCHAR(100),
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if laji exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilukategoriat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Laji not found';
    END IF;
    
   
    -- Update luokka
    UPDATE `urheilijakanta`.`urheilukategoriat`
    SET
        `kategoria` = p_nimi
    WHERE `id` = p_id;
    
    -- Get number of affected rows
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_kisa
DELIMITER //
CREATE PROCEDURE `poista_kisa`(
    IN p_id INT,
    OUT p_affected_rows INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if kisa exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Kisa not found';
    END IF;
      
    -- Delete the kisa
    DELETE FROM `urheilijakanta`.`kisat`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_kisatyyppi
DELIMITER //
CREATE PROCEDURE `poista_kisatyyppi`(
    IN p_id INT,
    OUT p_affected_rows INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if kisatyyppi exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`kisatyypit` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Kisatyyppi not found';
    END IF;
    
    -- Check if kisatyyppi is used in any kisat
    IF EXISTS (SELECT 1 FROM `urheilijakanta`.`kisat` WHERE `kisatyyppi_id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cannot delete kisatyyppi: it is used in competitions';
    END IF;
    
    -- Delete kisatyyppi
    DELETE FROM `urheilijakanta`.`kisatyypit`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_laji
DELIMITER //
CREATE PROCEDURE `poista_laji`(
	IN `p_id` INT,
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if luokka exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`lajit` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Luokka not found';
    END IF;
      
    -- Delete the luokka
    DELETE FROM `urheilijakanta`.`lajit`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_maa
DELIMITER //
CREATE PROCEDURE `poista_maa`(
    IN p_id INT,
    OUT p_affected_rows INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if maa exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`maat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Maa not found';
    END IF;
      
    -- Delete the kisa
    DELETE FROM `urheilijakanta`.`maat`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_saavutus
DELIMITER //
CREATE PROCEDURE `poista_saavutus`(
    IN p_id INT,
    OUT p_affected_rows INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if saavutus exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`saavutukset` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saavutus not found';
    END IF;
      
    -- Delete the saavutus
    DELETE FROM `urheilijakanta`.`saavutukset`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_saavutusluokka
DELIMITER //
CREATE PROCEDURE `poista_saavutusluokka`(
	IN `p_id` INT,
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if saavutustyyppi exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`saavutusluokat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saavutustyyppi not found';
    END IF;
      
    -- Delete the saavutustyyppi
    DELETE FROM `urheilijakanta`.`saavutusluokat`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_urheilija_cascade
DELIMITER //
CREATE PROCEDURE `poista_urheilija_cascade`(
    IN p_id INT,
    OUT p_affected_rows INT,
    OUT p_deleted_achievements INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
        SET p_deleted_achievements = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if athlete exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilijat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Athlete not found';
    END IF;
    
    -- First, delete all achievements for this athlete
    DELETE FROM `urheilijakanta`.`saavutukset`
    WHERE `urheilija_id` = p_id;
    
    SET p_deleted_achievements = ROW_COUNT();
    
    -- Then delete the athlete
    DELETE FROM `urheilijakanta`.`urheilijat`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for procedure urheilijakanta.poista_urheilukategoria
DELIMITER //
CREATE PROCEDURE `poista_urheilukategoria`(
	IN `p_id` INT,
	OUT `p_affected_rows` INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SET p_affected_rows = -1;
    END;
    
    START TRANSACTION;
    
    -- Check if laji exists
    IF NOT EXISTS (SELECT 1 FROM `urheilijakanta`.`urheilukategoriat` WHERE `id` = p_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Laji not found';
    END IF;
      
    -- Delete the laji
    DELETE FROM `urheilijakanta`.`urheilukategoriat`
    WHERE `id` = p_id;
    
    SET p_affected_rows = ROW_COUNT();
    
    COMMIT;
    
END//
DELIMITER ;

-- Dumping structure for view urheilijakanta.nayta_kisat
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_kisat`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_kisat` AS SELECT 
    k.id,
    k.kisatyyppi_id,
    kt.kisatyyppi,
    k.kisa,
    k.vuosi,
    k.kaupunki,
    k.maa_id,
    m.maa,
    m.lippu_url
FROM 
    `urheilijakanta`.`kisat` k
LEFT JOIN 
	 `urheilijakanta`.`kisatyypit` kt ON k.kisatyyppi_id = kt.id
LEFT JOIN 
    `urheilijakanta`.`maat` m ON k.maa_id = m.id
ORDER BY 
    k.vuosi DESC ;

-- Dumping structure for view urheilijakanta.nayta_kisatyypit
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_kisatyypit`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_kisatyypit` AS SELECT 
    kt.id,
    kt.kisatyyppi,
    kt.ranking_value
FROM 
    `urheilijakanta`.`kisatyypit` kt
LEFT JOIN 
    `urheilijakanta`.`kisat` k ON kt.id = k.kisatyyppi_id
GROUP BY 
    kt.id, kt.kisatyyppi
ORDER BY 
    kt.ranking_value ASC ;

-- Dumping structure for view urheilijakanta.nayta_lajit
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_lajit`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_lajit` AS SELECT 
    l.id,
    l.urheilukategoria_id,
    l.laji,
    k.kategoria
FROM 
    `urheilijakanta`.`lajit` l
LEFT JOIN
	`urheilijakanta`.`urheilukategoriat` k ON l.urheilukategoria_id = k.id
ORDER BY 
    k.kategoria ASC ;

-- Dumping structure for view urheilijakanta.nayta_maat
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_maat`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_maat` AS SELECT 
    m.id,
    m.maa,
    m.lippu_url
FROM 
    `urheilijakanta`.`maat` m
ORDER BY 
    m.maa ASC ;

-- Dumping structure for view urheilijakanta.nayta_saavutukset
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_saavutukset`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_saavutukset` AS SELECT 
    saavutus.id AS saavutus_id,
    saavutus.urheilija_id,
    urheilija.etunimi,
    urheilija.sukunimi,
    urheilija.kutsumanimi,
    urheilija.syntymavuosi,
    urheilija.paino,
    urheilija.info,
    urheilija.urheilukategoria_id AS urheilijan_urheilukategoria_id,
    urheilijanurheilukategoria.kategoria AS urheilijan_urheilukategoria, 
    urheilija.maa_id AS urheilija_maa_id,
    urheilijanmaa.maa AS urheilijan_maa,
    urheilijanmaa.lippu_url AS urheilija_lippu_url,
    urheilija.kuva_url,
    saavutus.kisa_id AS kisa_id,
    kisa.kisa AS kisa_tapahtuma,
    kisatyyppi.id AS kisatyyppi_id,
    kisatyyppi.kisatyyppi AS kisa_kategoria,
    kisatyyppi.ranking_value,
    kisa.vuosi,
    kisa.kaupunki,
    kisa.maa_id AS kisamaa_id,
    kisamaa.maa AS kisa_maa,
    kisamaa.lippu_url AS kisa_lippu_url,   
    saavutus.saavutusluokka_id AS saavutusluokka_id,
    saavutus.laji_id,
    saavutuslaji.laji,
    saavutusluokka.saavutusluokka AS saavutus,    
    saavutus.tulos,
    saavutus.lisatieto
FROM 
    `urheilijakanta`.`saavutukset` saavutus
LEFT JOIN
	 `urheilijakanta`.`urheilijat` urheilija ON saavutus.urheilija_id = urheilija.id
LEFT JOIN 
	 `urheilijakanta`.`kisat` kisa ON saavutus.kisa_id = kisa.id
LEFT JOIN 
    `urheilijakanta`.`kisatyypit` kisatyyppi ON kisa.kisatyyppi_id = kisatyyppi.id
LEFT JOIN
	 `urheilijakanta`.`maat` kisamaa ON kisa.maa_id = kisamaa.id
LEFT JOIN
	 `urheilijakanta`.`maat` urheilijanmaa ON urheilija.maa_id = urheilijanmaa.id
LEFT JOIN
	 `urheilijakanta`.`saavutusluokat` saavutusluokka ON saavutus.saavutusluokka_id = saavutusluokka.id
LEFT JOIN
	 `urheilijakanta`.`lajit` saavutuslaji ON saavutus.laji_id = saavutuslaji.id
LEFT JOIN
	`urheilijakanta`.`urheilukategoriat` urheilijanurheilukategoria ON urheilija.urheilukategoria_id = urheilijanurheilukategoria.id

ORDER BY 
    kisatyyppi.ranking_value ASC ;

-- Dumping structure for view urheilijakanta.nayta_saavutustyypit
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_saavutustyypit`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_saavutustyypit` AS SELECT 
    s.id,
    s.saavutusluokka
FROM 
    `urheilijakanta`.`saavutusluokat` s
ORDER BY 
    s.saavutusluokka ASC ;

-- Dumping structure for view urheilijakanta.nayta_urheilijat
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_urheilijat`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_urheilijat` AS SELECT 
    urheilija.id,
    urheilija.etunimi,
    urheilija.sukunimi,
    urheilija.kutsumanimi,
    urheilija.syntymavuosi,
    urheilija.paino,
    urheilija.urheilukategoria_id,
    urheilukategoria.kategoria,
    urheilija.kuva_url,
    urheilija.maa_id,
    maa.maa,
    maa.lippu_url,
    urheilija.info,
    -- Calculate age (current year - birth year)
    YEAR(CURDATE()) - urheilija.syntymavuosi AS ika
FROM 
    `urheilijakanta`.`urheilijat` urheilija -- u
LEFT JOIN 
    `urheilijakanta`.`urheilukategoriat` urheilukategoria ON urheilija.urheilukategoria_id = urheilukategoria.id -- l
LEFT JOIN 
    `urheilijakanta`.`maat` maa ON urheilija.maa_id = maa.id
ORDER BY 
    urheilija.sukunimi, urheilija.etunimi ;

-- Dumping structure for view urheilijakanta.nayta_urheilukategoriat
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nayta_urheilukategoriat`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nayta_urheilukategoriat` AS SELECT 
    k.id,
    k.kategoria 
FROM 
    `urheilijakanta`.`urheilukategoriat` k
ORDER BY 
    k.kategoria ASC ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
