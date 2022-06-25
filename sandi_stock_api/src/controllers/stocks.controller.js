const stocksService = require('../services/stocks.service');
const responseHelper = require('../helpers/response.helper');

const insert = async(req, res, next) => {
    var response = await stocksService.insert(req.body);
    return responseHelper.successWithData(res, 'Insert record successfully', response)
}

const update = async (req, res, next) => {
    var response = await stocksService.update(req.params._id, req.body);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const delete_item = async (req, res, next) => {
    var response = await stocksService.delete_item(req.params._id);
    return responseHelper.successWithData(res, 'Update record successfully', response)
}

const getAll = async(req, res) => {
    var response = await stocksService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};