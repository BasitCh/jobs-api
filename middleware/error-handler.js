const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors/custom-api')

const errorHandlerMiddleWare = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong'
    }
    if (err instanceof CustomApiError) {
        res.status(err.statusCode).json({msg: err.message})
    }

    res.status(customError.statusCode).json({msg: customError.message})
}

module.exports = errorHandlerMiddleWare