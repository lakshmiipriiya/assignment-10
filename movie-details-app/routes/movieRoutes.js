const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.listMovies);
router.get('/movies/:id', movieController.movieDetails);
router.get('/api/movies', movieController.apiMovies);

module.exports = router;
