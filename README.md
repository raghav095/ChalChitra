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
- TMDB API key (for images and credits)

Environment variables
---------------------

Backend (`backend/.env` or your deployment env):

- `MONGODB_URL` — MongoDB connection string
- `SESSION_SECRET` — secret for express-session
- `TMDB_API_KEY` — your TMDB API key
- `FRONTEND_URL` — frontend origin (for CORS/cookie config)

Frontend (`frontend/.env` or Vite env):

- `VITE_BACKEND_URL` — e.g. `http://localhost:5000` (used by frontend axios client)

Run locally
-----------

Open two terminals (or use a multiplexer). Commands below assume Windows PowerShell (your environment):

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

The frontend uses the `VITE_BACKEND_URL` environment variable to determine the API base URL. If `VITE_BACKEND_URL` is empty in development, the code will use a relative path.

API endpoints (summary)
-----------------------

- `GET /api/movies` — returns all movies from the DB
- `GET /api/movies/:id` — returns a single movie by its `tmdbId` plus `trailerKey`, `cast` (top 10) and `crew` (directors, writers)
- `GET /api/movies/search?q=...` — simple server-side search (case-insensitive) on `title` (used by autocomplete and results page)
- Auth endpoints (if enabled/configured via Passport): `/auth/google`, `/auth/google/callback` and user session endpoints such as `/users/me`

Search / Typeahead behavior
---------------------------

The search bar implements a debounced typeahead (300ms) that calls `GET /api/movies/search?q=` and shows up to 8 suggestions inline. Suggestions show a small poster thumbnail, title and year and support arrow/Enter navigation and click to open the movie details page. A "See all results" link navigates to the full results page at `/search?q=`.

Google OAuth and sessions
-------------------------

- Passport.js is used to support Google OAuth. The strategy file is in `backend/src/auth/googleauth.js`.
- Sessions are persisted using `connect-mongo` so that session cookies remain valid across restarts (make sure `MONGODB_URL` is set).
- Important: when deploying behind a proxy (Render/Heroku/Cloudflare) make sure `app.set('trust proxy', 1)` remains set in `backend/src/index.js` so secure cookies work.

Deploying
---------

Typical steps:

1. Deploy the backend (e.g., Render, Heroku, Railway) and set environment variables listed above.
2. Deploy the frontend (Vercel, Netlify, or static hosting). Ensure `VITE_BACKEND_URL` is set in the frontend deployment to point to the backend API origin.
3. For Google OAuth, set the authorized callback URL(s) in the Google Cloud Console to match your deployed backend callback (e.g., `https://your-backend.example.com/auth/google/callback`).

Notes about cookies & CORS
-------------------------

- The backend sets CORS and uses `withCredentials: true` in the frontend axios client. Make sure the frontend origin is allowed in the backend CORS settings and `FRONTEND_URL` environment variable is configured.

Testing
-------

- Manual: use the UI — search, click posters, play trailer, sign in via Google.
- Unit/E2E: not included by default; recommended tools: Jest for unit tests and Playwright/Cypress for E2E.

Troubleshooting
---------------

- If sessions are not persisting in deployed environments, confirm:
  - `app.set('trust proxy', 1)` is present
  - Cookies are set with correct `sameSite` and `secure` flags depending on your origin
  - FRONTEND_URL and backend CORS config allow credentials
- If images or trailers don't show, verify `TMDB_API_KEY` is valid and your backend can reach api.themoviedb.org

Submission checklist
--------------------

- [ ] Project repository is public and contains both `backend/` and `frontend/` folders
- [ ] `README.md` clearly shows setup instructions and deployment links
- [ ] Deployed app is accessible and the link is included in the README
- [ ] Environment variables are documented (do NOT commit secrets)
- [ ] Basic features work (search, details, trailer, cast)

License
-------

This project is provided for course-work purposes. Add your preferred license if required.

Contact / Support
-----------------

If you need help with any part of the project before submission, open an issue in the repository or ping your instructor/TA.
