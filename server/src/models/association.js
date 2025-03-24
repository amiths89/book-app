import User from './user.js';
import Book from './book.js';
import UserBook from './userbook.js';
import Author from './author.js';

User.belongsToMany(Book, { through: UserBook, foreignKey: 'userId', otherKey: 'bookId' });
Book.belongsToMany(User, { through: UserBook, foreignKey: 'bookId', otherKey: 'userId' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

export { User, Book };