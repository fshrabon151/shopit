const express = require('express');
const app = express();
const colors = require('colors');
const errorMiddlewares = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// Setting up config files
dotenv.config({ path: 'backend/config/config.env' });
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Middleware to handle errors
app.use(errorMiddlewares);

module.exports = app;
