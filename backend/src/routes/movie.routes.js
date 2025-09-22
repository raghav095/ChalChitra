import express from 'express';
import { Movie } from "../models/movie.model.js"; // Import your Mongoose model

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Use the Mongoose model to find all movies
    const allMovies = await Movie.find({}); 
    res.json(allMovies);
  } catch (error) {
    console.error("Error fetching movies from DB:", error);
    res.status(500).json({ message: "Error fetching movies" });
  }
});

export default router;