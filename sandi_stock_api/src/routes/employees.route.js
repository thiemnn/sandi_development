const express = require('express');
const router = express.Router({ mergeParams: true });

const employeesController = require('../controllers/employees.controller');

router.route('/:_id/update')
    .put(employeesController.update);

router.route('/insert')
    .post(employeesController.insert);

module.exports = router;