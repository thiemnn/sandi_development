const express = require('express');
const router = express.Router({ mergeParams: true });

const stockShelfsController = require('../controllers/stockShelfs.controller');
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
    .put(authenToken, stockShelfsController.update);

router.route('/insert')
    .post(authenToken, stockShelfsController.insert);

router.route('/:_id/delete')
    .delete(authenToken, stockShelfsController.delete_item);

module.exports = router;