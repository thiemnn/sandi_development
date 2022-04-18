-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 01, 2022 lúc 12:30 PM
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
(16, 'Dây băng tải', NULL, NULL, NULL, NULL, 'day_bang_tai', 0, 'http://127.0.0.1:8000/storage/bang tai pvc/bang-tai-pvc-caro-den-2-3mm-chong-tinh-dien-1.jpg', NULL, 1),
(17, 'Băng tải PVC', NULL, NULL, NULL, NULL, 'bang_tai_pvc', 16, 'http://127.0.0.1:8000/storage/bang tai pvc/bang-tai-beo-xanh-1.jpg', NULL, 1),
(18, 'Băng tải PU', NULL, NULL, NULL, NULL, 'bang_tai_pu', 16, NULL, NULL, 1),
(19, 'Băng tải lưới', NULL, NULL, NULL, NULL, 'bang_tai_luoi', 16, NULL, NULL, 1),
(20, 'Băng tải thành phẩm', NULL, NULL, NULL, NULL, 'bang_tai_thanh_pham', 16, NULL, NULL, 1),
(21, 'Động cơ băng tải', NULL, NULL, NULL, NULL, 'dong_co_bang_tai', 0, 'http://127.0.0.1:8000/storage/Dong co/wanshsin/dong-co-wanshsin-200w.jpg', NULL, 1),
(22, 'Động Cơ SPG', NULL, NULL, NULL, NULL, 'dong_co_spg', 21, NULL, NULL, 1),
(23, 'Động Cơ ZD', NULL, NULL, NULL, NULL, 'dong_co_zd', 21, NULL, NULL, 1),
(24, 'Động Cơ LUYANG', NULL, NULL, NULL, NULL, 'dong_co_luyang', 21, NULL, NULL, 1),
(25, 'Động Cơ Wanshsin', NULL, NULL, NULL, NULL, 'dong_co_wanshsin', 21, NULL, NULL, 1),
(26, 'Phụ Kiện Băng Tải', NULL, NULL, NULL, NULL, 'phu_kien_bang_tai', 0, 'http://127.0.0.1:8000/storage/con lan/con-lan-boc-nham-gai-1.jpg', NULL, 1),
(27, 'Hệ thống băng tải', NULL, NULL, NULL, NULL, 'he_thong_bang_tai', 0, 'http://127.0.0.1:8000/storage/bang tai/he thong/bang-tai-nang-ha-183-1.jpg', NULL, 1),
(28, 'Nhôm Định Hình', NULL, NULL, NULL, NULL, 'nhom_dinh_hinh', 0, 'http://127.0.0.1:8000/storage/Nhom/nhom-dinh-hinh-40x40.png', NULL, 1),
(29, 'Thảm Cao Su ESD', NULL, NULL, NULL, NULL, 'tham_cao_su_esd', 0, 'http://127.0.0.1:8000/storage/thamchongtinhdien.webp', NULL, 1),
(30, 'Con Lăn Băng Tải', NULL, NULL, NULL, NULL, 'con_lan_bang_tai', 26, NULL, NULL, 1),
(31, 'Pulley Đai Răng', NULL, NULL, NULL, NULL, 'pulley_dai_rang', 26, NULL, NULL, 1),
(32, 'Dây Đai', NULL, NULL, NULL, NULL, 'day_dai', 26, NULL, NULL, 1),
(33, 'Gân Dẫn Hướng', NULL, NULL, NULL, NULL, 'gan_dan_huong', 26, NULL, NULL, 1),
(34, 'Băng tải PVC dạng lưới', NULL, NULL, NULL, NULL, 'bang_tai_pvc_dang_luoi', 17, 'http://127.0.0.1:8000/storage/bang tai pvc/bang-tai-beo-xanh-1.jpg', NULL, 1),
(35, 'Băng tải PVC dạng liền', NULL, NULL, NULL, NULL, 'bang_tai_pvc_dang_lien', 17, NULL, NULL, 1),
(36, 'Băng tải PVC có bèo', NULL, NULL, NULL, NULL, 'bang_tai_pvc_co_beo', 17, NULL, NULL, 1),
(37, 'Vách ngăn', NULL, NULL, NULL, NULL, 'vach_ngan', 26, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `filters`
--

CREATE TABLE `filters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order_display` int(11) NOT NULL DEFAULT 999,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `filters`
--

INSERT INTO `filters` (`id`, `name`, `order_display`, `status`) VALUES
(10, 'chiều dài', 4, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `filters_categories`
--

CREATE TABLE `filters_categories` (
  `id` int(11) NOT NULL,
  `filter_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `filters_categories`
--

INSERT INTO `filters_categories` (`id`, `filter_id`, `category_id`) VALUES
(23, 10, 16);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `filter_options`
--

CREATE TABLE `filter_options` (
  `id` int(11) NOT NULL,
  `filter_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `order_display` int(11) NOT NULL DEFAULT 999,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `filter_options`
--

INSERT INTO `filter_options` (`id`, `filter_id`, `name`, `order_display`, `status`) VALUES
(67, 10, '12cm', 1, 1),
(68, 10, '20cm', 2, 1),
(69, 10, '30cm', 3, 1);

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
(24, 'Bản vẽ kỹ thuật', 0, 3, 2, 4, 1),
(25, 'Tin tức', 0, 3, 1, 5, 1),
(26, 'Liên hệ', 0, 5, 4, 6, 1);

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
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `short_description`, `content`, `meta_title`, `meta_desc`, `meta_tag`, `url_seo`, `image`, `created_time`, `status`) VALUES
(1, 'CHIA SẺ KINH NGHIỆM CHỌN MUA HỆ THỐNG BĂNG TẢI ĐÚNG CHUẨN CHUYÊN GIA', '<p>Lĩnh vực sản xuất&nbsp;<em><strong>băng tải</strong></em>&nbsp;đang ng&agrave;y c&agrave;ng ph&aacute;t triển, ch&uacute;ng ta c&oacute; thể thấy băng tải c&ocirc;ng nghiệp xuất hiện ng&agrave;y c&agrave;ng phổ biến, từ c&ocirc;ng đoạn vận chuyển h&agrave;ng h&oacute;a tại c&aacute;c nh&agrave; m&aacute;y sản xuất đến c&aacute;c kho b&atilde;i v&agrave; trung t&acirc;m ph&acirc;n phối. C&aacute;c bạn c&oacute; thể dễ d&agrave;ng t&igrave;m kiếm th&ocirc;ng tin đơn vị sản xuất băng tải th&ocirc;ng qua c&aacute;c c&ocirc;ng cụ t&igrave;m kiếm như google, coccoc, facebook,...Tuy nhi&ecirc;n, kh&ocirc;ng phải đơn vị n&agrave;o cũng đủ năng lực v&agrave; uy t&iacute;n để cung cấp băng tải chất lượng cao. H&ocirc;m nay, Sandi Việt Nam sẽ hướng dẫn c&aacute;c bạn một v&agrave;i kinh nghiệm nhỏ trong việc chọn mua băng tải c&ocirc;ng nghiệp đ&uacute;ng chuẩn &ldquo;chuy&ecirc;n gia&rdquo;.</p>', '<p>Lĩnh vực sản xuất băng tải&nbsp;đang ng&agrave;y c&agrave;ng ph&aacute;t triển, ch&uacute;ng ta c&oacute; thể thấy băng tải c&ocirc;ng nghiệp xuất hiện ng&agrave;y c&agrave;ng phổ biến, từ c&ocirc;ng đoạn vận chuyển h&agrave;ng h&oacute;a tại c&aacute;c nh&agrave; m&aacute;y sản xuất đến c&aacute;c kho b&atilde;i v&agrave; trung t&acirc;m ph&acirc;n phối. C&aacute;c bạn c&oacute; thể dễ d&agrave;ng t&igrave;m kiếm th&ocirc;ng tin đơn vị sản xuất băng tải th&ocirc;ng qua c&aacute;c c&ocirc;ng cụ t&igrave;m kiếm như google, coccoc, facebook,...Tuy nhi&ecirc;n, kh&ocirc;ng phải đơn vị n&agrave;o cũng đủ năng lực v&agrave; uy t&iacute;n để cung cấp băng tải chất lượng cao. H&ocirc;m nay, Sandi Việt Nam sẽ hướng dẫn c&aacute;c bạn một v&agrave;i kinh nghiệm nhỏ trong việc chọn mua băng tải c&ocirc;ng nghiệp đ&uacute;ng chuẩn &ldquo;chuy&ecirc;n gia&rdquo;.</p>\r\n<p><img src=\"../storage/kinh-nghiem-chon-mua-bang-tai.jpg\" alt=\"\" width=\"669\" height=\"395\" /></p>\r\n<p><strong>Những ti&ecirc;u ch&iacute; cụ thể khi lựa chọn băng tải c&ocirc;ng nghiệp.</strong></p>\r\n<p><strong>Th&ocirc;ng số kỹ thuật:</strong></p>\r\n<p>Đ&acirc;y l&agrave; yếu tố quan trọng m&agrave; nhiều chủ đầu tư thường hay coi nhẹ khi cung cấp y&ecirc;u cầu cho đơn vị sản xuất băng tải. Khi thiếu th&ocirc;ng tin cần thiết sẽ dẫn tới t&igrave;nh trạng chậm b&aacute;o gi&aacute; hoặc b&aacute;o gi&aacute; cao, từ đ&oacute; l&agrave;m ảnh hưởng nhiều tới tiến độ sản xuất v&agrave; giao h&agrave;ng.<br />&nbsp;<br /><strong>Những th&ocirc;ng số kỹ thuật ch&iacute;nh của băng tải:</strong></p>\r\n<ul>\r\n<li>K&iacute;ch thước: Chiều d&agrave;i x chiều rộng x chiều cao.</li>\r\n<li>Khả năng chịu tải v&agrave; c&ocirc;ng suất động cơ.</li>\r\n<li>Chất liệu.</li>\r\n<li>Mục đ&iacute;ch sử dụng: băng tải sấy, băng tải&nbsp;<em><strong><a href=\"https://sandivietnam.com/con-lan-bang-tai\" target=\"_blank\" rel=\"noopener\">con lăn</a></strong></em>, băng tải x&iacute;ch, băng tải xếp,...</li>\r\n<li>Độ ồn, nhiệt độ động cơ.</li>\r\n</ul>\r\n<p><strong>Gi&aacute; th&agrave;nh băng tải.</strong></p>\r\n<p>Đ&acirc;y l&agrave; yếu tố ti&ecirc;n quyết c&oacute; vai tr&ograve; quyết định việc chọn mua băng tải hay kh&ocirc;ng. Gi&aacute; th&agrave;nh hợp l&yacute; gi&uacute;p bạn tiết kiệm được chi ph&iacute; đầu tư thiết bị, đồng thời nhanh ch&oacute;ng thu hồi vốn.</p>\r\n<p><strong>Chế độ bảo h&agrave;nh sau b&aacute;n</strong></p>\r\n<p>Việc bảo h&agrave;nh v&agrave; bảo tr&igrave; c&aacute;c hệ thống băng tải sau khi b&agrave;n giao, lắp đặt xong l&agrave; v&ocirc; c&ugrave;ng quan trọng. Bạn cần nắm r&otilde; về c&aacute;c ch&iacute;nh s&aacute;ch, chế độ v&agrave; dịch vụ hậu m&atilde;i của nh&agrave; cung cấp để c&oacute; thể tin tưởng lựa chọn v&agrave; y&ecirc;n t&acirc;m vận h&agrave;nh hệ thống.</p>\r\n<p>Ở Sandi Việt Nam, ch&uacute;ng t&ocirc;i cung cấp chế độ bảo h&agrave;nh cho kh&aacute;ch h&agrave;ng với thời gian từ 6 th&aacute;ng tới 2 năm t&ugrave;y v&agrave;o từng sản phẩm, chế độ bảo tr&igrave; trọn đời v&agrave; dịch vụ tư vấn hỗ trợ 24/7 sẽ mang tới cho kh&aacute;ch h&agrave;ng những trải nghiệm tuyệt vời nhất.</p>\r\n<p><strong>Tiến độ giao h&agrave;ng</strong></p>\r\n<p>Tiến độ giao h&agrave;ng sẽ t&ugrave;y thuộc v&agrave;o thời điểm m&agrave; Sandi Việt Nam nhận được PO v&agrave; t&ugrave;y theo từng dự &aacute;n, sản phẩm cũng như y&ecirc;u cầu v&agrave; sự đ&agrave;m ph&aacute;n của hai b&ecirc;n. Khi nhận được đơn h&agrave;ng, Sandi sẽ lu&ocirc;n nắm bắt tiến độ để c&oacute; thể sắp xếp giao sớm nhất cho kh&aacute;ch h&agrave;ng. Ngo&agrave;i ra ch&uacute;ng t&ocirc;i c&ograve;n c&oacute; dịch vụ hỗ trợ giao h&agrave;ng tận nơi v&agrave; hỗ trợ lắp đặt tại nh&agrave; xưởng theo y&ecirc;u cầu của kh&aacute;ch h&agrave;ng.</p>\r\n<p><strong>Vậy n&ecirc;n chọn mua băng tải c&ocirc;ng nghiệp ở đ&acirc;u?</strong></p>\r\n<p>Băng chuyền băng tải do Sandi Việt Nam thiết k&ecirc; được sản xuất tr&ecirc;n d&acirc;y chuyền c&ocirc;ng nghệ hiện đại, c&aacute;c sản phẩm của ch&uacute;ng t&ocirc;i lu&ocirc;n đạt ti&ecirc;u chuẩn chất lượng quốc tế, với nhiều t&iacute;nh năng đa dạng vượt trội, đ&atilde; thiết kế cho rất nhiều dự &aacute;n lớn nhỏ trong v&agrave; ngo&agrave;i nước.</p>\r\n<p>Băng tải do Sandi cung cấp c&oacute; tuổi thọ l&agrave;m việc cao, bền bỉ với thời gian, khả năng hoạt động trong cả m&ocirc;i trường khắc nghiệt.</p>\r\n<p>Dịch vụ hỗ trợ tư vấn chuy&ecirc;n nghiệp, đội ngũ kỹ sư tư vấn h&agrave;ng đầu; đảm bảo đ&uacute;ng quy tr&igrave;nh kỹ thuật gi&uacute;p mang lại hiệu quả vượt trội cho cho hệ thống của kh&aacute;ch h&agrave;ng.</p>\r\n<p>SANDI VIỆT NAM<br />Nh&agrave; m&aacute;y 1: Số 522 Ph&uacute;c Diễn, Q. Nam Từ Li&ecirc;m, Tp.H&agrave; Nội<br />Nh&agrave; m&aacute;y 2: A2,CN2, Cụm c&ocirc;ng nghiệp vừa v&agrave; nhỏ Bắc Từ Li&ecirc;m, TP H&agrave; Nội<br />Điện thoại: 0903 223 663<br />Website: https://sandivietnam.com/</p>', 'abc2', 'abc2', 'abc2', 'chia_se_kinh_nghiem_chon_mua_he_thong_bang_tai_dung_chuan_chuyen_gia', 'http://127.0.0.1:8000/storage/kinh-nghiem-chon-mua-bang-tai.jpg', '2022-03-30 03:35:07', 1),
(2, 'tin tức số 13', '<p>tin tức số 13</p>', '<p>tin tức số 13</p>', NULL, 'abc', NULL, 'tin_tuc_so_13', 'http://127.0.0.1:8000/storage/luoi-ngang-4.jpg', '2022-03-30 03:35:07', 1);

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
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `news_category`
--

INSERT INTO `news_category` (`id`, `news_id`, `category_id`) VALUES
(7, 2, 1),
(8, 1, 1),
(9, 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_comments`
--

CREATE TABLE `news_comments` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `reply_name` varchar(255) NOT NULL,
  `reply_email` varchar(255) NOT NULL,
  `reply_website` varchar(255) DEFAULT NULL,
  `reply_comment` varchar(1000) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `news_comments`
--

INSERT INTO `news_comments` (`id`, `news_id`, `reply_name`, `reply_email`, `reply_website`, `reply_comment`, `created_time`) VALUES
(6, 1, 'nguyễn ngọc thiêm', 'thiemnn.nguyen@gmail.com', '', 'tôi thấy sản phẩm này rất hay', '2022-03-30 13:22:41'),
(8, 1, 'Nguyễn Văn Nam', 'nam.nguyen@gmail.com', '', 'hãy gửi cho tôi báo giá sản phẩm này nhé', '2022-03-30 03:22:41'),
(9, 1, 'nguyễn văn a', 'abc2gmail.com', '', 'phản hồi mới nhất', '2022-03-30 03:23:13');

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
(25, 'BĂNG TẢI PVC NỈ XÁM CHỐNG TĨNH ĐIỆN DÀY 4MM', '<p class=\"title-head\">BĂNG TẢI PVC NỈ X&Aacute;M CHỐNG TĨNH ĐIỆN D&Agrave;Y 4MM</p>', NULL, NULL, NULL, NULL, 'bang_tai_pvc_ni_xam_chong_tinh_dien_day_4mm', 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>Bảng th&ocirc;ng số băng tải PVC nỉ x&aacute;m d&agrave;y 4mm chống tĩnh điện m&atilde; sản phẩm SBPV40GR2FNA:</strong></p>\r\n<table class=\"woocommerce-product-attributes shop_attributes table table-striped\">\r\n<tbody>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_chat-lieu-bang-tai\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Chất liệu băng tải</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>PVC</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_m%c3%a0u-s%e1%ba%afc-b%c4%83ng-t%e1%ba%a3i\">\r\n<th class=\"woocommerce-product-attributes-item__label\">M&agrave;u sắc băng tải</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>X&aacute;m</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_chi%e1%bb%81u-d%c3%a0y-b%c4%83ng-t%e1%ba%a3i\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Chiều d&agrave;y băng tải</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>4 mm</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_s%e1%bb%91-l%e1%bb%9bp-b%e1%bb%91\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Số lớp bố</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>2</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_b%e1%bb%81-m%e1%ba%b7t-b%c4%83ng-t%e1%ba%a3i\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Bề mặt băng tải</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>Mặt nỉ</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_lo%e1%ba%a1i-b%c4%83ng-t%e1%ba%a3i\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Loại băng tải</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>Chống tĩnh điện 10&circ;6 &divide;10&circ;9 OHMS</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_%c4%91%c6%b0%e1%bb%9dng-k%c3%adnh-rulo-nh%e1%bb%8f-nh%e1%ba%a5t\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Đường k&iacute;nh rulo nhỏ nhất</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>60 mm</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_l%e1%bb%b1c-k%c3%a9o-d%c3%a3n-1\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Lực k&eacute;o d&atilde;n 1%</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>16 N/mm</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_l%e1%bb%b1c-k%c3%a9o-%c4%91%e1%bb%a9t\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Lực k&eacute;o đứt</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>120 N/mm</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_nhi%e1%bb%87t-%c4%91%e1%bb%99-l%c3%a0m-vi%e1%bb%87c\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Nhiệt độ l&agrave;m việc</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>-10&divide;100&deg;C</p>\r\n</td>\r\n</tr>\r\n<tr class=\"woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_tr%e1%bb%8dng-l%c6%b0%e1%bb%a3ng-b%c4%83ng-t%e1%ba%a3i\">\r\n<th class=\"woocommerce-product-attributes-item__label\">Trọng lượng băng tải</th>\r\n<td class=\"woocommerce-product-attributes-item__value\">\r\n<p>3.3 kg/m&sup2;</p>\r\n</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>Một số h&igrave;nh ảnh thực tế của băng tải PVC nỉ x&aacute;m 4mm chống tĩnh điện do Sandi Việt Nam cung cấp:</p>\r\n<p><img src=\"https://sandivietnam.com/image/catalog/bang%20tai%20pvc/bang-tai-ni-xam-4mm-chong-tinh-dien-1.jpg\" alt=\"\" width=\"500\" height=\"500\" /></p>\r\n<p><img src=\"https://sandivietnam.com/image/catalog/bang%20tai%20pvc/bang-tai-ni-xam-4mm-chong-tinh-dien-3.jpg\" alt=\"\" width=\"500\" height=\"500\" /></p>\r\n<p><img src=\"https://sandivietnam.com/image/catalog/bang%20tai%20pvc/bang-tai-ni-xam-4mm-chong-tinh-dien-2.jpg\" alt=\"\" width=\"500\" height=\"500\" /></p>\r\n<p><strong>Băng tải PVC nỉ x&aacute;m</strong>&nbsp;ch&iacute;nh h&atilde;ng gi&aacute; rẻ nhất. Sandi Việt Nam l&agrave; đơn vị chuy&ecirc;n cung cấp băng tải PVC x&aacute;m, băng tải pvc x&aacute;m 4mm... Cam kết bảo h&agrave;nh l&acirc;u d&agrave;i.</p>\r\n<p>Li&ecirc;n h&ecirc; đặt mua:<br />SANDI VIỆT NAM<br />Số 226 Ph&uacute;c Diễn, Q. Nam Từ Li&ecirc;m, Tp.H&agrave; Nội<br />Điện thoại: 0903 223 663<br />Website:&nbsp;<a>https://sandivietnam.com</a></p>', NULL, NULL, NULL, 1),
(26, 'BĂNG TẢI PVC XANH NHÁM CHỮ Y DÀY 3MM', '<pre class=\"title-head\">BĂNG TẢI PVC XANH NH&Aacute;M CHỮ Y D&Agrave;Y 3MM</pre>', NULL, NULL, NULL, NULL, 'bang_tai_pvc_xanh_nham_chu_y_day_3mm', 'http://127.0.0.1:8000/storage/bang tai/bang-tai-pvc-xanh-nham-chu-y-3mm.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(27, 'BĂNG TẢI PVC XANH NHÁM GẠCH MEN DÀY 9MM', '<pre class=\"title-head\">BĂNG TẢI PVC XANH NH&Aacute;M GẠCH MEN D&Agrave;Y 9MM</pre>', NULL, NULL, NULL, NULL, 'bang_tai_pvc_xanh_nham_gach_men_day_9mm', 'http://127.0.0.1:8000/storage/bang tai/bang-tai-pvc-xanh-nham-gach-men-9mm.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(28, 'BĂNG TẢI PU CHỐNG TĨNH ĐIỆN XANH NÕN CHUỐI DÀY 1.5MM CO GIÃN', '<pre class=\"title-head\">BĂNG TẢI PU CHỐNG TĨNH ĐIỆN XANH N&Otilde;N CHUỐI D&Agrave;Y 1.5MM CO GI&Atilde;N</pre>', NULL, NULL, NULL, NULL, 'bang_tai_pu_chong_tinh_dien_xanh_non_chuoi_day_1.5mm_co_gian', 'http://127.0.0.1:8000/storage/bang tai/bang-tai-pu-chong-tinh-dien-xanh-non-chuoi-1-5mm-co-dan.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(29, 'BĂNG TẢI PU CHỊU NHIỆT TRẮNG DÀY 1.5MM', '<div class=\"product-top clearfix\">\r\n<pre class=\"title-head\">BĂNG TẢI PU CHỊU NHIỆT TRẮNG D&Agrave;Y 1.5MM</pre>\r\n</div>\r\n<div>\r\n<div class=\"inventory_quantity deny 1\">&nbsp;</div>\r\n</div>', NULL, NULL, NULL, NULL, 'bang_tai_pu_chiu_nhiet_trang_day_1.5mm', 'http://127.0.0.1:8000/storage/bang tai/bang-tai-pu-trang-chiu-nhiet-1-5m.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(30, 'BĂNG TẢI PU CHỐNG TĨNH ĐIỆN ĐEN DÀY 1.5MM', '<div class=\"product-top clearfix\">\r\n<pre class=\"title-head\">BĂNG TẢI PU CHỐNG TĨNH ĐIỆN ĐEN D&Agrave;Y 1.5MM</pre>\r\n</div>\r\n<div>\r\n<div class=\"inventory_quantity deny 1\">&nbsp;</div>\r\n</div>', NULL, NULL, NULL, NULL, 'bang_tai_pu_chong_tinh_dien_den_day_1.5mm', 'http://127.0.0.1:8000/storage/bang tai/bang-tai-pu-chong-tinh-dien-den-1-5mm.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(31, 'BĂNG TẢI MẮT LƯỚI DẠNG NGANG', '<div class=\"product-top clearfix\">\r\n<pre class=\"title-head\">BĂNG TẢI MẮT LƯỚI DẠNG NGANG</pre>\r\n</div>\r\n<div>\r\n<div class=\"inventory_quantity deny 1\">&nbsp;</div>\r\n</div>', NULL, NULL, NULL, NULL, 'bang_tai_mat_luoi_dang_ngang', 'http://127.0.0.1:8000/storage/Luoi inox/bang-tai-luoi-inox-mat-ngang-221.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(32, 'BĂNG TẢI LƯỚI MẮT DẠNG XOẮN', '<div class=\"product-top clearfix\">\r\n<pre class=\"title-head\">BĂNG TẢI LƯỚI MẮT DẠNG XOẮN</pre>\r\n</div>\r\n<div>\r\n<div class=\"inventory_quantity deny 1\">&nbsp;</div>\r\n</div>', NULL, NULL, NULL, NULL, 'bang_tai_luoi_mat_dang_xoan', 'http://127.0.0.1:8000/storage/Luoi inox/bang-tai-luoi-inox-211.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(33, 'BĂNG TẢI LƯỚI INOX DẠNG XOẮN CÂN BẰNG', '<div class=\"product-top clearfix\">\r\n<pre class=\"title-head\">BĂNG TẢI LƯỚI INOX DẠNG XOẮN C&Acirc;N BẰNG</pre>\r\n</div>\r\n<div>\r\n<div class=\"inventory_quantity deny 1\">&nbsp;</div>\r\n</div>', NULL, NULL, NULL, NULL, 'bang_tai_luoi_inox_dang_xoan_can_bang', 'http://127.0.0.1:8000/storage/bang tai luoi/bang-tai-luoi-inox-dang-xoan-4.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

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
(29, 4, 34),
(30, 25, 17),
(31, 26, 17),
(32, 27, 17),
(33, 28, 18),
(34, 29, 18),
(35, 30, 18),
(36, 31, 19),
(37, 32, 19),
(38, 33, 19);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_filter_options`
--

CREATE TABLE `product_filter_options` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `filter_option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product_filter_options`
--

INSERT INTO `product_filter_options` (`id`, `product_id`, `filter_option_id`) VALUES
(1, 25, 1);

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
(33, 5, 'http://127.0.0.1:8000/storage/luoi-ngang-9.jpg'),
(34, 25, 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png'),
(35, 25, 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png'),
(36, 25, 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png'),
(37, 25, 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png'),
(38, 25, 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png'),
(39, 25, 'http://127.0.0.1:8000/storage/bang tai/pvc/bang-tai-pvc-ni-xam-4mm.png');

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
(40, 'tin_tuc_so_1', 4, 1),
(41, 'tin_tuc_so_12', 4, 1),
(42, 'tin_tuc_so_13', 4, 2),
(43, 'chia_se_kinh_nghiem_chon_mua_he_thong_bang_tai_dung_chuan_chuyen_gia', 4, 1),
(44, 'bang_tai_pvc_ni_xam_chong_tinh_dien_day_4mm', 2, 25),
(45, 'bang_tai_pvc_xanh_nham_chu_y_day_3mm', 2, 26),
(46, 'bang_tai_pvc_xanh_nham_gach_men_day_9mm', 2, 27),
(47, 'bang_tai_pu_chong_tinh_dien_xanh_non_chuoi_day_1.5mm_co_gian', 2, 28),
(48, 'bang_tai_pu_chiu_nhiet_trang_day_1.5mm', 2, 29),
(49, 'bang_tai_pu_chong_tinh_dien_den_day_1.5mm', 2, 30),
(50, 'bang_tai_mat_luoi_dang_ngang', 2, 31),
(51, 'bang_tai_luoi_mat_dang_xoan', 2, 32),
(52, 'bang_tai_luoi_inox_dang_xoan_can_bang', 2, 33);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `filters_categories`
--
ALTER TABLE `filters_categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `filter_options`
--
ALTER TABLE `filter_options`
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
-- Chỉ mục cho bảng `news_comments`
--
ALTER TABLE `news_comments`
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
-- Chỉ mục cho bảng `product_filter_options`
--
ALTER TABLE `product_filter_options`
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
-- AUTO_INCREMENT cho bảng `filters`
--
ALTER TABLE `filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `filters_categories`
--
ALTER TABLE `filters_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `filter_options`
--
ALTER TABLE `filter_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `news_category`
--
ALTER TABLE `news_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `news_comments`
--
ALTER TABLE `news_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `product_filter_options`
--
ALTER TABLE `product_filter_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `static_pages`
--
ALTER TABLE `static_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `url_seo_list`
--
ALTER TABLE `url_seo_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
