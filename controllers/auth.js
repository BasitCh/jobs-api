const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const {BadRequestError, UnAuthenticatedError} = require('../errors/index')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    user.password = undefined
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).send({ user, token })
}

const login = async (req, res) => {
   const {email, password} = req.body
   if (!email || !password) {
    throw new BadRequestError(`Please provide email and password`)
   }
   const user = await User.findOne({ email })
   if (!user) {
    throw new UnAuthenticatedError('User does not exist')
   }

   const isPasswordCorrect = await user.comparePassword(password)
   if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
   }

   const token = user.createJwt()
   res.status(StatusCodes.OK).json({ user, token })

}

module.exports = {
    register,
    login
}