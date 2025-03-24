import express from 'express';
import {
  getBooks,
  createBook,
  deleteBook,
  getSortedBooks,
  updateBook,
  getBookById,
} from '../controller/book.js';
import { query,validationResult,param,body  } from 'express-validator';

const bookRouter = express.Router();

//Validations
const validateSortQuery = [
  query('sortBy')
    .notEmpty()
    .withMessage('sortBy parameter is required')
    .isIn(['title', 'author', 'isbn'])
    .withMessage('Invalid sortBy value. Must be title, author, or isbn.'),
];

const validateBookIdQuery = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid input for book id'),
];

const validateCreateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author name is required'),
  body('genre').optional().isString().withMessage('Genre must be a string'),
  body('pub_date').optional().isISO8601().withMessage('Publication date must be a valid date'),
  body('isbn').optional().isISBN().withMessage('ISBN is invalid'),
];

const validateUpdateBook = [
  param('id').isInt({ min: 1 }).withMessage('Invalid book ID. ID must be a positive integer.'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('author').optional().notEmpty().withMessage('Author name cannot be empty'),
  body('genre').optional().isString().withMessage('Genre must be a string'),
  body('pub_date').optional().isISO8601().withMessage('Publication date must be a valid date'),
  body('isbn').optional().isISBN().withMessage('ISBN is invalid'),
];

//Sorting route
bookRouter.get('/sorted', validateSortQuery, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getSortedBooks(req, res);
});

//Get book by id route
bookRouter.get('/:id', validateBookIdQuery, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  getBookById(req, res);
});

//Create Book record route
bookRouter.post('/', validateCreateBook, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createBook(req, res);
});

//Edit existing book record route
bookRouter.put('/:id', validateUpdateBook, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateBook(req, res);
});

//Delete book route
bookRouter.delete('/:id', validateBookIdQuery, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  deleteBook(req, res);
});

//Get all books route
bookRouter.get('/', getBooks);

export default bookRouter;