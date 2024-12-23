-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 17, 2024 at 02:59 PM
-- Server version: 8.0.40-0ubuntu0.22.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `master`
--

-- --------------------------------------------------------

--
-- Table structure for table `penelitian`
--

CREATE TABLE `penelitian` (
  `kd_penelitian` int NOT NULL,
  `judul` text NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `thn_akademik` varchar(9) NOT NULL,
  `tanggal` date NOT NULL,
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penelitian`
--

INSERT INTO `penelitian` (`kd_penelitian`, `judul`, `lokasi`, `thn_akademik`, `tanggal`, `status`) VALUES
(1, '-', '-', '-', '0000-00-00', 0),
(2, 'Penerapan Metode Algoritma C4.5 Untuk Prediksi Mahaiswa Non Aktif', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-03-03', 2),
(3, 'Penerapan Web Service Untuk Meningkatkan Performa Kecepatan Data Pada Sistem TPA', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-01', 2),
(4, 'Penerapan Algoritma N-Gram Dan Winnowing Untuk Deteksi Plagiarisme Usulan Dokumen Perguruan Tinggi', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-02', 2),
(5, 'Penerapan Internet Of Things Untuk Pengontrolan Lampu Rumah Melalui Chatting Via Telegram', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-07', 2),
(6, 'Penerapan Internet Of Things Untuk Notifikasi Ketersediaan Pakan Ayam Menggunakan Aplikasi Chat', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-02', 2),
(7, 'Penerapan Metode Representational State Transfer (Restfull) Web Services Pada Pembuatan KTP Dan Kartu Keluarga', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-06', 2),
(8, 'Aplikasi Keamanan Data Gambar Menggunakan Algoritma RSA (Rivest Shamir Adleman) Berbasis Desktop', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-08', 2),
(9, 'Penerapan Algoritma Rivest Shamir Adleman Untuk Meningkatkan Keamanan Virtual Private Network', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-08', 2),
(10, 'Sistem Informasi Nilai Akademik Mahasiswa Menggunakan Teknik Json dan NFC', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-08', 2),
(11, 'Penerapan Internet of Things Berbasis Teknologi Voice User Interface Untuk Kendali Jarak Jauh Dengan Node MCU 8266 Pada Rumah Pintar', 'Universitas Binaniaga Indonesia', '2021/2022', '2021-12-08', 2),
(12, 'Efektivitas Iklan Media Sosial untuk Optimasi Digital Marketing UMKM', 'Bogor', '2022/2023', '2023-01-04', 2),
(13, 'contoh judul', 'Universitas Binaniaga Indonesia', '2022/2023', '2023-01-06', 2),
(14, 'Effektivitas Iklan Media Sosial untuk Optimasi Digitak Marketing UMKM', 'Kota Bogor', '2022/2023', '2023-01-03', 2),
(15, 'contoh judul 2', 'Kampus Universitas Binaniaga Indonesia', '2022/2023', '2023-01-06', 2),
(16, 'Penerapan Metode Naive Bayes Classifier Untuk Penentuan Topik Tugas Akhir', 'Universitas Binaniaga Indonesia', '2022/2023', '2023-01-07', 1),
(17, 'Contoh', 'Universitas Binaniaga Indonesia ', '2022/2023', '2023-01-09', 0),
(18, 'Strategi Pemasaran Dan Rencana Bisnis Sebagai Upaya Peningkatan Penjualan Bagi IKM Universitas Binaniaga', 'IKM Universitas Binaniaga', '2022/2023', '2023-01-20', 0),
(19, 'Analisis arus uang arus barang dalam rangka pembuktian faktur pajak cacat terhadap pemeriksa pajak tahun 2019', 'PT.Pionirbeton Industri', '2022/2023', '2022-08-01', 0),
(20, '<!DOCTYPE html> <html lang=\"en\"> <head>     <meta charset=\"UTF-8\">     <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">     <title>Document</title> </head> <body>     <p>lala</p> </body> </html>', '<!DOCTYPE html> <html lang=\"en\"> <head>     <meta charset=\"UTF-8\">     <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">     <title>Document</title> </head> <body>     <p>lala</p> </body> </html>', '2023/2024', '2024-07-12', 1),
(21, 'Pengaruh Lingkungan Kerja dan Beban Kerja terhadap Produktivitas Kerja Karyawan PT. Alva Karya Perkasa Kantor Cabang Sari Husada Jakarta Selatan', 'PT.Alva karya perkasa jakarta selaatan', '2023/2024', '2024-04-23', 0),
(22, 'PENGARUH KUALITAS PELAYANAN JASA , LOYALITAS  PELANGGAN DAN KEPUASAAN PELANGGAN TERHADAP PENINGKATAN   USAHA PADA PT.KIJANG EMAS SEJAHTERA  BOGOR   (Studi  kasus  penguna  jasa indihome)', 'PT.kijang emas sejahtera  Bogor', '2024/2025', '2024-09-10', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `penelitian`
--
ALTER TABLE `penelitian`
  ADD PRIMARY KEY (`kd_penelitian`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
