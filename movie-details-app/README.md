# MovieDB - Movie Details App

Node.js + Express + MongoDB (Mongoose) + EJS.

## Setup

```bash
cd movie-details-app
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run seed                # inserts sample movies into MovieDB.Movies
npm start                   # or: npm run dev (auto-restart with nodemon)
```

Open http://localhost:3000

## Routes
- `GET /` - movie listing with search by name and genre filter
- `GET /movies/:id` - movie details (`:id` is `movieId`)
- `GET /api/movies` - all movies as JSON

## Notes
- Make sure MongoDB is running locally (`mongod`) or set `MONGODB_URI` to a MongoDB Atlas URI.
- The database `MovieDB` and collection `Movies` are created automatically on first insert.
- To insert sample data manually in mongosh: `use MovieDB` then `db.Movies.insertMany(<contents of seed/sampleMovies.json>)`.
- If the database is unavailable, pages show a friendly error instead of crashing.
