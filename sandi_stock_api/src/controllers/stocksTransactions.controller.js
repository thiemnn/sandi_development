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

module.exports = {
    insert,
    update
};