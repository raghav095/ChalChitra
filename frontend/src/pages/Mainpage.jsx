import React, { useEffect, useState } from "react";
import Navbarmain from "../components/Navbarmain";
import MovieRow from "../components/MovieRow.jsx";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {login} from "../features/userSlice.js"
import api from '../api/axios';


const Mainpage = () => {

     const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);

    useEffect(() => {

    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          dispatch(login(data.user));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isAuthenticated", "true");
        }
      })
      .catch((err) => {
        
        console.error("Failed to fetch user info:", err);
      });
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    async function loadMovies() {
      try {
        // Request only play-ready movies (YouTube or direct MP4) for faster playback UX
        const res = await api.get('/api/movies?playable=1');
        if (!mounted) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setMovies(list);
      } catch (err) {
        console.error('Failed to load movies', err);
        setMovies([]);
      }
    }
    loadMovies();
    return () => { mounted = false };
  }, []);



  return (
    <>
      <Navbarmain />
      <div className="w-full min-h-screen bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)]">
        <div className="pt-20 sm:pt-24 px-3 sm:px-4"> 
          <div className="text-white ml-2 sm:ml-5 my-4">
            <h2 className="text-xl sm:text-2xl font-bold pb-2">Our Collection</h2>

            {/* Single combined collection as a responsive grid (responsive columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
              {movies.slice(0, 240).map((movie, idx) => {
                const base_url = "https://image.tmdb.org/t/p/w500";
                return (
                  <Link
                    key={movie.tmdbId || movie._id || idx}
                    to={`/movie/${movie.tmdbId}`}
                    className="block w-full rounded-md overflow-hidden bg-slate-800 aspect-[2/3]"
                  >
                        {movie.posterPath ? (
                          // If posterPath is a full URL (starts with http), use it directly.
                          // Otherwise assume it's a TMDB path and prefix with the TMDB image base url.
                          <img
                            loading="lazy"
                            className="w-full h-full object-cover"
                            src={movie.posterPath.startsWith('http') ? movie.posterPath : `${base_url}${movie.posterPath}`}
                            alt={movie.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm text-gray-300">No image</div>
                        )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
