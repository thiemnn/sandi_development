const express = require('express');
const router = express.Router({ mergeParams: true });

const providersController = require('../controllers/providers.controller');
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
    .get(authenToken, providersController.getAll);

router.route('/:_id')
    .get(authenToken, providersController.get);

router.route('/:_id/update')
    .put(authenToken, providersController.update);

router.route('/insert')
    .post(authenToken, providersController.insert);

module.exports = router;