const express = require('express');
const categories = require('./categories.route');
const menus = require('./menus.route');
const products = require('./products.route');
const news = require('./news.route');
const providers = require('./providers.route');
const customers = require('./customers.route');
const general_cates = require('./general_cates.route');

const users = require('./users.route');
const newscategory = require('./newscategory.route');
const seo_urls = require('./seo_urls.route');
const swagger = require('./swagger.route');

const router = express.Router();

router.use('/categories', categories);
router.use('/newscategory', newscategory);
router.use('/menus', menus);
router.use('/products', products);
router.use('/news', news);


router.use('/providers', providers);
router.use('/customers', customers);
router.use('/general_cate', general_cates);


router.use('/users', users);
router.use('/seo_urls', seo_urls);
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