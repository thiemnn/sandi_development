const express = require('express');
const router = express.Router({ mergeParams: true });

const customersController = require('../controllers/customers.controller');

router.route('/')
    .get(customersController.getAll);

router.route('/:_id')
    .get(customersController.get);

router.route('/:_id/update')
    .put(customersController.update);

router.route('/insert')
    .post(customersController.insert);

module.exports = router;