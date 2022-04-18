const express = require('express');
const router = express.Router({ mergeParams: true });

const menusController = require('../controllers/menus.controller');

router.route('/')
    .get(menusController.getAll);

module.exports = router;