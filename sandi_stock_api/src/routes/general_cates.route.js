const express = require('express');
const router = express.Router({ mergeParams: true });

const generalCatesController = require('../controllers/generalCates.controller');
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
    .get(authenToken, generalCatesController.getAll);

router.route('/:_id')
    .get(authenToken, generalCatesController.get);

router.route('/insert')
    .post(authenToken, generalCatesController.insert);

module.exports = router;