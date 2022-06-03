const express = require('express');
const router = express.Router({ mergeParams: true });

const productsController = require('../controllers/products.controller');
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
    .put(authenToken, productsController.update);

router.route('/insert')
    .post(authenToken, productsController.insert);

router.route('/:_id/delete')
    .delete(authenToken, productsController.delete_item);

module.exports = router;