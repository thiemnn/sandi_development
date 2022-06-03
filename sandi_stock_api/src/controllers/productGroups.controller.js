const productGroupsService = require('../services/productGroups.service');
const responseHelper = require('../helpers/response.helper');

const getAll = async(req, res) => {
    var response = await productGroupsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const insert = async(req, res, next) => {
    await productGroupsService.insert(req.body);
    return responseHelper.success(res, 'Insert record successfully')
}

const update = async (req, res, next) => {
    await productGroupsService.update(req.params._id, req.body);
    return responseHelper.success(res, 'Update record successfully')
}

const delete_item = async (req, res, next) => {
    var response = await productGroupsService.delete_item(req.params._id);
    if(response)
    return responseHelper.success(res, 'Delete record successfully')
    else return responseHelper.errorResponse(res, 'Can not delete data')
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};