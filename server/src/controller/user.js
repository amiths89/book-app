import UserBook from "../models/userbook.js";
import Book from '../models/book.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import Author from '../models/author.js'

export async function getUsers(req,res){
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserBooks(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const usersbooks = await UserBook.findAll({where:{userId:id}});
    if(usersbooks.length===0){
      return res.status(200).json({ message: 'User has no books', books: [] });
    }
    const ids = usersbooks.map((ub)=>ub.bookId);
    const resultBooks = await Book.findAll({
      where: { id: ids },
      include: [{ model: Author, attributes: ['name'] }],
    });

    const formattedBooks = resultBooks.map(book => ({
      id: book.id,
      title: book.title,
      author: book.Author ? book.Author.name : 'Unknown Author',
      genre: book.genre,
      pub_date: book.pub_date,
      isbn: book.isbn,
    }));

    res.json(formattedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

  export async function createUser(req, res) {
    const { username, password, email } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'username, password, email required' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username: username, 
        password: hashedPassword, 
        email: email});
      res.status(201).json({message:"New User created", user:{
        id:newUser.id,
        username: newUser.username,
        email:newUser.email
      }});
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  export async function deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedRows = await User.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }