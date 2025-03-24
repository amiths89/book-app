import { DataTypes } from 'sequelize';
import sequelize from '../util/db.js';

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'authors',
  schema: 'library',
  timestamps: false,
});

export default Author;