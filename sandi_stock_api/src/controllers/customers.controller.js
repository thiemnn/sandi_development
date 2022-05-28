const customersService = require('../services/customers.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await customersService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var response = await customersService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const insert = async(req, res, next) => {
    await customersService.insert(req.body);
    return responseHelper.success(res, 'Insert record successfully')
}

const update = async (req, res, next) => {
    await customersService.update(req.params._id, req.body);
    return responseHelper.success(res, 'Update record successfully')
}

module.exports = {
    get,
    insert,
    update,
    getAll
};