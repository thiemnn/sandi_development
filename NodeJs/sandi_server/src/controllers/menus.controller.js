const menusService = require('../services/menus.service');
const responseHelper = require('../helpers/response.helper');

const getAll = async(req, res) => {
    var response = await menusService.getAll();
    return responseHelper.successWithData(res, 'Success With Data', response)
}

module.exports = {
    getAll
};