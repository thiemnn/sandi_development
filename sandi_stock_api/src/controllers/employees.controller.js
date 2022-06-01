const employeesService = require('../services/employees.service');
const responseHelper = require('../helpers/response.helper');

const insert = async(req, res, next) => {
    var response = await employeesService.insert(req.body);
    return responseHelper.successWithData(res, 'Insert record successfully', response)
}

const update = async (req, res, next) => {
    var response = await employeesService.update(req.params._id, req.body);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

module.exports = {
    insert,
    update
};