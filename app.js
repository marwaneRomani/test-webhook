const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

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

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await client.ping();
    res.json({ status: 'healthy', redis: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', redis: 'disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
