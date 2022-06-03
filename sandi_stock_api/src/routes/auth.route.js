const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('../controllers/auth.controller');

router.route('/login')
    .post(authController.login);

module.exports = router;