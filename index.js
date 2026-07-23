const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
// Trust the first proxy hop so rate limiting uses the real client IP in hosted environments.
app.set('trust proxy', 1);

const canonicalHost = 'www.lakshautomations.in';
const canonicalOrigin = `https://${canonicalHost}`;
const isLocalHost = (host = '') =>
  host === 'localhost' ||
  host === '127.0.0.1' ||
  host.startsWith('localhost:') ||
  host.startsWith('127.0.0.1:');
const allowedOrigins = new Set(
  [
    process.env.CLIENT_URL,
    'https://www.lakshautomations.in',
    'https://lakshautomations.in',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ].filter(Boolean)
);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return next();
  }

  const host = req.hostname;
  if (!isLocalHost(host) && host !== canonicalHost) {
    const target = new URL(req.originalUrl, canonicalOrigin);
    return res.redirect(301, target.toString());
  }

  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.has(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Laksh Automations API is running',
    endpoints: ['/api/health', '/api/products', '/api/enquiries', '/api/auth']
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Laksh Automations API is running', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/laksh-automations')
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
