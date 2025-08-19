const Movie = require('../models/Movie');
const parseExcel = require('../utils/excelParser');

/**
 * Create a single movie manually
 */
exports.createMovie = async (req, res) => {
  try {
    const { name, rating, genres, watchedUsers } = req.body;

    if (!name || !rating || !genres) {
      return res.status(400).json({ message: 'Name, rating, and genres are required' });
    }

    const movie = await Movie.create({
      name,
      rating,
      genres: Array.isArray(genres) ? genres : [genres],
      watchedUsers: watchedUsers || [],
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Bulk upload movies from Excel file
 */
exports.bulkUpload = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const moviesData = parseExcel(file.path);

    // Validate each movie
    const validMovies = moviesData.filter(movie => movie.name && movie.rating && movie.genres);

    if (!validMovies.length) {
      return res.status(400).json({ message: 'No valid movies found in Excel file' });
    }

    // Ensure genres are arrays
    const formattedMovies = validMovies.map(movie => ({
      name: movie.name,
      rating: movie.rating,
      genres: Array.isArray(movie.genres) ? movie.genres : movie.genres.toString().split(',').map(g => g.trim()),
      watchedUsers: movie.watchedUsers ? movie.watchedUsers.split(',').map(id => id.trim()) : [],
    }));

    const movies = await Movie.insertMany(formattedMovies);

    res.status(201).json({ message: 'Movies uploaded successfully', movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * List movies with pagination & filtering
 */
exports.listMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, rating } = req.query;
    const query = {};

    if (genre) query.genres = genre;
    if (rating) query.rating = Number(rating);

    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
