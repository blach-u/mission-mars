## Features

- **Health Check**: Check if the server is running.
- **Get Astronauts**: Retrieve a list of astronauts from the SQLite database or a specific astronaut by ID.
- **Add Astronauts**: Add a new astronaut to the SQLite database.
- **Update Astronauts**: Update an astronaut's information by ID.
- **Delete Astronauts**: Delete an astronaut from the database by ID.
- **Swagger Documentation**: Explore the API documentation through Swagger UI.
- **ZOD Documentation**: Explore the API documentation through Swagger UI.

## Setup Instructions

### Installation

1. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

#### For Production
1. Run the application:
    ```bash
    npm start
    ```

2. The server will start running at `http://localhost:3001` (or the port specified in your environment).

#### For Development (with auto-reload)
1. Run the application with Nodemon for automatic restarts on code changes:
    ```bash
    npm run dev
    ```

2. The server will start running at `http://localhost:3001` (or the port specified in your environment).

### REST API Endpoints

#### 1. **Health Check**
- **Endpoint**: `GET /api/health/check`
- **Description**: Returns a simple message indicating the server is running.
- **Response**:
    - 200 OK: `Hello, Mars!`

#### 2. **Get All Astronauts**
- **Endpoint**: `GET /api/astronauts`
- **Description**: Retrieves a list of all astronauts from the SQLite database.
- **Response**:
    - 200 OK: A list of astronauts.

#### 3. **Get Astronaut by ID**
- **Endpoint**: `GET /api/astronauts?id=<astronaut_id>`
- **Description**: Retrieves a specific astronaut by their ID from the SQLite database.
- **Query Parameters**:
    - `id` (integer): The ID of the astronaut.
- **Response**:
    - 200 OK: The astronaut's details.
    - 404 Not Found: Astronaut not found with the provided ID.

#### 4. **Add Astronaut**
- **Endpoint**: `POST /api/astronauts`
- **Description**: Adds a new astronaut to the database.
- **Request Body**:
    ```json
    {
      "name": "John Doe",
      "role": "Engineer"
    }
    ```
- **Response**:
    - 201 Created: Astronaut added successfully.
    - 400 Bad Request: Invalid input (e.g., missing or invalid name/role).

#### 5. **Update Astronaut by ID**
- **Endpoint**: `PUT /api/astronauts/:id`
- **Description**: Updates an astronaut's details (name and/or role) by ID.
- **Path Parameters**:
    - `id` (integer): The ID of the astronaut to update.
- **Request Body**:
    ```json
    {
      "name": "John Doe",
      "role": "Engineer"
    }
    ```
- **Response**:
    - 200 OK: Astronaut updated successfully.
    - 404 Not Found: Astronaut not found with the provided ID.
    - 400 Bad Request: Invalid input (e.g., missing or invalid name/role).

#### 6. **Delete Astronaut by ID**
- **Endpoint**: `DELETE /api/astronauts/:id`
- **Description**: Deletes an astronaut from the database by ID.
- **Path Parameters**:
    - `id` (integer): The ID of the astronaut to delete.
- **Response**:
    - 200 OK: Astronaut deleted successfully.
    - 404 Not Found: Astronaut not found with the provided ID.

### Swagger API Documentation

Swagger documentation is available to explore and test the API endpoints:

- Visit the Swagger UI at:  
  `http://localhost:3001/api-docs`
  

### ZOD Validation Documentation

The server uses Zod for input validation on the POST and PUT requests. The Zod schema (`astronautSchema`) ensures:

- Name: Must be a string between 3 and 50 characters and string only.
- Role: Must be a string between 3 and 50 characters and string only.

- The `validateRequest` middleware checks if the input data complies with this schema before passing the request to the controller.
### Environment Variables

You can customize the port and environment by creating a `.env` file in the project root/config:

```bash
PORT=3001
NODE_ENV=development