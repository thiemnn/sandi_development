const seo_urlsService = require('../services/seo_urls.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await seo_urlsService.get(req.params._id);
    if(response && response.length > 0)
    return responseHelper.successWithData(res, 'Success With Data', response[0])
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var response = await seo_urlsService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

module.exports = {
    get,
    getAll
};