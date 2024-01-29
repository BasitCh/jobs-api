const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).send({ user })
}

const login = (req, res) => {
    res.status(StatusCodes.OK).send('Login successful!')
}

module.exports = {
    register,
    login
}