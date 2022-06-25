const express = require('express');
const router = express.Router({ mergeParams: true });

const employeesController = require('../controllers/employees.controller');
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
    .put(authenToken, employeesController.update);

router.route('/:_id/update_password')
    .put(authenToken, employeesController.update_password);

router.route('/insert')
    .post(authenToken, employeesController.insert);

router.route('/:_id/delete')
    .delete(authenToken, employeesController.delete_item);

router.route('/')
    .get(authenToken, employeesController.getAll);

module.exports = router;