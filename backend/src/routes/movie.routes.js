import express from 'express';
import axios from 'axios';
import { Movie } from "../models/movie.model.js";
import { Apierror } from '../utils/Apierrors.js';
import asyncHandler from '../utils/asyncHandler.js'; 

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const allMovies = await Movie.find({}); 
  res.json(allMovies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Apierror(400, "Movie ID is required");
  }

  const movie = await Movie.findOne({ tmdbId: id });

  if (!movie) {
    throw new Apierror(404, "Movie not found in our library");
  }

  const tmdbVideosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`);
  
  const trailer = tmdbVideosResponse.data.results.find(video => video.type === 'Trailer');

  const movieObject = movie.toObject();

  if (trailer) {
    movieObject.trailerKey = trailer.key;
  } else {
    movieObject.trailerKey = null;
  }
  
  res.status(200).json(movieObject);
}));

export default router;