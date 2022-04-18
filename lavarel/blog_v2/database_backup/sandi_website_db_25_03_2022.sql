-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 25, 2022 lúc 05:39 AM
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
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_desc` varchar(1000) DEFAULT NULL,
  `meta_tag` varchar(255) DEFAULT NULL,
  `url_seo` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `order_display` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `meta_title`, `meta_desc`, `meta_tag`, `url_seo`, `parent_id`, `image`, `order_display`, `status`) VALUES
(16, 'Dây băng tải', NULL, NULL, NULL, NULL, 'day_bang_tai', 0, NULL, NULL, 1),
(17, 'Băng tải PVC', NULL, NULL, NULL, NULL, 'bang_tai_pvc', 16, NULL, NULL, 1),
(18, 'Băng tải PU', NULL, NULL, NULL, NULL, 'bang_tai_pu', 16, NULL, NULL, 1),
(19, 'Băng tải lưới', NULL, NULL, NULL, NULL, 'bang_tai_luoi', 16, NULL, NULL, 1),
(20, 'Băng tải thành phẩm', NULL, NULL, NULL, NULL, 'bang_tai_thanh_pham', 16, NULL, NULL, 1),
(21, 'Động cơ băng tải', NULL, NULL, NULL, NULL, 'dong_co_bang_tai', 0, NULL, NULL, 1),
(22, 'Động Cơ SPG', NULL, NULL, NULL, NULL, 'dong_co_spg', 21, NULL, NULL, 1),
(23, 'Động Cơ ZD', NULL, NULL, NULL, NULL, 'dong_co_zd', 21, NULL, NULL, 1),
(24, 'Động Cơ LUYANG', NULL, NULL, NULL, NULL, 'dong_co_luyang', 21, NULL, NULL, 1),
(25, 'Động Cơ Wanshsin', NULL, NULL, NULL, NULL, 'dong_co_wanshsin', 21, NULL, NULL, 1),
(26, 'Phụ Kiện Băng Tải', NULL, NULL, NULL, NULL, 'phu_kien_bang_tai', 0, NULL, NULL, 1),
(27, 'Hệ thống băng tải', NULL, NULL, NULL, NULL, 'he_thong_bang_tai', 0, NULL, NULL, 1),
(28, 'Nhôm Định Hình', NULL, NULL, NULL, NULL, 'nhom_dinh_hinh', 0, NULL, NULL, 1),
(29, 'Thảm Cao Su ESD', NULL, NULL, NULL, NULL, 'tham_cao_su_esd', 0, NULL, NULL, 1),
(30, 'Con Lăn Băng Tải', NULL, NULL, NULL, NULL, 'con_lan_bang_tai', 26, NULL, NULL, 1),
(31, 'Pulley Đai Răng', NULL, NULL, NULL, NULL, 'pulley_dai_rang', 26, NULL, NULL, 1),
(32, 'Dây Đai', NULL, NULL, NULL, NULL, 'day_dai', 26, NULL, NULL, 1),
(33, 'Gân Dẫn Hướng', NULL, NULL, NULL, NULL, 'gan_dan_huong', 26, NULL, NULL, 1),
(34, 'Băng tải PVC dạng lưới', NULL, NULL, NULL, NULL, 'bang_tai_pvc_dang_luoi', 17, NULL, NULL, 1),
(35, 'Băng tải PVC dạng liền', NULL, NULL, NULL, NULL, 'bang_tai_pvc_dang_lien', 17, NULL, NULL, 1),
(36, 'Băng tải PVC có bèo', NULL, NULL, NULL, NULL, 'bang_tai_pvc_co_beo', 17, NULL, NULL, 1),
(37, 'Vách ngăn', NULL, NULL, NULL, NULL, 'vach_ngan', 26, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `type` tinyint(4) DEFAULT NULL,
  `relation_id` int(11) DEFAULT NULL,
  `order_display` int(11) DEFAULT 999,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `menus`
--

INSERT INTO `menus` (`id`, `name`, `parent_id`, `type`, `relation_id`, `order_display`, `status`) VALUES
(1, 'Dây băng tải', 14, 1, 16, 1, 1),
(3, 'Băng tải PVC', 1, 1, 17, 999, 1),
(4, 'Băng tải PU', 1, 1, 18, 999, 1),
(5, 'Băng tải lưới', 1, 1, 19, 999, 1),
(6, 'Băng tải thành phẩm', 1, 1, 20, 999, 1),
(7, 'Động cơ băng tải', 14, 1, 21, 2, 1),
(8, 'Động Cơ SPG', 7, 1, 22, 999, 1),
(9, 'Động Cơ ZD', 7, 1, 23, 999, 1),
(10, 'Động Cơ LUYANG', 7, 1, 24, 999, 1),
(11, 'Động Cơ Wanshsin', 7, 1, 25, 999, 1),
(12, 'Trang chủ', 0, 5, 1, 1, 1),
(13, 'Về chúng tôi', 0, 5, 3, 3, 1),
(14, 'Sản phẩm', 0, 5, 2, 2, 1),
(15, 'Phụ Kiện Băng Tải', 14, 1, 26, 3, 1),
(16, 'Con Lăn Băng Tải', 15, 1, 30, 999, 1),
(17, 'Pulley Đai Răng', 15, 1, 31, 999, 1),
(18, 'Dây Đai', 15, 1, 32, 999, 1),
(19, 'Gân Dẫn Hướng', 15, 1, 33, 999, 1),
(20, 'Vách Ngăn', 15, 1, 37, 999, 1),
(21, 'Hệ thống băng tải', 14, 1, 27, 4, 1),
(22, 'Nhôm Định Hình', 14, 1, 28, 6, 1),
(23, 'Thảm Cao Su ESD', 14, 1, 29, 5, 1),
(24, 'Bản vẽ kỹ thuật', 0, NULL, NULL, 999, 1),
(25, 'Tin tức', 0, NULL, NULL, 999, 1),
(26, 'Liên hệ', 0, 5, 4, 999, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menu_type`
--

