import { DataTypes } from 'sequelize';
import sequelize from '../util/db.js';

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pub_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
}, {
  tableName: 'bookshelf',
  schema: 'library',
  timestamps: false,
});

export default Book;