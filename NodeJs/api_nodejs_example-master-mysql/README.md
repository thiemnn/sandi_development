# Api nodejs example
# Install package
Run `npm install`

# Run api
Run `npm run start`

# Create database 
Database name: nodejs_api
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`id`, `name`, `color`, `price`) VALUES
(1, 'Iphone X', 'Black', '30000000'),
(2, 'Samsung S9', 'White', '24000000'),
(3, 'Oppo F5', 'Red', '7000000');
COMMIT;
