const express = require('express');
const router = express.Router({ mergeParams: true });

const organizationsController = require('../controllers/organizations.controller');

router.route('/')
    .get(organizationsController.getAll);

router.route('/:_id')
    .get(organizationsController.get);

router.route('/:_id/update')
    .put(organizationsController.update);

router.route('/:_id/delete')
    .delete(organizationsController.delete_item);

router.route('/:_id/employees')
    .delete(organizationsController.get_employees);

router.route('/insert')
    .post(organizationsController.insert);

module.exports = router;