const {UnAuthenticatedError} = require("../errors/index")
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authrization = req.headers.authorization
    if (!authrization || !authrization.startsWith('Bearer')) {
        throw new UnAuthenticatedError('Token is missing or invalid')
    }
    const token = authrization.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch(err) {
        throw new UnAuthenticatedError('Invalid Authentication')
    }
}

module.exports = auth