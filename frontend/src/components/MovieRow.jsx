import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/movies');
        // This log is for debugging, to see what the backend is sending.
        console.log("Data received from backend:", response.data); 
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
        <div className="flex space-x-3">
        
       

{Array.isArray(movies) && movies.map(movie => (
  <Link 
    to={`/movie/${movie.tmdbId}`} 
    key={movie.tmdbId}
    className="
      block w-40 aspect-[2/3] /* Sizing and shape are now on the Link */
      bg-slate-800 rounded-md overflow-hidden
      flex-shrink-0 /* Prevents the item from shrinking */
      transition-transform duration-300
      hover:scale-105 hover:shadow-xl
    "
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