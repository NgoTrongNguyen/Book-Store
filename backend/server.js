const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://bookadmin:securepassword123@localhost:5432/bookstore'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Routes

// 1. Get all books
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// 2. Get book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// 3. Get books by category
app.get('/api/books/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE category = $1 ORDER BY created_at DESC', [category]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// 4. Get reviews for a book
app.get('/api/books/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM reviews WHERE book_id = $1 ORDER BY created_at DESC', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// 5. Add review
app.post('/api/books/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, rating, comment } = req.body;
    
    if (!customer_name || !rating) {
      return res.status(400).json({ error: 'Name and rating are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const result = await pool.query(
      'INSERT INTO reviews (book_id, customer_name, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, customer_name, rating, comment]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// 6. Create pre-order
app.post('/api/pre-orders', async (req, res) => {
  try {
    const { book_id, customer_name, customer_email, customer_phone, quantity, delivery_address, notes } = req.body;
    
    // Validation
    if (!book_id || !customer_name || !customer_email || !customer_phone || !quantity || !delivery_address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!validator.isEmail(customer_email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }
    
    // Get book price
    const bookResult = await pool.query('SELECT price FROM books WHERE id = $1', [book_id]);
    
    if (bookResult.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const total_price = bookResult.rows[0].price * quantity;
    
    // Insert pre-order
    const result = await pool.query(
      'INSERT INTO pre_orders (book_id, customer_name, customer_email, customer_phone, quantity, delivery_address, notes, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [book_id, customer_name, customer_email, customer_phone, quantity, delivery_address, notes || null, total_price]
    );
    
    res.status(201).json({
      message: 'Pre-order created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create pre-order' });
  }
});

// 7. Get all pre-orders (admin)
app.get('/api/pre-orders', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT po.*, b.title FROM pre_orders po JOIN books b ON po.book_id = b.id ORDER BY po.created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pre-orders' });
  }
});

// 8. Get pre-order by ID
app.get('/api/pre-orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT po.*, b.title FROM pre_orders po JOIN books b ON po.book_id = b.id WHERE po.id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pre-order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pre-order' });
  }
});

// 9. Update pre-order status (admin)
app.put('/api/pre-orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const result = await pool.query(
      'UPDATE pre_orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pre-order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update pre-order' });
  }
});

// 10. Search books
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const searchTerm = `%${q}%`;
    const result = await pool.query(
      'SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 OR description ILIKE $1 ORDER BY title',
      [searchTerm]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search books' });
  }
});

// 11. Get statistics (admin)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const booksCount = await pool.query('SELECT COUNT(*) FROM books');
    const preOrdersCount = await pool.query('SELECT COUNT(*) FROM pre_orders');
    const totalRevenue = await pool.query('SELECT SUM(total_price) FROM pre_orders');
    const ordersByStatus = await pool.query('SELECT status, COUNT(*) as count FROM pre_orders GROUP BY status');
    
    res.json({
      books_count: parseInt(booksCount.rows[0].count),
      pre_orders_count: parseInt(preOrdersCount.rows[0].count),
      total_revenue: totalRevenue.rows[0].sum || 0,
      orders_by_status: ordersByStatus.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database URL: ${process.env.DATABASE_URL || 'postgresql://bookadmin:securepassword123@localhost:5432/bookstore'}`);
});
