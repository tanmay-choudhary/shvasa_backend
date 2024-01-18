Express MongoDB Server
This is a basic Express server template with MongoDB integration. It provides API endpoints for managing agents and tickets. The server is configured to connect to a MongoDB database using the Mongoose library and includes basic error handling.

Prerequisites
Before running the server, ensure you have the following installed:

Node.js
MongoDB

Install dependencies:
npm install

Create a .env file in the project root and add your MongoDB connection URL:
DB_URL=your-mongodb-connection-url

Running the Server
To start the server, run:
node app.js

The server will run on http://localhost:8080.

API Endpoints
GET / - Returns a simple message indicating the server is running.
GET /health - Returns a JSON response indicating the server is working fine.
POST /api/agents - Creates a new agent.
GET /api/agents - Retrieves all agents.
POST /api/tickets - Creates a new ticket.
GET /api/tickets - Retrieves all tickets.

Deployed on Onrender : https://shvasa-backend.onrender.com
