const generalCatesService = require('../services/generalCates.service');
const responseHelper = require('../helpers/response.helper');

const get = async(req, res) => {
    var response = await generalCatesService.get(req.params._id);
    if(response)
    return responseHelper.successWithData(res, 'Success With Data', response)
    else return responseHelper.notFound(res, 'Can not get data')
}

const getAll = async(req, res) => {
    var response = await generalCatesService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

const insert = async(req, res, next) => {
    await generalCatesService.insert(req.body);
    return responseHelper.success(res, 'Insert record successfully')
}

module.exports = {
    get,
    insert,
    getAll
};