-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 17, 2022 lúc 05:44 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sandi_website_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `short_description` varchar(1000) DEFAULT NULL,
  `long_description` text DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_desc` varchar(1000) DEFAULT NULL,
  `meta_tag` varchar(255) DEFAULT NULL,
  `url_seo` varchar(255) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `min_quantity` int(11) DEFAULT NULL,
  `order_display` int(11) DEFAULT NULL,
  `store_address` varchar(1000) DEFAULT NULL,
  `store_status` varchar(255) DEFAULT NULL,
  `weight_unit` varchar(255) DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `size_unit` varchar(255) DEFAULT NULL,
  `size_long` decimal(10,0) DEFAULT NULL,
  `size_width` decimal(10,0) DEFAULT NULL,
  `size_high` decimal(10,0) DEFAULT NULL,
  `tax` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `short_description`, `long_description`, `meta_title`, `meta_desc`, `meta_tag`, `url_seo`, `image`, `price`, `code`, `sku`, `quantity`, `min_quantity`, `order_display`, `store_address`, `store_status`, `weight_unit`, `weight`, `size_unit`, `size_long`, `size_width`, `size_high`, `tax`, `status`) VALUES
(4, 'Con lăn thép có rãnh dẫn hướng số 4', '<p>Con lăn th&eacute;p l&agrave; một loại con lăn được sử dụng rất phổ biến trong nhiều ng&agrave;nh c&ocirc;ng nghiệp do c&oacute; nhiều ưu điểm như chi ph&iacute; vừa phải, chịu lực tốt, chịu nhiệt cao...</p>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', 'Con lăn thép có rãnh dẫn hướng', 'Con lăn thép là một loại con lăn được sử dụng rất phổ biến trong nhiều ngành công nghiệp do có nhiều ưu điểm như chi phí vừa phải, chịu lực tốt, chịu nhiệt cao...', 'Con lăn, Con lăn thép', '', 'http://localhost/blog_v2/public//storage/bang-tai-luoi-2810-1.jpg', '500000', '123', '123', 100, 1, 1, 'đan phượng, hà nội', 'sẵn hàng', 'gram', '100', 'cm', '100', '100', '100', 'vat(10%)', 0),
(5, 'Con lăn thép có rãnh dẫn hướng số 5', '<p>Con lăn th&eacute;p l&agrave; một loại con lăn được sử dụng rất phổ biến trong nhiều ng&agrave;nh c&ocirc;ng nghiệp do c&oacute; nhiều ưu điểm như chi ph&iacute; vừa phải, chịu lực tốt, chịu nhiệt cao...</p>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', 'Con lăn thép có rãnh dẫn hướng', 'Con lăn thép là một loại con lăn được sử dụng rất phổ biến trong nhiều ngành công nghiệp do có nhiều ưu điểm như chi phí vừa phải, chịu lực tốt, chịu nhiệt cao...', 'Con lăn, Con lăn thép', '', '', '0', '', '', 0, 0, 0, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(6, 'Con lăn thép có rãnh dẫn hướng số 6', '<p>Con lăn th&eacute;p l&agrave; một loại con lăn được sử dụng rất phổ biến trong nhiều ng&agrave;nh c&ocirc;ng nghiệp do c&oacute; nhiều ưu điểm như chi ph&iacute; vừa phải, chịu lực tốt, chịu nhiệt cao...</p>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', 'Con lăn thép có rãnh dẫn hướng', 'Con lăn thép là một loại con lăn được sử dụng rất phổ biến trong nhiều ngành công nghiệp do có nhiều ưu điểm như chi phí vừa phải, chịu lực tốt, chịu nhiệt cao...', 'Con lăn, Con lăn thép', '', '', '0', '', '', 0, 0, 0, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(7, 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `product_id` (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
