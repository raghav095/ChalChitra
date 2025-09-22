import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import { PlayCircle, Film } from 'lucide-react'; // Added Film icon
import VideoPlayer from '../components/VideoPlayer.jsx'; // Make sure this path is correct

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [playerUrl, setPlayerUrl] = useState(null); // This will control the video player

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        setMovie(response.data); 
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    if (id) {
      fetchMovieDetails();
    }
  }, [id]); 

  const base_url = "https://image.tmdb.org/t/p/original";
  const poster_url = "https://image.tmdb.org/t/p/w500";

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)] text-white">
        <h1 className="text-4xl animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div 
        className="min-h-screen bg-cover bg-center text-white" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(26, 34, 51, 1) 20%, rgba(26, 34, 51, 0.7) 50%, transparent 100%), url(${base_url}${movie.backdropPath})`
        }}
      >
        <div className="min-h-screen flex items-center pt-24 pb-12 px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            <div className="flex-shrink-0">
              <img src={`${poster_url}${movie.posterPath}`} alt={movie.title} className="w-64 md:w-72 rounded-lg shadow-2xl"/>
            </div>

            <div className="flex flex-col max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black mb-2">{movie.title}</h1>
              <div className="flex items-center gap-x-4 text-gray-300 mb-4">
                <span>{movie.releaseDate?.substring(0, 4)}</span>
                <span className="border-l border-gray-500 pl-4">⭐ {movie.voteAverage?.toFixed(1)} / 10</span>
              </div>
              <p className="text-md md:text-lg text-gray-200 mb-6 leading-relaxed">{movie.overview}</p>
              
              {/* --- ACTION BUTTONS --- */}
              <div className="flex items-center gap-x-4">
                {/* Play Trailer Button */}
                {movie.trailerKey && (
                  <button 
                    onClick={() => setPlayerUrl(`https://www.youtube.com/watch?v=${movie.trailerKey}`)}
                    className="flex items-center gap-x-2 px-6 py-3 bg-gradient-to-b from-yellow-400 to-orange-500 text-zinc-800 font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <PlayCircle />
                    <span>Play Trailer</span>
                  </button>
                )}
                {/* Play Movie Button */}
                <button 
                  onClick={() => setPlayerUrl(movie.videoUrl)}
                  className="flex items-center gap-x-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg shadow-md hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <Film />
                  <span>Play Movie</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- This will render the video player when playerUrl is set --- */}
      {playerUrl && <VideoPlayer videoUrl={playerUrl} onClose={() => setPlayerUrl(null)} />}
    </>
  );
};

export default MovieDetails;