import express from 'express';
import {
    createUser,
    deleteUser,
    getUserBooks,
    getUsers
} from '../controller/user.js';
import { validationResult,param,body  } from 'express-validator';
const userRouter = express.Router();

// Validations
const validateUserIdParam = [
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID. ID must be a positive integer.'),
];

const validateCreateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .isAlphanumeric()
      .withMessage('Password must be alphanumeric'),
];

const validateUserId = [
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID. ID must be a positive integer.'),
];

// Get user's books route
userRouter.get('/:id', validateUserIdParam, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  getUserBooks(req, res);
});

// Create user route
userRouter.post('/', validateCreateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  createUser(req, res);
});

// Get all users route
userRouter.get('/', async (req, res) => {
  getUsers(req, res);
});

// Delete user route
userRouter.delete('/:id', validateUserId, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  deleteUser(req, res);
});

export default userRouter;