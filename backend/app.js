const express = require('express');
const app = express();
const colors = require('colors');
const path = require('path');
const errorMiddlewares = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');
// Setting up config files
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });

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

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build/')))

    app.get('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    })
}

if (process.env.NODE_ENV === 'PRODUCTION') {
    // set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Middleware to handle errors
app.use(errorMiddlewares);

module.exports = app;
