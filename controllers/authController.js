import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

// Helper to create JWT
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const user = await User.create({ fullName, email, password, role });
    const token = createToken(user);
    res.status(StatusCodes.CREATED).json({
      user: { fullName: user.fullName, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.status(StatusCodes.OK).json({
      user: { fullName: user.fullName, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
export const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'User logged out' });
};
