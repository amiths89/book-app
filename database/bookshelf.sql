CREATE SCHEMA library;

CREATE TABLE library.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE library.authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE library.bookshelf (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INTEGER REFERENCES library.authors(id) ON DELETE CASCADE,
    genre VARCHAR(255) NOT NULL,
    pub_date DATE NOT NULL,
    isbn VARCHAR(20) UNIQUE
);

CREATE TABLE library.user_books (
    user_id INTEGER REFERENCES library.users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES library.bookshelf(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, book_id)
);

CREATE INDEX idx_bookshelf_author_id ON library.bookshelf (author_id);
CREATE INDEX idx_user_books_user_id ON library.user_books (user_id);
CREATE INDEX idx_user_books_book_id ON library.user_books (book_id);

INSERT INTO library.users (username, password, email) VALUES
('john_doe', 'hashed_password_123', 'john.doe@example.com'),
('jane_smith', 'hashed_password_456', 'jane.smith@example.com'),
('alice_bob', 'hashed_password_789', 'alice.bob@example.com');

INSERT INTO library.authors (name) VALUES
('Timothy Zahn'), ('J.R.R. Tolkien'), ('Jane Austen'), ('George Orwell'),
('Harper Lee'), ('Douglas Adams'), ('F Scott Fitzgerald'), ('Herman Melville'), ('Frank Herbert');

INSERT INTO library.bookshelf (title, author_id, genre, pub_date, isbn) VALUES
('Thrawn', 1, 'Fantasy', '2017-07-29', '978-0525429769'),
('The Lord of the Rings', 2, 'Fantasy', '1954-07-29', '978-0618260293'),
('Pride and Prejudice', 3, 'Romance', '1813-01-28', '978-0141439518'),
('1984', 4, 'Dystopian', '1949-06-08', '978-0451524935'),
('To Kill a Mockingbird', 5, 'Classic', '1960-07-11', '978-0061120084'),
('The Hitchhiker''s Guide to the Galaxy', 6, 'Science Fiction', '1979-10-12', '978-0345391803'),
('The Great Gatsby', 7, 'Classic', '1925-04-10', '978-0743273565'),
('Moby-Dick', 8, 'Adventure', '1851-11-14', '978-0142437247'),
('Dune', 9, 'Science Fiction', '1965-08-01', '978-0441172719');

-- John Doe
INSERT INTO library.user_books (user_id, book_id) VALUES
(1, 1), -- Thrawn
(1, 3), -- Pride and Prejudice
(1, 5), -- To Kill a Mockingbird
(1, 9); -- Dune

-- Jane Smith
INSERT INTO library.user_books (user_id, book_id) VALUES
(2, 2), -- The Lord of the Rings
(2, 4), -- 1984
(2, 6), -- The Hitchhiker's Guide
(2, 8); -- Moby-Dick

-- Alice Bob
INSERT INTO library.user_books (user_id, book_id) VALUES
(3, 7), -- The Great Gatsby
(3, 9); -- Dune