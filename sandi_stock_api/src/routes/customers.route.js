const express = require('express');
const router = express.Router({ mergeParams: true });

const customersController = require('../controllers/customers.controller');
const jwt = require("jsonwebtoken");

function authenToken(req, res, next) {
    const authoizationHeader = req.headers['authorization'];
    if (!authoizationHeader || !authoizationHeader.includes(' ')) {
        res.sendStatus(401);
    } else {
        const token = authoizationHeader.split(' ')[1];
        if (!token) {
            res.sendStatus(401);
        } else {
            jwt.verify(token, 'abcde12345', (err, data) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    next()
                }
            })
        }
    }
}

router.route('/')
    .get(authenToken, customersController.getAll);

router.route('/:_id')
    .get(authenToken, customersController.get);

router.route('/:_id/update')
    .put(authenToken, customersController.update);

router.route('/insert')
    .post(authenToken, customersController.insert);

module.exports = router;