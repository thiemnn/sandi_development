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

const update_password = async (req, res, next) => {
    var response = await employeesService.update_password(req.params._id, req.body);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const delete_item = async (req, res, next) => {
    var response = await employeesService.delete_item(req.params._id);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const getAll = async(req, res) => {
    var response = await employeesService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

module.exports = {
    insert,
    update,
    update_password,
    delete_item,
    getAll
};