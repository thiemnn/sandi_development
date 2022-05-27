const express = require('express');
const router = express.Router({ mergeParams: true });

const productsController = require('../controllers/products.controller');

router.route('/')
    .get(productsController.getAll);

// router.route('/')
//     .post(productsController.PostRecord);

// router.route('/')
//     .post(productsController.PostRecord);

router.route('/requestQuotation')
    .post(productsController.requestQuotation);

router.route('/:_id')
    .get(productsController.get);

module.exports = router;