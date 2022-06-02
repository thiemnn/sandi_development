const express = require('express');
const router = express.Router({ mergeParams: true });

const employeesController = require('../controllers/employees.controller');

router.route('/:_id/update')
    .put(employeesController.update);

router.route('/:_id/update_password')
    .put(employeesController.update_password);

router.route('/insert')
    .post(employeesController.insert);

router.route('/:_id/delete')
    .delete(employeesController.delete_item);

module.exports = router;