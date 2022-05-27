const newsService = require('../services/news.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await newsService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getByCategory = async(req, res) => {
    var page = req.query.page
    var per_page = req.query.per_page
    var order_by = req.query.order_by
    var response = await newsService.getByCategory(req.params._id, page, per_page, order_by);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var response = await newsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const AddComment = async(req, res, next) => {
    await newsService.addComment(req.body);
    return responseHelper.success(res, 'Insert record successfully')
}

module.exports = {
    get,
    getByCategory,
    AddComment,
    getAll
};