-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 08 jun 2025 om 16:05
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

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

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `bedrijf`
--

CREATE TABLE `bedrijf` (
  `bedrijf_id` int(11) NOT NULL,
  `naam` varchar(255) DEFAULT NULL,
  `locatie` varchar(255) DEFAULT NULL,
  `vertegenwoordiger` varchar(100) DEFAULT NULL,
  `telefoon` varchar(20) DEFAULT NULL,
  `logo_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `bedrijf`
--

INSERT INTO `bedrijf` (`bedrijf_id`, `naam`, `locatie`, `vertegenwoordiger`, `telefoon`, `logo_link`) VALUES
(2, 'SAP', 'Brussel', 'Johan Vermeer', '+32 2 345 67 89', 'logo_sap.png'),
(3, 'Delaware', 'Kortrijk', 'Tim Smit', '+32 2 987 65 43', 'logo_delaware.png');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `gebruiker`
--

CREATE TABLE `gebruiker` (
  `gebruiker_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `wachtwoord` varchar(255) NOT NULL,
  `rol` enum('student','bedrijf','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `gebruiker`
--

INSERT INTO `gebruiker` (`gebruiker_id`, `email`, `wachtwoord`, `rol`) VALUES
(1, 'jan.voorbeeld@student.ehb.be', 'veilig_wachtwoord', 'student'),
(2, 'contact@sap.com', 'hashed_password_2', 'bedrijf'),
(3, 'contact@delaware.com', 'hashed_password_3', 'bedrijf');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `speeddate`
--

CREATE TABLE `speeddate` (
  `speeddate_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `bedrijf_id` int(11) DEFAULT NULL,
  `tijdstip` datetime DEFAULT NULL,
  `locatie` varchar(100) DEFAULT NULL,
  `status` enum('bevestigd','geannuleerd') DEFAULT 'bevestigd'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `speeddate`
--

INSERT INTO `speeddate` (`speeddate_id`, `student_id`, `bedrijf_id`, `tijdstip`, `locatie`, `status`) VALUES
(1, 1, 2, '2025-06-05 14:45:00', 'Aula 4', 'bevestigd'),
(2, 1, 3, '2025-06-05 15:05:00', 'Aula 1', 'bevestigd');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `voornaam` varchar(100) DEFAULT NULL,
  `naam` varchar(100) DEFAULT NULL,
  `opleiding` varchar(255) DEFAULT NULL,
  `specialisatie` varchar(255) DEFAULT NULL,
  `opleidingsjaar` int(11) DEFAULT NULL,
  `adres` varchar(255) DEFAULT NULL,
  `talen` varchar(255) DEFAULT NULL,
  `telefoon` varchar(20) DEFAULT NULL,
  `geslacht` varchar(10) DEFAULT NULL,
  `cv_link` varchar(255) DEFAULT NULL,
  `diploma_link` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profiel_foto_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `student`
--

INSERT INTO `student` (`student_id`, `voornaam`, `naam`, `opleiding`, `specialisatie`, `opleidingsjaar`, `adres`, `talen`, `telefoon`, `geslacht`, `cv_link`, `diploma_link`, `email`, `bio`, `profiel_foto_url`) VALUES
(1, 'Jan', 'Voorbeeldstudent', 'Toegepaste Informatica', NULL, 2025, NULL, NULL, NULL, NULL, NULL, NULL, 'jan.voorbeeld@student.ehb.be', 'Ik ben een enthousiaste student Toegepaste Informatica aan de Erasmushogeschool Brussel. Mijn passie ligt bij front-end ontwikkeling en het creëren van gebruiksvriendelijke webapplicaties. Ik ben leergierig, werk graag in teamverband en ben altijd op zoek naar nieuwe uitdagingen om mijn vaardigheden verder te ontwikkelen.', 'https://via.placeholder.com/150');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `student_vaardigheid`
--

CREATE TABLE `student_vaardigheid` (
  `student_id` int(11) NOT NULL,
  `vaardigheid_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `student_vaardigheid`
--

INSERT INTO `student_vaardigheid` (`student_id`, `vaardigheid_id`) VALUES
(1, 'skill1'),
(1, 'skill2'),
(1, 'skill3'),
(1, 'skill4'),
(1, 'skill5'),
(1, 'skill6'),
(1, 'skill7');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `vaardigheid`
--

CREATE TABLE `vaardigheid` (
  `id` varchar(255) NOT NULL,
  `naam` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `vaardigheid`
--

INSERT INTO `vaardigheid` (`id`, `naam`) VALUES
('skill1', 'React.js'),
('skill2', 'JavaScript'),
('skill3', 'Node.js'),
('skill4', 'Express.js'),
('skill5', 'HTML5'),
('skill6', 'CSS3'),
('skill7', 'Git');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `vacature`
--

CREATE TABLE `vacature` (
  `vacature_id` int(11) NOT NULL,
  `bedrijf_id` int(11) DEFAULT NULL,
  `functie` varchar(255) DEFAULT NULL,
  `contract_type` varchar(50) DEFAULT NULL,
  `synopsis` text DEFAULT NULL,
  `open` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `vacature`
--

INSERT INTO `vacature` (`vacature_id`, `bedrijf_id`, `functie`, `contract_type`, `synopsis`, `open`) VALUES
(1, 2, 'Business Consultant', 'Voltijds', 'SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren...', 1),
(2, 3, 'Junior Software Developer', 'Voltijds', 'Je werkt mee aan ERP-implementaties en ontwikkelt maatoplossingen.', 1),
(3, 3, 'IT Support Medewerker', 'Voltijds', 'BlueByte zoekt een klantvriendelijke supportmedewerker met technische feeling.', 1);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `bedrijf`
--
ALTER TABLE `bedrijf`
  ADD PRIMARY KEY (`bedrijf_id`);

--
-- Indexen voor tabel `gebruiker`
--
ALTER TABLE `gebruiker`
  ADD PRIMARY KEY (`gebruiker_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexen voor tabel `speeddate`
--
ALTER TABLE `speeddate`
  ADD PRIMARY KEY (`speeddate_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `bedrijf_id` (`bedrijf_id`);

--
-- Indexen voor tabel `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexen voor tabel `student_vaardigheid`
--
ALTER TABLE `student_vaardigheid`
  ADD PRIMARY KEY (`student_id`,`vaardigheid_id`),
  ADD KEY `vaardigheid_id` (`vaardigheid_id`);

--
-- Indexen voor tabel `vaardigheid`
--
ALTER TABLE `vaardigheid`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `vacature`
--
ALTER TABLE `vacature`
  ADD PRIMARY KEY (`vacature_id`),
  ADD KEY `bedrijf_id` (`bedrijf_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `gebruiker`
--
ALTER TABLE `gebruiker`
  MODIFY `gebruiker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `speeddate`
--
ALTER TABLE `speeddate`
  MODIFY `speeddate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `vacature`
--
ALTER TABLE `vacature`
  MODIFY `vacature_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `bedrijf`
--
ALTER TABLE `bedrijf`
  ADD CONSTRAINT `bedrijf_ibfk_1` FOREIGN KEY (`bedrijf_id`) REFERENCES `gebruiker` (`gebruiker_id`);

--
-- Beperkingen voor tabel `speeddate`
--
ALTER TABLE `speeddate`
  ADD CONSTRAINT `speeddate_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `speeddate_ibfk_2` FOREIGN KEY (`bedrijf_id`) REFERENCES `bedrijf` (`bedrijf_id`);

--
-- Beperkingen voor tabel `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `gebruiker` (`gebruiker_id`);

--
-- Beperkingen voor tabel `student_vaardigheid`
--
ALTER TABLE `student_vaardigheid`
  ADD CONSTRAINT `student_vaardigheid_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_vaardigheid_ibfk_2` FOREIGN KEY (`vaardigheid_id`) REFERENCES `vaardigheid` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `vacature`
--
ALTER TABLE `vacature`
  ADD CONSTRAINT `vacature_ibfk_1` FOREIGN KEY (`bedrijf_id`) REFERENCES `bedrijf` (`bedrijf_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
