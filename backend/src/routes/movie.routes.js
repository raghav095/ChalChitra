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

// Search endpoint - query param: q
router.get('/search', asyncHandler(async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) {
    return res.json([]);
  }

  // simple case-insensitive substring match on title
  const results = await Movie.find({ title: { $regex: q, $options: 'i' } }).limit(50);
  res.json(results);
}));

// TMDB genres list (proxied)
router.get('/genres', asyncHandler(async (req, res) => {
  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const tmdbRes = await axios.get(genresUrl);
  res.json(tmdbRes.data.genres || []);
}));

// Discover movies by genre id (proxied) - returns TMDB style results mapped to our front-end shape
router.get('/genre/:genreId', asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  const page = Math.max(1, parseInt(req.query.page)) || 1;
  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${encodeURIComponent(genreId)}&sort_by=popularity.desc&page=${page}`;
  const tmdbRes = await axios.get(discoverUrl);
  const results = Array.isArray(tmdbRes.data.results) ? tmdbRes.data.results : [];

  // Map TMDB results into the shape MovieRow expects: tmdbId, title, posterPath
  const mapped = results.map(m => ({
    tmdbId: m.id,
    title: m.title || m.name,
    posterPath: m.poster_path ? m.poster_path : null,
    backdropPath: m.backdrop_path || null,
    releaseDate: m.release_date || m.first_air_date || null,
    voteAverage: m.vote_average || null
  }));

  res.json(mapped);
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