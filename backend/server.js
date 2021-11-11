const app = require('./app');
const connectDB = require('./config/db');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

// Handle the uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log(`Shutting down server due to uncaught exception..`);
  process.exit(1);
});

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  // Dev logging middleware
  app.use(morgan('dev'));
}

// Connecting to database
connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandle promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log(`Shutting down server due to unhandled exception..`);
  server.close(() => {
    process.exit(1);
  });
});
