# Chalchitra — MERN Movie App

This repository contains the Chalchitra app: a MERN-stack movie browsing and streaming UI that uses a MongoDB-backed library, TMDB for supplemental metadata (backdrops, posters, credits), and Passport for optional Google OAuth sign-in. The project includes a backend API and a React frontend and was built as a course project.

Contents
--------

- Overview
- Features
- Architecture
- Prerequisites
- Environment variables
- Run locally (backend & frontend)
- API endpoints (summary)
- Search / Typeahead behavior
- Google OAuth notes
- Deploying
- Testing
- Troubleshooting
- Submission checklist
- License

Overview
--------

Chalchitra is a movie browsing web app. The backend stores a curated list of items (movies) in MongoDB and the frontend provides a responsive React interface with search, movie rows, movie details (including cast/crew and trailer playback), and user authentication (manual + Google OAuth). The app also consumes TMDB for high-quality images, video keys and credits.

Features
--------

- Browse collections (rows) of movies
- Click a poster to open a full Movie Details page with:
  - Overview, rating and release year
  - Trailer playback (YouTube key from TMDB)
  - Cast and crew (top cast + directors/writers) with profile images
- Global search with Netflix-style autocomplete (typeahead) and a full search results page
- Session-based authentication with optional Google OAuth sign-in
- Responsive UI with a themed dark layout, shimmer skeletons, and lazy-loaded images

Architecture
------------

- Backend: Node.js + Express, Mongoose (MongoDB), Axios for external TMDB API calls, Passport for Google OAuth, and express-session (connect-mongo) for persistent sessions.
- Frontend: React (Vite), Tailwind-like utility classes (already inlined), react-router for routes, axios wrapper for API calls.

Prerequisites
-------------

- Node.js (v16+ recommended)
- npm or pnpm
- MongoDB instance (local or cloud)
# Chalchitra — MERN Movie App

A responsive movie browsing web app built using the MERN stack. The app stores a curated movie catalog in MongoDB and uses TMDB for high-quality images, trailers (YouTube keys) and credits. The frontend is a React app (Vite) and the backend is an Express API with optional Google OAuth for user sign-in.

Demo: (add deployed link here)

Contents
--------

- Overview
- Features
- Tech stack
- Prerequisites
- Environment variables
- Run locally (backend & frontend)
- API endpoints (summary)
- Search / Typeahead behavior
- Google OAuth notes
- Deploying
- Troubleshooting
- License

Overview
--------

Chalchitra is a movie browsing web app. The backend stores a curated list of items (movies) in MongoDB and the frontend provides a responsive React interface with search, movie rows, movie details (including cast/crew and trailer playback), and user authentication (manual and Google OAuth). The app consumes TMDB for images, video keys and credits.

Features
--------

- Browse curated collections (rows) of movies
- Movie Details page with overview, rating, release year, trailer playback, cast and crew
- Global search with Netflix-style autocomplete (typeahead) and a full search results page
- Session-based authentication with optional Google OAuth sign-in
- Responsive dark theme UI with shimmer skeletons and lazy-loaded images

Tech stack
----------

- Backend: Node.js, Express, Mongoose (MongoDB), Passport (Google OAuth), express-session, Axios
- Frontend: React (Vite), react-router, Axios, Tailwind-like utility classes

Prerequisites
-------------

- Node.js (v16+ recommended)
- npm or pnpm
- MongoDB (local or cloud)
- TMDB API key (for images and credits)

Environment variables
---------------------

Backend (set in `backend/.env` or host environment):

- `MONGODB_URL` — MongoDB connection string
- `SESSION_SECRET` — secret for express-session
- `TMDB_API_KEY` — your TMDB API key
- `FRONTEND_URL` — frontend origin (for CORS/cookie config)

Frontend (Vite environment):

- `VITE_BACKEND_URL` — e.g. `http://localhost:5000` (used by frontend axios client)

Run locally
-----------

Open two terminals (Windows PowerShell recommended):

Backend
```powershell
cd backend
npm install
npm run dev
```

Frontend
```powershell
cd frontend
npm install
npm run dev
```

API endpoints (summary)
-----------------------

- `GET /api/movies` — returns all movies from the DB
- `GET /api/movies/:id` — returns a single movie by its `tmdbId` plus `trailerKey`, `cast` (top 10) and `crew` (directors, writers)
- `GET /api/movies/search?q=...` — server-side search (case-insensitive) on `title` (used by autocomplete and results page)
- Auth endpoints (if configured): `/auth/google`, `/auth/google/callback`, and session endpoints such as `/users/me`

Search / Typeahead behavior
---------------------------

The search bar implements a debounced typeahead (300ms) that calls `GET /api/movies/search?q=` and shows up to 8 suggestions inline. Suggestions show a small poster thumbnail, title and year and support arrow/Enter navigation and click to open the movie details page. "See all results" navigates to `/search?q=`.

Google OAuth and sessions
-------------------------

- Passport.js is used for Google OAuth (see `backend/src/auth/googleauth.js`).
- Sessions are persisted using `connect-mongo` so cookies remain valid across restarts. When deploying behind a proxy, keep `app.set('trust proxy', 1)` in `backend/src/index.js` to ensure secure cookies work correctly.

Deploying
---------

1. Deploy the backend to a host (Render, Railway, Heroku, etc.) and configure environment variables.
2. Deploy the frontend (Vercel, Netlify, or static hosting) and set `VITE_BACKEND_URL` to your backend origin.
3. For Google OAuth, set the authorized callback URL(s) in Google Cloud to match your deployed backend callback.

Troubleshooting
---------------

- Sessions not persisting: verify `trust proxy`, cookie flags, and CORS/FRONTEND_URL settings.
- Images / trailers missing: verify `TMDB_API_KEY` and that your backend can reach api.themoviedb.org.

License
-------

This project is provided for coursework purposes. Add a LICENSE file if you need to specify one.




