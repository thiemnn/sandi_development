const express = require('express');

const providers = require('./providers.route');
const customers = require('./customers.route');
const organizations = require('./organizations.route');
const employees = require('./employees.route');
const productGroups = require('./productGroups.route');
const stockGroups = require('./stockGroups.route');
const products = require('./products.route');
const stocks = require('./stocks.route');
const stocksTransactions = require('./stocksTransactions.route');
const stocksTransactionRequests = require('./stocksTransactionRequests.route');
const stockLines = require('./stockLines.route');
const stockShelfs = require('./stockShelfs.route');
const general_cates = require('./general_cates.route');
const auth = require('./auth.route');
const swagger = require('./swagger.route');

const router = express.Router();

router.use('/providers', providers);
router.use('/customers', customers);
router.use('/organizations', organizations);
router.use('/product_groups', productGroups);
router.use('/stock_groups', stockGroups);
router.use('/employees', employees);
router.use('/products', products);
router.use('/stocks', stocks);
router.use('/stocks_transactions', stocksTransactions);
router.use('/stocks_transaction_requests', stocksTransactionRequests);
router.use('/stock_lines', stockLines);
router.use('/stock_shelfs', stockShelfs);
router.use('/general_cate', general_cates);
router.use('/auth', auth);
router.use('/', swagger);

router.get('/', (req, res) => res.send('sandi api version 1'));
router.get('/health', (req, res) => {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
  };
  res.send(JSON.stringify(healthcheck));
});

module.exports = router;