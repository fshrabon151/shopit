const express = require('express');
const app = express();
const colors = require('colors');
const errorMiddle = require('./middlewares/error');

app.use(express.json());
// Import all routes
const products = require('./routes/product');

app.use('/api/v1', products);

// Middleware to handle errors
app.use(errorMiddle);

module.exports = app;
