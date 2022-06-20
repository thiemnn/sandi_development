const productsService = require('../services/products.service');
const responseHelper = require('../helpers/response.helper');

const insert = async(req, res, next) => {
    var response = await productsService.insert(req.body);
    return responseHelper.successWithData(res, 'Insert record successfully', response)
}

const update = async (req, res, next) => {
    var response = await productsService.update(req.params._id, req.body);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const delete_item = async (req, res, next) => {
    var response = await productsService.delete_item(req.params._id);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const getAll = async (req, res) => {
    var type = req.query.type;
    var response = await productsService.getAll(type);
    return responseHelper.successWithData(res, 'Success With Data', response)
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};