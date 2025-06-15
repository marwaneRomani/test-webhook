# Simple Todo App Demo

A simple todo list web application built with Node.js, Express, and Redis, containerized with Docker.

## Features

- ✅ Add new todos
- ❌ Delete todos
- 📊 Todo counter
- 🔄 Real-time health check
- 🐳 Fully containerized with Docker
- 📱 Responsive design

## Architecture

This demo consists of **2 Docker services**:

1. **Web App** (`web` service)
   - Node.js/Express server
   - Serves static files and API endpoints
   - Connects to Redis for data storage

2. **Redis Database** (`redis` service)
   - Redis 7 Alpine image
   - Persistent data storage
   - Used as the backend database

## Quick Start

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Clone and navigate to the project:**
   ```bash
   cd /path/to/this/directory
   ```

2. **Start the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Open your browser and go to: http://localhost:3000
   - The app should be running with a beautiful todo interface

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Development Mode

If you want to run in development mode with auto-reload:

1. **Install dependencies locally:**
   ```bash
   npm install
   ```

2. **Start Redis only:**
   ```bash
   docker-compose up redis -d
   ```

3. **Run the app in development mode:**
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Serve the main application
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Add a new todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /health` - Health check endpoint

## Project Structure

```
.
├── app.js              # Express server
├── package.json        # Node.js dependencies
├── Dockerfile          # Web app container definition
├── docker-compose.yml  # Multi-service orchestration
├── .dockerignore       # Docker ignore file
├── public/
│   ├── index.html      # Frontend HTML
│   ├── style.css       # Styling
│   └── script.js       # Frontend JavaScript
└── README.md           # This file
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** Redis
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Containerization:** Docker, Docker Compose

## Notes

- Redis data is persisted using Docker volumes
- The application includes health checks for Redis connectivity
- Both services are connected via a custom Docker network
- The web app automatically reconnects to Redis if the connection is lost
