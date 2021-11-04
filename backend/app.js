const express = require('express');
const app = express();
const colors = require('colors');
const errorMiddle = require('./middlewares/error');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products);
app.use('/api/v1', auth);

// Middleware to handle errors
app.use(errorMiddle);

module.exports = app;
