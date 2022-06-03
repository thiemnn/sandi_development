const authService = require('../services/auth.service');
const responseHelper = require('../helpers/response.helper');

const login = async(req, res, next) => {
    var result = await authService.login(req.body);
    if(result && result.token){
        return responseHelper.successWithData(res, 'login successfully', result)
    } else{
        return responseHelper.notFound(res, 'Can not login')
    }
}

module.exports = {
    login
};