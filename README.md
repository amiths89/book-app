# Bookshelf

This is a simple book management app

## Table of Contents

1.  **Prerequisites**
2.  **Installation**
3.  **Usage**
4.  **API Endpoints**

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
    git clone [https://github.com/amiths89/book-app.git](https://github.com/amiths89/book-app.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd book-app
    ```

3.  Run docker compose:

    ```bash
    docker compose --env-file .env up
    ```

## 3. Usage

*Here's how to use the project:*

To run the application, open a browser open the URL: [https://localhost:8080/library]

## 4. API Endpoints

# GET requests

### Book Endpoints

*The following API endpoints are available for books:*

1.  **GET /library:** Retrieves a list of books.
2.  **GET /library/:id:** Retrieves book by id
3.  **GET /library/sorted?sortBy={sortBy}** sorts catalog by title or author