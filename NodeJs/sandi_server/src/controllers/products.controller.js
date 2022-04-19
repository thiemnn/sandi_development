const productsService = require('../services/products.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await productsService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var search = req.query.search
    var category_id = req.query.category_id
    var page = req.query.page
    var opt1 = req.query.opt1
    var opt2 = req.query.opt2
    var opt3 = req.query.opt3
    var per_page = req.query.per_page
    var order_by = req.query.order_by
    var response = await productsService.getAll(category_id, search, opt1, opt2, opt3, page, per_page, order_by);
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