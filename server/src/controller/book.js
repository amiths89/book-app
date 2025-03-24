import Book from '../models/book.js';
import Author from '../models/author.js';
import logger from '../util/logger.js';

export async function getBooks(req, res) {
  try {
    const books = await Book.findAll({
      include: [{ model: Author, attributes: ['name'] }],
    });

    const authors = await Author.findAll();

    const formattedBooks = await Promise.all(books.map(async (book) => {
      let authorName = 'Unknown Author';
  
      if (book.author_id) {
          const author = await Author.findOne({ where: { id: book.author_id } });
          if (author) {
              authorName = author.name;
          }
      }
  
      return {
          id: book.id,
          title: book.title,
          author: authorName,
          genre: book.genre,
          pub_date: book.pub_date,
          isbn: book.isbn,
      };
  }));

    res.json(formattedBooks);
    logger.info({ message: 'Books fetched successfully' });
    console.log('Books fetched successfully');
} catch (error) {
    logger.error({ message: 'Error fetching books', error: error });
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createBook(req, res) {
  const { title, author, pub_date, genre, isbn } = req.body;

  if (!title || !author || !pub_date || !genre) {
    return res.status(400).json({ error: 'Title, author, published date and genre required' });
  }

  try {
    let existingAuthor = await Author.findOne({ where: { name: author } });
    let authorId;

    if (existingAuthor) {
      authorId = existingAuthor.id;
    } else {
      const newAuthor = await Author.create({ name: author });
      authorId = newAuthor.id;
    }

    const newBook = await Book.create({ title, author_id: authorId, pub_date, genre, isbn });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, pub_date, genre, isbn } = req.body;

  if (!title || !author || !pub_date || !genre) {
    return res.status(400).json({ error: 'Title, author, published date and genre required' });
  }

  try {
    let existingAuthor = await Author.findOne({ where: { name: author } });
    let authorId;

    if (existingAuthor) {
      authorId = existingAuthor.id;
    } else {
      const newAuthor = await Author.create({ name: author });
      authorId = newAuthor.id;
    }

    const [updatedRows] = await Book.update(
      { title, author_id: authorId, pub_date, genre, isbn },
      { where: { id }, returning: true }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const updatedBook = await Book.findByPk(id);
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const deletedRows = await Book.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getSortedBooks(req, res) {
  const { sortBy } = req.query;

  if (!sortBy || (sortBy !== 'title' && sortBy !== 'author')) {
    return res.status(400).json({ error: 'Invalid sorting parameter. Can only use title or author.' });
  }

  try {
      let books;
      if (sortBy === 'author') {
        books = await Book.findAll({
            include: [{ model: Author, attributes: ['name'] }],
            order: [[Author, 'name', 'ASC']]
        });
    } else {
        books = await Book.findAll({
            include: [{ model: Author, attributes: ['name'] }],
            order: [[sortBy, 'ASC']]
        });
    }

    const formattedBooks = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.Author && book.Author.name ? book.Author.name : 'Unknown Author',
        genre: book.genre,
        pub_date: book.pub_date,
        isbn: book.isbn,
    }));

    res.json(formattedBooks);

  } catch (error) {
    console.error('Error sorting books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      include: [{ model: Author, attributes: ['name'] }],
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const formattedBook = {
      id: book.id,
      title: book.title,
      author: book.Author.name,
      genre: book.genre,
      pub_date: book.pub_date,
      isbn: book.isbn,
    };

    res.json(formattedBook);

  } catch (error) {
    console.error('Error getting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}