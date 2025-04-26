require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const bannerRoutes = require('./routes/banner.routes');
const postRoutes = require('./routes/post.routes'); // Add this line
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes'); // Add this line
const dashboardRoutes = require('./routes/dashboard.routes');
const chatRoutes = require('./routes/chatRoutes'); // Thêm chat routes
const geminiRoutes = require('./routes/gemini.routes'); // Add Gemini routes
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

// Sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

// Routes
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/examples', exampleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/posts', postRoutes); // Add this line
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); // Add this line
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes); // Thêm routes cho chat API
app.use('/api/gemini', geminiRoutes); // Add routes for Gemini API
// Serve static files from uploads directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Web2D API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing
module.exports = app;