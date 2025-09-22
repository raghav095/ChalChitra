import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // 1. Import your new reusable api client

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 2. Use 'api.get' instead of 'axios.get'
        const response = await api.get(fetchUrl); 
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch row content:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const base_url = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="text-white ml-5 my-4">
      <h2 className="text-2xl font-bold pb-2">{title}</h2>
      
      <div className="flex overflow-y-hidden overflow-x-scroll py-5 scrollbar-hide">
        <div className="flex space-x-4">
          {Array.isArray(movies) && movies.map(movie => (
            <Link 
              to={`/movie/${movie.tmdbId}`} 
              key={movie.tmdbId}
              className="block w-40 aspect-[2/3] bg-slate-800 rounded-md overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                className="w-full h-full object-cover" 
                src={`${base_url}${movie.posterPath}`}
                alt={movie.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;