const organizationsService = require('../services/organizations.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await organizationsService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var response = await organizationsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const insert = async(req, res, next) => {
    await organizationsService.insert(req.body);
    return responseHelper.success(res, 'Insert record successfully')
}

const update = async (req, res, next) => {
    await organizationsService.update(req.params._id, req.body);
    return responseHelper.success(res, 'Update record successfully')
}

const delete_item = async (req, res, next) => {
    var response = await organizationsService.delete_item(req.params._id);
    if(response)
    return responseHelper.success(res, 'Delete record successfully')
    else return responseHelper.errorResponse(res, 'Can not delete data')
}

const get_employees = async (req, res, next) => {
    var response = await organizationsService.get_employees(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

module.exports = {
    get,
    insert,
    update,
    delete_item,
    get_employees,
    getAll
};