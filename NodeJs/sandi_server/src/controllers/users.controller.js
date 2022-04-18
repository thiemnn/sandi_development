const usersService = require('../services/users.service');
const responseHelper = require('../helpers/response.helper');

const login = async(req, res, next) => {
    var result = await usersService.login(req.body);
    if(result && result.length > 0){
        return responseHelper.successWithData(res, 'login successfully', result[0])
    } else{
        return responseHelper.notFound(res, 'Can not login')
    }
}

const register = async(req, res, next) => {
    var result = await usersService.register(req.body);
    if(result){
        return responseHelper.success(res, 'Insert record successfully')
    } else{
        return responseHelper.errorResponse(res, 'Can not register user')
    }
}

const addContact = async(req, res, next) => {
    var result = await usersService.addContact(req.body);
    if(result){
        return responseHelper.success(res, 'Insert record successfully')
    } else{
        return responseHelper.errorResponse(res, 'Can not register user')
    }
}

module.exports = {
    login,
    register,
    addContact
};