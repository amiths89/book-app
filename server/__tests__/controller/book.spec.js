import { getBooks,createBook, getBookById,getSortedBooks } from '../../src/controller/book.js';
import { describe, expect, jest } from '@jest/globals';
import mockBook from '../../__mocks__/mockBook.json';
import mockAuthor from '../../__mocks__/mockAuthor.json';
import Book from '../../src/models/book.js';
import Author from '../../src/models/author.js';
import { json, where } from 'sequelize';
import { param } from 'express-validator';

jest.mock('../../src/models/book.js');
jest.mock('../../src/models/author.js');
describe('CRUD actions',()=>{

        beforeEach(() => {
            jest.clearAllMocks();
          });

          it('should return a list of books that includes author names', async () => {
            Book.findAll.mockResolvedValue(mockBook);
            Author.findOne.mockImplementation(({ where: { id } }) => 
                mockAuthor.find((author) => author.id === id)
            );

            const mockRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getBooks({}, mockRes);

            expect(Book.findAll).toHaveBeenCalledWith({
                include: [{ model: Author, attributes: ['name'] }],
            });

            const expectedFormattedBooks = mockBook.map(book => {
                const author = mockAuthor.find(author => author.id === book.author_id);
                return {
                    id: book.id,
                    title: book.title,
                    author: author.name,
                    genre: book.genre,
                    pub_date: book.pub_date,
                    isbn: book.isbn,
                };
            });

            expect(mockRes.json).toHaveBeenCalledWith(expectedFormattedBooks);
        });

        it('should return succesful creation of book record with new author',async ()=>{
            const mockReq = {
                body: {
                    title: 'New Book',
                    author: 'Dummy Author',
                    pub_date: '2023-10-27',
                    genre: 'Fiction',
                    isbn: '1234567890',
                },
            };
            const mockRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
        
            const createdBook = {
                id: 1,
                title: 'New Book',
                author_id: 1,
                genre: 'Fiction',
                pub_date: '2023-10-27',
                isbn: '1234567890',
            };
            const newAuthor = {id:1,name:"Dummy Author"};
            Author.findOne.mockResolvedValue(null);
            Author.create.mockResolvedValue(newAuthor);
            Book.create.mockResolvedValue(createdBook);
        
            await createBook(mockReq, mockRes);
            expect(Author.findOne).toHaveBeenCalledWith({ where: { name: 'Dummy Author' } });
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(createdBook);
        });
    
        it('should return succesful creation of book record with existing author',async ()=>{
            const timothyZahn = mockAuthor.find(a=>a.name==='Timothy Zahn');
            const mockReq = {
                body: {
                    title: 'Thrawn',
                    author: timothyZahn.name,
                    pub_date: '1991-05-01',
                    genre: 'Science Fiction',
                    isbn: '978-0553296121',
                },
            };
            const mockRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
    
            const createdBook = {
                id: 1,
                title: 'Thrawn',
                author_id: timothyZahn.id,
                pub_date: '1991-05-01',
                genre: 'Science Fiction',
                isbn: '978-0553296121',
            };
            Author.findOne.mockResolvedValue(timothyZahn);
            Book.create.mockResolvedValue(createdBook);
    
            await createBook(mockReq,mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(201);
        });

        it("should read the book record by id",async ()=>{
            const bookId = 2;
            const mockReq = {
                params: {
                    id: bookId,
                },
            };
            const foundBook = mockBook.find(book => book.id === bookId);
            const author = mockAuthor.find(author => author.id === foundBook.author_id);

            const mockBookFromDb = {
                id: foundBook.id,
                title: foundBook.title,
                genre: foundBook.genre,
                pub_date: foundBook.pub_date,
                isbn: foundBook.isbn,
                Author: {
                    name: author.name,
                },
            };

            Book.findByPk.mockResolvedValue(mockBookFromDb);

            const mockRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getBookById(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenCalledWith({
                id: foundBook.id,
                title: foundBook.title,
                author: author.name,
                genre: foundBook.genre,
                pub_date: foundBook.pub_date,
                isbn: foundBook.isbn,
            });
    
        });

        it('should return books sorted by title', async () => {
            const mockReq = {
                query: {
                    sortBy: 'title',
                },
            };
        
            Book.findAll.mockResolvedValue(mockBook.map(book => {
                const author = mockAuthor.find(a => a.id === book.author_id);
                return {
                  ...book,
                  Author: author ? {name: author.name} : null,
                }
              }));
        
            const mockRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
        
            const expectedFormattedBooks = mockBook.map(book => {
                const author = mockAuthor.find(author => author.id === book.author_id);
                return {
                    id: book.id,
                    title: book.title,
                    author: author.name,
                    genre: book.genre,
                    pub_date: book.pub_date,
                    isbn: book.isbn,
                };
            });
        
            await getSortedBooks(mockReq, mockRes);
        
            expect(mockRes.json).toHaveBeenCalledWith(expectedFormattedBooks);
        });

        it('should return books sorted by author name', async () => {
            const mockReq = {
                query: {
                    sortBy: 'author',
                },
            };
    
            Book.findAll.mockResolvedValue(mockBook.map(book => {
                const author = mockAuthor.find(a => a.id === book.author_id);
                return {
                  ...book,
                  Author: author ? {name: author.name} : null,
                }
              }));
    
            const mockRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
    
            const expectedFormattedBooks = mockBook.map(book => {
                const author = mockAuthor.find(author => author.id === book.author_id);
                return {
                    id: book.id,
                    title: book.title,
                    author: author.name,
                    genre: book.genre,
                    pub_date: book.pub_date,
                    isbn: book.isbn,
                };
            });
    
            await getSortedBooks(mockReq, mockRes);
    
            expect(mockRes.json).toHaveBeenCalledWith(expectedFormattedBooks);
        });
});
