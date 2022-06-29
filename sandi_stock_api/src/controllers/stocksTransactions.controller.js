const stocksTransactionsService = require('../services/stocksTransactions.service');
const responseHelper = require('../helpers/response.helper');

const insert = async(req, res, next) => {
    var response = await stocksTransactionsService.insert(req.body);
    return responseHelper.successWithData(res, 'Insert record successfully', response)
}

const update = async (req, res, next) => {
    var response = await stocksTransactionsService.update(req.params._id, req.body);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const getAll = async(req, res) => {
    var response = await stocksTransactionsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const get = async(req, res) => {
    var response = await stocksTransactionsService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getLastNumber = async(req, res) => {
    var response = await stocksTransactionsService.getLastNumber();
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

module.exports = {
    insert,
    update,
    getAll,
    get,
    getLastNumber
};