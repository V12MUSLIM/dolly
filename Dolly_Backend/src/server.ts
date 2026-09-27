import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
const app = express();
const port = 3000;

// Configure your PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tododb',
  password: '3I[1\\S1^Nw*x', // Replace with your actual password
  port: 5432,
});
app.use(cors({
  origin: 'http://localhost:5173'
}));
// Middleware to parse incoming JSON payloads (useful for POST requests later)
app.use(express.json());

// Define a route to get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT title FROM todo ORDER BY created_at DESC;');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/todos`);
});
