// Import necessary modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// Create the Express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

// Define route to get all transactions
app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching transactions' });
    } else {
      res.json(results);
    }
  });
});

// Define route to record a transaction
app.post('/record-transaction', (req, res) => {
  const { total, items } = req.body;
  
  // Insert transaction into the database
  const query = 'INSERT INTO transactions (amount) VALUES (?)';

  db.query(query, [total], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error recording transaction' });
      return;
    }

    res.json({ message: 'Transaction recorded successfully', transactionId: result.insertId });
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
