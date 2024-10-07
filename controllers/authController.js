import { StatusCodes } from "http-status-codes"
import User from '../models/UserSchema.js'
import { comparePassword, hashPassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError, BadRequestError } from "../errors/customErrors.js"
import { createJWT } from "../utils/tokenUtils.js"



export const register = async (req, res) => {
  const isFirstAccount = await User.countDocuments() === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'

  if (req.body.password.length < 8) {
    throw new UnauthenticatedError('Password must be at least 8 characters long');
  }

  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword



  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: 'user created' })
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  const isValidUser = user && (await comparePassword(req.body.password, user.password))

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials')

  const token = createJWT({ userId: user._id, role: user.role, name: user.fullName })

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',

  })
  res.status(StatusCodes.OK).json({ msg: 'user logged in' })
}

export const logout = (req, res) => {
  //res.clearCookie('token', { path: '/' });
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}
