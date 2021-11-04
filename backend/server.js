const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');

// Handle the uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log(`Shutting down server due to uncaught exception..`);
  process.exit(1);
});

// Setting up config files
dotenv.config({ path: 'backend/config/config.env' });

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
