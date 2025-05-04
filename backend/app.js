const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middleware/error');
const logger = require('./config/logger');
// const { swaggerUi, swaggerDocument, options } = require('./config/swagger');

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const cars = require('./routes/cars');
const services = require('./routes/services');
const bookings = require('./routes/bookings');
const notifications = require('./routes/notifications');
const serviceProviders = require('./routes/serviceProviders');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security middleware
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP param pollution
app.use(cors()); // Enable CORS

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later',
      details: 'Rate limit: 100 requests per minute'
    }
  },
  headers: true
});
app.use(limiter);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI
// app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/cars', cars);
app.use('/api/v1/services', services);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/notifications', notifications);
app.use('/api/v1/service-providers', serviceProviders); 

// Error handler middleware - should be after routes
app.use(errorHandler);

module.exports = app; 