const Product = require('../models/Product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/db');
const colors = require('colors');

const products = require('../data/products');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(products);
    console.log('All Products are added.');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
