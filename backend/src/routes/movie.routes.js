import express from 'express';
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

  res.status(200).json(movie);
}));

export default router;