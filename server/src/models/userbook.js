import { DataTypes } from 'sequelize';
import sequelize from '../util/db.js';

const UserBook = sequelize.define('UserBook', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    primaryKey: true,
    field: 'user_id',
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'bookshelf',
      key: 'id',
    },
    primaryKey: true,
    field: 'book_id',
  },
}, {
  tableName: 'user_books',
  schema: 'library',
  timestamps: false,
});
export default UserBook;