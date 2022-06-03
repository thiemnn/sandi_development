const express = require('express');
const router = express.Router({ mergeParams: true });

const organizationsController = require('../controllers/organizations.controller');
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
    .get(authenToken, organizationsController.getAll);

router.route('/:_id')
    .get(authenToken, organizationsController.get);

router.route('/:_id/update')
    .put(authenToken, organizationsController.update);

router.route('/:_id/delete')
    .delete(authenToken, organizationsController.delete_item);

router.route('/:_id/employees')
    .delete(authenToken, organizationsController.get_employees);

router.route('/insert')
    .post(authenToken, organizationsController.insert);

module.exports = router;