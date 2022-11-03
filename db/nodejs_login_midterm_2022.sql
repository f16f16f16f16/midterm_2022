-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 03, 2022 at 05:13 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_login_midterm_2022`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`) VALUES
(2, 'f16', '1234'),
(6, 'folky', 'f16'),
(8, 'ffff', '1111');

-- --------------------------------------------------------

--
-- Table structure for table `extra`
--

CREATE TABLE `extra` (
  `id` varchar(20) NOT NULL,
  `count` int(10) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `extra`
--

INSERT INTO `extra` (`id`, `count`, `time`) VALUES
('f16', 1, '2022-11-03 10:11:22'),
('fff', 1, '2022-11-03 11:45:12'),
('fff', 1, '2022-11-03 11:45:50'),
('fff', 1, '2022-11-03 11:49:48'),
('f16', 1, '2022-11-03 11:50:48'),
('f16', 1, '2022-11-03 12:03:50'),
('ffff', 1, '2022-11-03 12:05:42'),
('f16', 1, '2022-11-03 12:06:27'),
('ffff', 1, '2022-11-03 12:10:32'),
('f16', 1, '2022-11-03 12:15:23'),
('f16', 1, '2022-11-03 12:19:12'),
('f16', 1, '2022-11-03 12:20:08'),
('f16', 1, '2022-11-03 12:33:12'),
('f16', 1, '2022-11-03 12:33:28'),
('f16', 1, '2022-11-03 12:34:01'),
('f16', 1, '2022-11-03 13:19:18'),
('f16', 1, '2022-11-03 15:42:21'),
('f16', 1, '2022-11-03 15:47:51'),
('f16', 1, '2022-11-03 15:48:05'),
('f16', 1, '2022-11-03 15:48:48'),
('f16', 1, '2022-11-03 15:50:30'),
('fffff', 1, '2022-11-03 15:59:48'),
('f16', 1, '2022-11-03 16:01:23'),
('folky', 1, '2022-11-03 16:02:23'),
('folky', 1, '2022-11-03 16:03:57'),
('f16', 1, '2022-11-03 16:05:04'),
('f16', 1, '2022-11-03 16:10:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
