# Bookshelf

This is a simple book management app

## Table of Contents

1.  **Prerequisites**
2.  **Installation**
3.  **Usage**
4.  **API Endpoints**
5.  **Debugging**
6.  **Testing**

## 1. Prerequisites

*Before you begin, ensure you have met the following requirements:*

* **Node.js:** Version 16 or higher is required. You can download it from [nodejs.org](https://nodejs.org/).
* **npm:** Node Package Manager (npm) is installed with Node.js.
* **Docker:** Docker is required for containerization. You can download it from [docker.com](https://www.docker.com/get-started).
* **Docker Compose:** Docker Compose is required for orchestrating multi-container Docker applications. Ensure it's installed by running `docker compose version` in your terminal. If it's not installed, follow the instructions on the [Docker documentation](https://docs.docker.com/compose/install/linux/).

## 2. Installation

To get started, follow these steps:

1.  Clone the repository:

    ```bash
    git clone git@github.com:amiths89/book-app.git
    ```

2.  Navigate to the project directory:

    ```bash
    npm install
    ```

3.  Run docker compose:

    ```bash
    docker compose --env-file .env up
    ```

## 3. Usage

To run the application, open a browser open the URL: https://localhost:8080/library

## 4. API Endpoints

### Book Endpoints

*The following API endpoints are available for books:*

**GET http://localhost:8080/library/**

**POST http://localhost:8080/library/**

    * **Example Request:**
        ```http
        POST /library HTTP/1.1
        Host: localhost:5000
        Content-Type: application/json

        {
            "title": "The Name of the Wind",
            "author": "Patrick Rothfuss",
            "genre": "Fantasy",
            "pub_date": "2010-03-27",
            "isbn": "978-0756404079"
        }
        ```

**DELETE http://localhost:8080/library/30**

**GET http://localhost:8080/library/sorted?sortBy=title**

**PUT http://localhost:8080/library/20**

*The following API endpoints are available for users:*

**POST http://localhost:8080/user/**

**DELETE http://localhost:8080/user/4**

**GET http://localhost:8080/user/3**

5.  **DELETE /library/:id:** Deletes a book.

## 5. Debugging

For debugging the server code.

1. Comment out the server block from docker-compose.yaml
2. Replace the DB host name in .env(POSTGRES_HOST) to localhost
3. Update the logs path as mentioned in logger.js comments
4. Run the docker compose to start the database.
5. Run the task Launch via NPM.

## 6. Testing

Currently there are only 7 tests. More need to be included. While running the server locally as mentioned in the previous debugging steps. Run the following in terminal:

    npm run test

