const categoriesService = require('../services/categories.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var filter_options = req.query.filter_options
    var page = req.query.page
    var per_page = req.query.per_page
    var order_by = req.query.order_by
    var response = await categoriesService.get(req.params._id, filter_options, page, per_page, order_by);
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const getAll = async(req, res) => {
    var response = await categoriesService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const getDirectChild = async(req, res) => {
    var response = await categoriesService.getDirectChild(req.params._id);
    return responseHelper.successWithData(res, 'Success With Data', response)
}

module.exports = {
    get,
    getAll,
    getDirectChild
};