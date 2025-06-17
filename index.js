const express = require('express');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3000;

// Redis client
const client = redis.createClient({
  host: 'redis',
  port: 6379
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Todo App CI/CD Test hhhhhhhhhhhhhhhhhhhhhh', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
