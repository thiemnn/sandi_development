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

module.exports = {
    get,
    insert,
    update,
    getAll
};