const express = require('express');
const router = express.Router({ mergeParams: true });

const newsController = require('../controllers/news.controller');

router.route('/:_id')
    .get(newsController.getByCategory);

module.exports = router;