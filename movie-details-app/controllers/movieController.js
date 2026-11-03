const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const dbReady = () => mongoose.connection.readyState === 1;

const dbErrorPage = (res) =>
  res.status(503).render('error', {
    title: 'Database unavailable',
    message: 'Could not connect to the movie database. Check MONGODB_URI and make sure MongoDB is running.'
  });

// GET / : list movies with search and genre filter
exports.listMovies = async (req, res, next) => {
  try {
    if (!dbReady()) return dbErrorPage(res);

    const search = (req.query.search || '').trim().slice(0, 100);
    const genre = (req.query.genre || '').trim();

    const filter = {};
    if (search) filter.movieName = { $regex: escapeRegex(search), $options: 'i' };
    if (genre) filter.genre = genre;

    const [movies, genres] = await Promise.all([
      Movie.find(filter).sort({ movieName: 1 }).lean(),
      Movie.distinct('genre')
    ]);

    res.render('index', {
      title: 'Movie Listings',
      movies,
      genres: genres.sort(),
      search,
      genre,
      total: movies.length
    });
  } catch (err) {
    next(err);
  }
};

// GET /movies/:id : single movie details
exports.movieDetails = async (req, res, next) => {
  try {
    if (!dbReady()) return dbErrorPage(res);

    const movieId = Number(req.params.id);
    if (!Number.isInteger(movieId)) {
      return res.status(404).render('error', { title: 'Movie not found', message: 'Invalid movie ID.' });
    }

    const movie = await Movie.findOne({ movieId }).lean();
    if (!movie) {
      return res.status(404).render('error', { title: 'Movie not found', message: 'No movie exists with this ID.' });
    }

    res.render('details', { title: movie.movieName, movie });
  } catch (err) {
    next(err);
  }
};

// GET /api/movies : all movies as JSON
exports.apiMovies = async (req, res, next) => {
  try {
    if (!dbReady()) {
      return res.status(503).json({ error: 'Database unavailable' });
    }
    const movies = await Movie.find().sort({ movieId: 1 }).lean();
    if (movies.length === 0) {
      return res.status(200).json({ message: 'No movies found', movies: [] });
    }
    res.json({ count: movies.length, movies });
  } catch (err) {
    next(err);
  }
};