CREATE TABLE `menu_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `menu_type`
--

INSERT INTO `menu_type` (`id`, `name`) VALUES
(1, 'Danh mục sản phẩm'),
(2, 'Sản phẩm'),
(3, 'Danh mục tin tức'),
(4, 'Tin tức'),
(5, 'Trang tĩnh'),
(6, 'Trang thông tin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_description` varchar(1000) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_desc` varchar(255) DEFAULT NULL,
  `meta_tag` varchar(255) DEFAULT NULL,
  `url_seo` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `short_description`, `content`, `meta_title`, `meta_desc`, `meta_tag`, `url_seo`, `image`, `status`) VALUES
(1, 'tin tức số 1', '<p>abc</p>', '<p>abc</p>', 'abc', 'abc', 'abc', 'tin_tuc_so_1', NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_categories`
--

CREATE TABLE `news_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `meta_desc` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_tag` varchar(255) DEFAULT NULL,
  `url_seo` varchar(255) DEFAULT NULL,
  `order_display` int(11) NOT NULL DEFAULT 999,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `news_categories`
--

INSERT INTO `news_categories` (`id`, `name`, `image`, `description`, `meta_desc`, `meta_title`, `meta_tag`, `url_seo`, `order_display`, `status`) VALUES
(1, 'Tin tức', 'http://127.0.0.1:8000/storage/bang-tai-luoi-2810-1.jpg', '<p>Danh mục tin tức</p>', 'Danh mục tin tức', 'Danh mục tin tức', 'Danh mục tin tức', 'tin_tuc', 999, 1),
(2, 'Bản vẽ kỹ thuật', 'http://127.0.0.1:8000/storage/bang-tai-luoi-2810-1.jpg', '<p>Danh mục bản vẽ kỹ thuật</p>', 'Danh mục bản vẽ kỹ thuật', 'Danh mục bản vẽ kỹ thuật', 'Danh mục bản vẽ kỹ thuật', 'ban_ve_ky_thuat', 999, 1),
(3, 'Bảng mã puly', 'http://127.0.0.1:8000/storage/bang-tai-luoi-2810-1.jpg', '<p>Danh mục bảng m&atilde; puly</p>', 'Danh mục bảng mã puly', 'Danh mục bảng mã puly', 'Danh mục bảng mã puly', 'bang_ma_puly', 999, 1),
(4, 'Thông báo tuyển dụng', NULL, NULL, NULL, NULL, NULL, 'thong_bao_tuyen_dung', 999, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_category`
--

CREATE TABLE `news_category` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `categor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `provider` varchar(255) DEFAULT NULL,
  `characteristic` text DEFAULT NULL,
  `application` text DEFAULT NULL,
  `user_manual` text DEFAULT NULL,
  `solid_work_code` varchar(1000) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `short_description`, `long_description`, `meta_title`, `meta_desc`, `meta_tag`, `url_seo`, `image`, `price`, `code`, `sku`, `quantity`, `min_quantity`, `order_display`, `store_address`, `store_status`, `weight_unit`, `weight`, `size_unit`, `size_long`, `size_width`, `size_high`, `tax`, `provider`, `characteristic`, `application`, `user_manual`, `solid_work_code`, `status`) VALUES
