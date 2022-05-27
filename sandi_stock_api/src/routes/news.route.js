const express = require('express');
const router = express.Router({ mergeParams: true });

const newsController = require('../controllers/news.controller');

router.route('/')
    .get(newsController.getAll);

router.route('/:_id')
    .get(newsController.get);

router.route('/addComment')
    .post(newsController.AddComment);

module.exports = router;