const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Check your .env file.');
    return false;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected to database: ${mongoose.connection.name}`);
    return true;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return false;
  }
};

module.exports = connectDB;
