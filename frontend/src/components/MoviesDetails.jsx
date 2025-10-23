import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import api from '../api/axios'; // 1. Import your new reusable api client
import { PlayCircle, Film } from 'lucide-react'; 
import VideoPlayer from '../components/VideoPlayer'; // Make sure this path is correct
import Loader from './Loader';

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [playerUrl, setPlayerUrl] = useState(null); 

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        // 2. Use 'api.get' instead of 'axios.get' with the relative path
        const response = await api.get(`/api/movies/${id}`); 
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
      <div className="min-h-screen flex items-start justify-center bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)] text-white pt-24 px-6">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster skeleton */}
            <div className="w-64 md:w-72 rounded-lg overflow-hidden bg-zinc-800 animate-pulse h-96" />

            {/* Details skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-zinc-800 rounded w-3/4 animate-pulse" />
              <div className="flex gap-4 mt-2">
                <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
                <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full" />
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full" />
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-2/3" />
              </div>

              {/* Buttons skeleton */}
              <div className="flex gap-4 mt-6">
                <div className="h-12 w-36 bg-zinc-800 rounded-md animate-pulse" />
                <div className="h-12 w-36 bg-zinc-800 rounded-md animate-pulse" />
              </div>

              {/* Cast skeleton row */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Cast</h3>
                <div className="flex gap-4 overflow-x-auto">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-28 flex-shrink-0">
                      <div className="w-28 h-36 bg-zinc-800 rounded-md animate-pulse" />
                      <div className="h-3 bg-zinc-800 rounded mt-2 animate-pulse" />
                      <div className="h-3 bg-zinc-800 rounded mt-1 animate-pulse w-4/6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
              
              <div className="flex items-center gap-x-4">
                {movie.trailerKey && (
                  <button 
                    onClick={() => setPlayerUrl(`https://www.youtube.com/watch?v=${movie.trailerKey}`)}
                    className="flex items-center gap-x-2 px-6 py-3 bg-gradient-to-b from-yellow-400 to-orange-500 text-zinc-800 font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <PlayCircle />
                    <span>Play Trailer</span>
                  </button>
                )}
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

      {playerUrl && <VideoPlayer videoUrl={playerUrl} onClose={() => setPlayerUrl(null)} />}

        {/* --- Cast section --- */}
{movie.cast && movie.cast.length > 0 ? (
  <section className="mt-12 px-4 md:px-0">
    <h2 className="text-2xl font-semibold text-white mb-4">Cast</h2>
    <div className="flex gap-4 overflow-x-auto py-2 -mx-4 px-4 md:mx-0 md:px-0">
      {movie.cast.map((member) => (
        <article
          key={member.id}
          className="w-28 flex-shrink-0 text-center"
          aria-label={`${member.name} as ${member.character}`}
        >
          <div className="w-28 h-36 bg-zinc-800 rounded-md overflow-hidden mx-auto mb-2">
            {member.profilePath ? (
              <img
                src={member.profilePath}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>
          <div className="text-white text-sm font-medium truncate">{member.name}</div>
          <div className="text-gray-400 text-xs truncate">{member.character}</div>
        </article>
      ))}
    </div>
  </section>
) : (
  <section className="mt-12 px-4 md:px-0">
    <h2 className="text-2xl font-semibold text-white mb-2">Cast</h2>
    <div className="text-gray-400">Cast information not available.</div>
  </section>
)}
    </>
  );
};

export default MovieDetails;