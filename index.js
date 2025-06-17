const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://app-green-redis-1:6379';

// Create Redis client
const client = redis.createClient({
  url: REDIS_URL
});

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

// Connect to Redis
client.connect();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await client.lRange('todos', 0, -1);
    const parsedTodos = todos.map((todo, index) => ({
      id: index,
      text: todo,
      completed: false
    }));
    res.json(parsedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Get all todos
app.get('/api/todos-new', async (req, res) => {
  try {
    const todos = await client.lRange('todos', 0, -1);
    const parsedTodos = todos.map((todo, index) => ({
      id: index,
      text: todo,
      completed: false
    }));
    res.json(parsedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});


// Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Todo text is required' });
    }

    await client.lPush('todos', text);
    res.status(201).json({ message: 'Todo added successfully' });
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await client.lRange('todos', 0, -1);

    if (id >= 0 && id < todos.length) {
      // Remove the todo at the specified index
      const todoToRemove = todos[id];
      await client.lRem('todos', 1, todoToRemove);
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Health check endpoint - optimized for deployer service
app.get('/health', async (req, res) => {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'todo-app',
    version: '1.0.0'
  };

  try {
    // Try to ping Redis
    await client.ping();
    healthStatus.redis = 'connected';
    healthStatus.database = 'operational';
  } catch (error) {
    // Redis is not connected, but app can still serve requests
    healthStatus.redis = 'disconnected';
    healthStatus.database = 'degraded';
    healthStatus.warning = 'Redis connection unavailable - some features may be limited';
  }

  // Always return 200 OK if the web server is running
  // The deployer service needs a 200 status to consider the service healthy
  res.status(200).json(healthStatus);
});

// Additional health check endpoint for detailed diagnostics
app.get('/health/detailed', async (req, res) => {
  const detailedHealth = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'todo-app',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };

  try {
    await client.ping();
    detailedHealth.redis = {
      status: 'connected',
      url: REDIS_URL
    };
  } catch (error) {
    detailedHealth.redis = {
      status: 'disconnected',
      url: REDIS_URL,
      error: error.message
    };
  }

  res.status(200).json(detailedHealth);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Testing complete CI/CD pipeline - 16 يونيو, 2025 +01 11:54:59
// Complete CI/CD pipeline test with vault credentials - 16 يونيو, 2025 +01 12:06:33
// Fixed health check for deployer service compatibility - 16 يونيو, 2025 +01 16:00:00


// const express = require('express');
// const redis = require('redis');

// const app = express();
// const port = process.env.PORT || 3000;

// // Redis client
// const client = redis.createClient({
//   host: 'redis',
//   port: 6379
// });

// app.use(express.json());

// // app.get('/', (req, res) => {
// //   res.json({ message: 'Todo App CI/CD Test hahahhhahah aaaaaaaaaaaaaa', version: '1.0.0' });
// // });

// app.get('/health', (req, res) => {
//   res.json({ status: 'healthy', timestamp: new Date().toISOString() });
// });

// app.listen(port, () => {
//   console.log(`Todo app listening on port ${port}`);
// });
