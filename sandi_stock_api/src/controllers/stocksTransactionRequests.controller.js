const stocksTransactionRequestsService = require('../services/stocksTransactionRequests.service');
const responseHelper = require('../helpers/response.helper');

const insert = async(req, res, next) => {
    var response = await stocksTransactionRequestsService.insert(req.body);
    return responseHelper.successWithData(res, 'Insert record successfully', response)
}

const update = async (req, res, next) => {
    var response = await stocksTransactionRequestsService.update(req.params._id, req.body);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const getAll = async(req, res) => {
    var response = await stocksTransactionRequestsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const get = async(req, res) => {
    var response = await stocksTransactionRequestsService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

module.exports = {
    insert,
    update,
    getAll,
    get
};