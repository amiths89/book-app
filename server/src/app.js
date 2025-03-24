import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './util/db.js';
import bookRouter from './routes/book.js';
import userRouter from './routes/user.js';
import './../src/models/association.js';
import logger from './util/logger.js';

logger.info("Resolved .env path:", path.resolve('../.env'));
dotenv.config({ path: path.resolve('../.env') });

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    logger.info({message: 'Database connection has been established successfully.'});
    return sequelize.sync();
  })
  .catch((err) => logger.error({message: 'Unable to connect to the database:', error: err}));

// Routes
app.use('/library', bookRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  logger.info({message: `Server listening at http://localhost:${PORT}`});
});

app.use((err, req, res, next) => {
  logger.error({message: 'Express error:', error: err});
  res.status(500).send('Something went wrong!');
});