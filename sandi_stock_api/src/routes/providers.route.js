const express = require('express');
const router = express.Router({ mergeParams: true });

const providersController = require('../controllers/providers.controller');

router.route('/')
    .get(providersController.getAll);

router.route('/:_id')
    .get(providersController.get);

router.route('/insert')
    .post(providersController.insert);

module.exports = router;