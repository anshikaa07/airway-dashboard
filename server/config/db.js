// ============================================================
// DATABASE CONNECTION — MongoDB via Mongoose
// ============================================================
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 8+ handles these internally, but good to be explicit
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process on DB failure
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.');
});

module.exports = connectDB;
