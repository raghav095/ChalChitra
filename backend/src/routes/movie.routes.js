import express from 'express';
import axios from 'axios';
import { Movie } from "../models/movie.model.js";
import { Apierror } from '../utils/Apierrors.js';
import asyncHandler from '../utils/asyncHandler.js'; 

const router = express.Router();

// Simple in-memory TTL cache to reduce TMDB requests.
// Key -> { expires: timestamp(ms), value }
const _cache = new Map();
function getCache(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    _cache.delete(key);
    return null;
  }
  return entry.value;
}
function setCache(key, value, ttlMs) {
  _cache.set(key, { value, expires: Date.now() + ttlMs });
}

router.get('/', asyncHandler(async (req, res) => {
  // Return curated collection: exclude movies that were added by the importer
  // (imported movies have `isImported: true`). This keeps the "Our Curated Collection"
  // row showing the pre-existing curated items while newly imported movies appear
  // only in genre-specific rows (via /by-genre/:id).
  const allMovies = await Movie.find({ isImported: { $ne: true } });
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
  const cacheKey = 'tmdb_genres';
  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const tmdbRes = await axios.get(genresUrl);
  const genres = tmdbRes.data.genres || [];
  // Cache genres for 1 hour
  setCache(cacheKey, genres, 1000 * 60 * 60);
  res.json(genres);
}));

// Return movies that were added by the importer (new arrivals)
router.get('/imported', asyncHandler(async (req, res) => {
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 48));
  // Optionally allow a quality filter: minVote
  const minVote = parseFloat(req.query.minVote) || 0;

  const query = { isImported: true };
  if (minVote > 0) query.voteAverage = { $gte: minVote };

  const movies = await Movie.find(query).sort({ createdAt: -1 }).limit(limit).lean();

  const mapped = (Array.isArray(movies) ? movies : []).map(m => ({
    tmdbId: m.tmdbId,
    title: m.title,
    posterPath: m.posterPath || null,
    backdropPath: m.backdropPath || null,
    releaseDate: m.releaseDate || null,
    voteAverage: m.voteAverage || null
  }));

  res.json(mapped);
}));

// Discover movies by genre id (proxied) - returns TMDB style results mapped to our front-end shape
router.get('/genre/:genreId', asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  const page = Math.max(1, parseInt(req.query.page)) || 1;
  const cacheKey = `discover_${genreId}_p${page}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

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

  // Cache discover results for 10 minutes per genre+page
  setCache(cacheKey, mapped, 1000 * 60 * 10);
  res.json(mapped);
}));

// Get movies from our database filtered by stored TMDB genre id
router.get('/by-genre/:genreId', asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  const page = Math.max(1, parseInt(req.query.page)) || 1;
  const perPage = 40;

  // ensure numeric genre id
  const gid = parseInt(genreId);
  if (Number.isNaN(gid)) {
    return res.json([]);
  }

  // Find movies that have this genre id in their genreIds array
  const movies = await Movie.find({ genreIds: gid })
    .sort({ voteAverage: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  const mapped = (Array.isArray(movies) ? movies : []).map(m => ({
    tmdbId: m.tmdbId,
    title: m.title,
    posterPath: m.posterPath || null,
    backdropPath: m.backdropPath || null,
    releaseDate: m.releaseDate || null,
    voteAverage: m.voteAverage || null
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