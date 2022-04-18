const express = require('express');
const router = express.Router({ mergeParams: true });

const seo_urlsController = require('../controllers/seo_urls.controller');

router.route('/')
    .get(seo_urlsController.getAll);

router.route('/:_id')
    .get(seo_urlsController.get);

module.exports = router;