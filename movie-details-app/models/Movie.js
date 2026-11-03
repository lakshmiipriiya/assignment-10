const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieId: { type: Number, required: true, unique: true, index: true },
    movieName: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true, index: true },
    releaseYear: { type: Number, required: true, min: 1888, max: 2100 },
    language: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 }, // minutes
    rating: { type: Number, required: true, min: 0, max: 10 },
    description: { type: String, required: true },
    posterUrl: { type: String, required: true }
  },
  { collection: 'Movies', timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
