import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './util/db.js';
import bookRouter from './routes/book.js';
import userRouter from './routes/user.js';
import './../src/models/association.js';

console.log("Resolved .env path:", path.resolve('../.env'));
dotenv.config({ path: path.resolve('../.env') });

const app = express();
const PORT = 5000;

app.use(express.json());

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .catch((err) => console.error('Unable to connect to the database:', err));

// Routes
app.use('/library', bookRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});