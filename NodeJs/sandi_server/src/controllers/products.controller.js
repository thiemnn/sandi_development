const productsService = require('../services/products.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await productsService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var response = await productsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const PostRecord = async(req, res, next) => {
    return responseHelper.success(res, 'Insert record successfully')
}

module.exports = {
    get,
    PostRecord,
    getAll
};