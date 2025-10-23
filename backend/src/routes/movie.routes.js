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

  const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`;


  const [tmdbVideosResponse, tmdbCreditsResponse] = await Promise.all([
    axios.get(videosUrl),
    axios.get(creditsUrl)
  ]);

  const trailer = Array.isArray(tmdbVideosResponse.data?.results)
    ? tmdbVideosResponse.data.results.find(video => video.type === 'Trailer')
    : null;

  const movieObject = movie.toObject();

  movieObject.trailerKey = trailer ? trailer.key : null;

 
  const baseProfile = "https://image.tmdb.org/t/p/w185";
  const creditsCast = Array.isArray(tmdbCreditsResponse.data?.cast) ? tmdbCreditsResponse.data.cast : [];
  movieObject.cast = creditsCast.slice(0, 10).map(c => ({
    id: c.id,
    name: c.name,
    character: c.character,
    
    
    profilePath: c.profile_path ? `${baseProfile}${c.profile_path}` : null
  }));

  
  const creditsCrew = Array.isArray(tmdbCreditsResponse.data?.crew) ? tmdbCreditsResponse.data.crew : [];
  movieObject.crew = {
    directors: creditsCrew.filter(c => c.job === 'Director').map(d => ({ id: d.id, name: d.name })),
    writers: creditsCrew.filter(c => /Writer|Screenplay|Story/i.test(c.job)).map(w => ({ id: w.id, name: w.name, job: w.job }))
  };

  movieObject._creditsCount = {
    cast: creditsCast.length,
    crew: creditsCrew.length
  };

  res.status(200).json(movieObject);
}));
export default router;