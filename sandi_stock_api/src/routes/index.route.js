const express = require('express');

const providers = require('./providers.route');
const customers = require('./customers.route');
const organizations = require('./organizations.route');
const employees = require('./employees.route');
const productGroups = require('./productGroups.route');
const products = require('./products.route');
const general_cates = require('./general_cates.route');
const auth = require('./auth.route');
const swagger = require('./swagger.route');

const router = express.Router();

router.use('/providers', providers);
router.use('/customers', customers);
router.use('/organizations', organizations);
router.use('/product_groups', productGroups);
router.use('/employees', employees);
router.use('/products', products);
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