(4, 'Con lăn thép có rãnh dẫn hướng số 4', '<p>Con lăn th&eacute;p l&agrave; một loại con lăn được sử dụng rất phổ biến trong nhiều ng&agrave;nh c&ocirc;ng nghiệp do c&oacute; nhiều ưu điểm như chi ph&iacute; vừa phải, chịu lực tốt, chịu nhiệt cao...</p>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', 'Con lăn thép có rãnh dẫn hướng', 'Con lăn thép là một loại con lăn được sử dụng rất phổ biến trong nhiều ngành công nghiệp do có nhiều ưu điểm như chi phí vừa phải, chịu lực tốt, chịu nhiệt cao...', 'Con lăn, Con lăn thép', 'con_lan_thep_co_ranh_dan_huong_so_4', 'http://127.0.0.1:8000/storage/luoi-ngang-8.jpg', '500000', '123', '123', 100, 1, 1, 'đan phượng, hà nội', 'sẵn hàng', 'gram', '100', 'cm', '100', '100', '100', 'vat(10%)', NULL, '', '', '', '<iframe scrolling=\'no\' frameborder=\'0\' allowfullscreen=\'true\' src=\'https://www.3dcontentcentral.com/external-site-embed.aspx?format=3D&catalogid=171&modelid=1752828&width=250&height=250&edraw=true\' name=\'PreviewFrame3D\' id=\'PreviewFrame3D\' width=\'400\' height=\'400\'></iframe><br /><a href=\'https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=1752828\'>Download</a>', 0),
(5, 'Con lăn thép có rãnh dẫn hướng số 5', '<p>Con lăn th&eacute;p l&agrave; một loại con lăn được sử dụng rất phổ biến trong nhiều ng&agrave;nh c&ocirc;ng nghiệp do c&oacute; nhiều ưu điểm như chi ph&iacute; vừa phải, chịu lực tốt, chịu nhiệt cao...</p>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"../storage/luoi-ngang-2.jpg\" alt=\"\" width=\"400\" height=\"300\" /></p>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', 'Con lăn thép có rãnh dẫn hướng', 'Con lăn thép là một loại con lăn được sử dụng rất phổ biến trong nhiều ngành công nghiệp do có nhiều ưu điểm như chi phí vừa phải, chịu lực tốt, chịu nhiệt cao...', 'Con lăn, Con lăn thép', 'con_lan_thep_co_ranh_dan_huong_so_5', NULL, '0', NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'abc', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"../storage/luoi-ngang-2.jpg\" alt=\"\" width=\"400\" height=\"300\" /></p>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"../storage/luoi-ngang-2.jpg\" alt=\"\" width=\"400\" height=\"300\" /></p>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"../storage/luoi-ngang-2.jpg\" alt=\"\" width=\"400\" height=\"300\" /></p>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', '<iframe scrolling=\'no\' frameborder=\'0\' allowfullscreen=\'true\' src=\'https://www.3dcontentcentral.com/external-site-embed.aspx?format=3D&catalogid=171&modelid=1752828&width=250&height=250&edraw=true\' name=\'PreviewFrame3D\' id=\'PreviewFrame3D\' width=\'400\' height=\'400\'></iframe><br /><a href=\'https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=1752828\'>Download</a>', 0),
(6, 'Con lăn thép có rãnh dẫn hướng số 6', '<p>Con lăn th&eacute;p l&agrave; một loại con lăn được sử dụng rất phổ biến trong nhiều ng&agrave;nh c&ocirc;ng nghiệp do c&oacute; nhiều ưu điểm như chi ph&iacute; vừa phải, chịu lực tốt, chịu nhiệt cao...</p>', '<p><strong>Giới thiệu cấu tạo của con lăn th&eacute;p:&nbsp;</strong>(K&iacute;ch thước con lăn c&oacute; thể thay đổi t&ugrave;y theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng)</p>\r\n<ul>\r\n<li>Con lăn c&oacute; cấu tạo từ c&aacute;c bộ phận ch&iacute;nh sau: Ống, trục, v&ograve;ng bi, ca bi, v&ograve;ng phanh.</li>\r\n<li>Ống: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh ống &Phi;50.</li>\r\n<li>Trục: L&agrave;m từ th&eacute;p SS400. Đường k&iacute;nh trục &Phi;12.</li>\r\n<li>V&ograve;ng bi c&oacute; m&atilde;: 6204Z</li>\r\n<li>Chiều d&agrave;i con lăn: 200mm</li>\r\n</ul>\r\n<p><strong>Nguy&ecirc;n l&yacute; hoạt động:</strong></p>\r\n<ul>\r\n<li>Trục của con lăn v&agrave; ca trong của v&ograve;ng bi đứng im.</li>\r\n<li>Ống của con lăn v&agrave; ca ngo&agrave;i v&ograve;ng bi quay tr&ograve;n do lực ma s&aacute;t từ d&acirc;y d&acirc;y băng tải. Khi con lăn chủ động cấp chuyển động quay cho d&acirc;y băng tải sẽ k&eacute;o con lăn th&eacute;p chuyển động theo.</li>\r\n</ul>\r\n<p><strong>Đặc điểm của con lăn th&eacute;p:</strong></p>\r\n<ul>\r\n<li>Độ đồng t&acirc;m giữa trục v&agrave; ống con lăn c&oacute; sai số thấp.</li>\r\n<li>C&oacute; khả năng chịu lực cực tốt, chống m&agrave;i m&ograve;n.</li>\r\n<li>Con lăn hoạt động được trong nhiều điều kiện m&ocirc;i trường kh&aacute;c nhau.</li>\r\n<li>Khả năng chịu nhiệt độ cao tốt.</li>\r\n<li>Cấu tạo đơn giản, dễ d&agrave;ng lắp đặt.</li>\r\n<li>Vận h&agrave;nh linh hoạt, độ tin cậy cao.</li>\r\n<li>Gi&aacute; th&agrave;nh hợp l&yacute;, chi ph&iacute; bảo tr&igrave; thấp.</li>\r\n</ul>', 'Con lăn thép có rãnh dẫn hướng', 'Con lăn thép là một loại con lăn được sử dụng rất phổ biến trong nhiều ngành công nghiệp do có nhiều ưu điểm như chi phí vừa phải, chịu lực tốt, chịu nhiệt cao...', 'Con lăn, Con lăn thép', 'con_lan_thep_co_ranh_dan_huong_so_6', '', '0', '', '', 0, 0, 0, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_category`
--

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product_category`
--

INSERT INTO `product_category` (`id`, `product_id`, `category_id`) VALUES
(20, 5, 5),
(21, 24, 5),
(22, 24, 6),
(23, 5, 16),
(27, 6, 16),
(28, 6, 17),
(29, 4, 34);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `image_url`) VALUES
(4, 4, 'http://127.0.0.1:8000/storage/luoi-ngang-1.jpg'),
(5, 4, 'http://127.0.0.1:8000/storage/luoi-ngang-2.jpg'),
(6, 4, 'http://127.0.0.1:8000/storage/luoi-ngang-3.jpg'),
(27, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-9.jpg'),
(28, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-2.jpg'),
(29, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-4.jpg'),
(30, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-3.jpg'),
(31, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-4.jpg'),
(32, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-4.jpg'),
(33, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-9.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `static_pages`
--

CREATE TABLE `static_pages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url_seo` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `static_pages`
--

INSERT INTO `static_pages` (`id`, `name`, `url_seo`, `status`) VALUES
(1, 'Trang chủ', '', 1),
(2, 'Tất cả sản phẩm', 'san_pham', 1),
(3, 'Về chúng tôi', 've_chung_toi', 1),
(4, 'Liên hệ', 'lien_he', 1),
(5, 'Đăng ký', 'dang_ky', 1),
(6, 'Đăng nhập', 'dang_nhap', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `url_seo_list`
--

CREATE TABLE `url_seo_list` (
  `id` int(11) NOT NULL,
  `url_seo` varchar(255) NOT NULL,
  `url_type` int(11) NOT NULL,
  `relation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `url_seo_list`
--

INSERT INTO `url_seo_list` (`id`, `url_seo`, `url_type`, `relation_id`) VALUES
(1, 'dong-co-spg', 1, 2),
(2, 'dong-co-zd', 1, 3),
(3, 'dong-co-zd-120w-ti-so-truyen-1-30', 2, 2),
(4, 'day_bang_tai', 1, 16),
(5, 'con_lan_thep_co_ranh_dan_huong_so_4', 2, 4),
(6, 'con_lan_thep_co_ranh_dan_huong_so_5', 2, 5),
(7, 'con_lan_thep_co_ranh_dan_huong_so_6', 2, 6),
(8, 'test', 1, 34),
(9, 'bang_tai_pvc_dang_luoi', 1, 34),
(10, 'bang_tai_pvc_dang_lien', 1, 35),
(11, 'bang_tai_pvc_co_beo', 1, 36),
(12, 'bang_tai_pu', 1, 18),
(13, 'bang_tai_pvc', 1, 17),
(14, 'bang_tai_luoi', 1, 19),
(15, 'bang_tai_thanh_pham', 1, 20),
(16, 'dong_co_bang_tai', 1, 21),
(17, 'dong_co_spg', 1, 22),
(18, 'dong_co_zd', 1, 23),
(19, 'tham_cao_su_esd', 1, 29),
(20, 'nhom_dinh_hinh', 1, 28),
(21, 'he_thong_bang_tai', 1, 27),
(22, 'phu_kien_bang_tai', 1, 26),
(23, 'con_lan_bang_tai', 1, 30),
(24, 'pulley_dai_rang', 1, 31),
(25, 'day_dai', 1, 32),
(26, 'gan_dan_huong', 1, 33),
(27, 'dong_co_luyang', 1, 24),
(28, 'dong_co_wanshsin', 1, 25),
(29, 'vach_ngan', 1, 37),
(30, '', 5, 1),
(31, 'san_pham', 5, 2),
(32, 've_chung_toi', 5, 3),
(33, 'lien_he', 5, 4),
(34, 'dang_ky', 5, 5),
(35, 'dang_nhap', 5, 6),
(36, 'tin_tuc', 3, 1),
(37, 'ban_ve_ky_thuat', 3, 2),
(38, 'bang_ma_puly', 3, 3),
(39, 'thong_bao_tuyen_dung', 3, 4),
(40, 'tin_tuc_so_1', 4, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `menu_type`
--
ALTER TABLE `menu_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news_categories`
--
ALTER TABLE `news_categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news_category`
--
ALTER TABLE `news_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `product_id` (`id`);

--
-- Chỉ mục cho bảng `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `static_pages`
--
ALTER TABLE `static_pages`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `url_seo_list`
--
ALTER TABLE `url_seo_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `menu_type`
--
ALTER TABLE `menu_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `news_category`
--
ALTER TABLE `news_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `static_pages`
--
ALTER TABLE `static_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `url_seo_list`
--
ALTER TABLE `url_seo_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
