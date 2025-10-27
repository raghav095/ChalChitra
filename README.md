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
# Chalchitra — MERN Movie App

A responsive movie browsing web app built with the MERN stack. The backend stores a curated movie catalog in MongoDB and the frontend uses TMDB for images and trailers. This README gives a short overview and how to run the project locally.

## Quick start

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

## Features

- Browse curated movie collections
- Movie details with cast/crew and trailer playback
- Global search with autocomplete
- Session-based authentication with optional Google OAuth

## Environment variables

Backend (set in `backend/.env` or host environment):

- `MONGODB_URL` — MongoDB connection string
- `SESSION_SECRET` — secret for express-session
- `TMDB_API_KEY` — your TMDB API key
- `FRONTEND_URL` — frontend origin (for CORS/cookie config)

Frontend (Vite):

- `VITE_BACKEND_URL` — e.g. `http://localhost:5000`

## Screenshots

The screenshots are stored in the frontend assets folder and referenced here:

![Landing Page](frontend/src/assets/landingpage.png)

![Movie Details](frontend/src/assets/moviedetails.png)

If the images do not appear, ensure the files exist at `frontend/src/assets/landingpage.png` and `frontend/src/assets/moviedetails.png` and that they are committed to the repository.

## Troubleshooting

- If sessions don't persist, check `trust proxy`, cookie flags and CORS settings.
- If images or trailers are missing, verify `TMDB_API_KEY` and backend connectivity to TMDB.

## License

MIT
- Node.js (v16+ recommended)

- npm or pnpm

- MongoDB (local or cloud)
