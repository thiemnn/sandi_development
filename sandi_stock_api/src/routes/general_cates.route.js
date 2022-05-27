const express = require('express');
const router = express.Router({ mergeParams: true });

const generalCatesController = require('../controllers/generalCates.controller');

router.route('/')
    .get(generalCatesController.getAll);

router.route('/:_id')
    .get(generalCatesController.get);

router.route('/insert')
    .post(generalCatesController.insert);

module.exports = router;