
const errorResponse = function(res, message){
    const resdata = {

        success: false,
        message,
    }
    return res.status(500).json(resdata)
}

const validationErrorWithData = function(res, message, errors){
    let array = []
    errors.forEach(e => array.push(e.msg))
    const resdata = {

        success: false,
        message,
        error: array
    }
    return res.status(400).json(resdata)
}

const validationError = function(res, message){
    const resdata = {

        success: false,
        message
    }
    return res.status(400).json(resdata)
}

const notFound = function(res, message){
    const resdata = {

        success: false,
        message,
    }
    return res.status(404).json(resdata)
}


const successWithData = function(res, message, data){
    const resdata = {

        success: true,
        message,
        data

    }
    return res.status(200).json(resdata)
}

const success = function(res, message){
    const resdata = {

        success: true,
        message,


    }
    return res.status(200).json(resdata)
}

module.exports = {
    errorResponse,
    validationErrorWithData,
    validationError,
    notFound,
    success,
    successWithData
};