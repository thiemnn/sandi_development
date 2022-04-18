const express = require('express');
const router = express.Router({ mergeParams: true });

const categoriesController = require('../controllers/categories.controller');

router.route('/')
    .get(categoriesController.getAll);

router.route('/:_id')
    .get(categoriesController.get);

router.route('/directChild/:_id')
    .get(categoriesController.getDirectChild);

module.exports = router;