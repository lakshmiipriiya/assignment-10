require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const movies = require('./sampleMovies.json');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    await Movie.deleteMany({}); // clears existing documents in Movies
    const inserted = await Movie.insertMany(movies);
    console.log(`Inserted ${inserted.length} movies into ${mongoose.connection.name}.Movies`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
