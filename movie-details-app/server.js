require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(movieRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page not found',
    message: 'The page you are looking for does not exist.'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Something went wrong',
    message: 'An unexpected error occurred while loading movies.'
  });
});

(async () => {
  const connected = await connectDB();
  if (!connected) {
    console.warn('Starting without a database connection. Movie pages will show an error until MongoDB is available.');
  }
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
})();
