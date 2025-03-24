import { Sequelize } from 'sequelize';
import Book from '../../src/models/book.js'; 
import Author from '../../src/models/author.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../../../.env') });

describe('Database Test', () => {
    let sequelize;

    beforeAll(async () => {
        try {
            const sequelize = new Sequelize(
                process.env.POSTGRES_DB,
                process.env.POSTGRES_USER,
                process.env.POSTGRES_PASSWORD,
                {
                  host: process.env.POSTGRES_HOST,
                  port: process.env.POSTGRES_PORT,
                  dialect: 'postgres',
                  logging: false,
                }
              );

              await Author.sync();
              await Book.sync();
              Book.belongsTo(Author, { foreignKey: 'authorId' });
            await sequelize.authenticate();
            console.log('Database connection has been established successfully.');

        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    });

    it('should connect to the database successfully', async () => {
        expect(true).toBe(true);
    });

    afterAll(async () => {
        if (sequelize) {
            await sequelize.close();
        }
    });
});