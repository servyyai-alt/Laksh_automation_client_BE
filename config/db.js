const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/laksh-automations';

let cached = global.__lakshMongoose;

if (!cached) {
  cached = global.__lakshMongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
