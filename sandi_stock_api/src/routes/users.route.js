const express = require('express');
const router = express.Router({ mergeParams: true });

const usersController = require('../controllers/users.controller');

router.route('/login')
    .post(usersController.login);

router.route('/register')
    .post(usersController.register);

router.route('/addContact')
    .post(usersController.addContact);

module.exports = router;