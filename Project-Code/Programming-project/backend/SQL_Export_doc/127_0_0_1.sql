-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 06 jun 2025 om 09:42
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carrierlauch`
--
CREATE DATABASE IF NOT EXISTS `carrierlauch` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `carrierlauch`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `vacatures`
--

CREATE TABLE `vacatures` (
  `id` int(11) NOT NULL,
  `bedrijf` varchar(100) DEFAULT NULL,
  `beschrijving` text DEFAULT NULL,
  `functie` varchar(100) DEFAULT NULL,
  `contract` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `vacatures`
--

INSERT INTO `vacatures` (`id`, `bedrijf`, `beschrijving`, `functie`, `contract`) VALUES
(1, 'SAP', 'SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren en te automatiseren. Het richt zich vooral op grote organisaties.', 'Business Consultant', 'Voltijds'),
(2, 'SAP', 'SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren en te automatiseren. Het richt zich vooral op grote organisaties.', 'Business Consultant', 'Voltijds'),
(3, 'SAP', 'SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren en te automatiseren. Het richt zich vooral op grote organisaties.', 'Business Consultant', 'Voltijds');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `vacatures`
--
ALTER TABLE `vacatures`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
