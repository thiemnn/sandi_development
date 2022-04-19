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
    var opt1 = req.query.opt1 == "true" ? true : false
    var opt2 = req.query.opt2 == "true" ? true : false
    var opt3 = req.query.opt3 == "true" ? true : false
    var per_page = req.query.per_page
    var order_by = req.query.order_by
    var response = await productsService.getAll(category_id, search, opt1, opt2, opt3, page, per_page, order_by);
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const requestQuotation = async(req, res, next) => {
    var result = await productsService.requestQuotation(req.body);
    if(result){
        return responseHelper.success(res, 'Insert record successfully')
    } else{
        return responseHelper.errorResponse(res, 'Can not register user')
    }
}

module.exports = {
    get,
    requestQuotation,
    getAll
};