const express = require('express');
const router = express.Router({ mergeParams: true });

const stocksTransactionRequestsController = require('../controllers/stocksTransactionRequests.controller');
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

router.route('/:_id/update')
    .put(authenToken, stocksTransactionRequestsController.update);

router.route('/insert')
    .post(authenToken, stocksTransactionRequestsController.insert);

router.route('/')
    .get(authenToken, stocksTransactionRequestsController.getAll);

router.route('/lastNumber')
    .get(authenToken, stocksTransactionRequestsController.getLastNumber);

router.route('/:_id')
    .get(authenToken, stocksTransactionRequestsController.get);


module.exports = router;