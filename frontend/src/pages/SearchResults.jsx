import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SearchResults = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function run() {
      if (!q) return setResults([]);
      try {
        const res = await api.get(`/api/movies/search?q=${encodeURIComponent(q)}`);
        if (mounted) setResults(res.data || []);
      } catch (err) {
        console.error('Search error', err);
        if (mounted) setResults([]);
      }
    }
    run();
    return () => { mounted = false; };
  }, [q]);

  if (results === null) {
    return (
      <div className="min-h-screen pt-24 bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)] text-white flex items-start">
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="text-white">Searching...</div>
        </div>
      </div>
    );
  }

  const base_url = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="min-h-screen pt-24 bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)] text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{q ? `Search results for "${q}"` : 'Search'}</h2>

        {!q ? (
          <div className="text-gray-300 bg-slate-800 bg-opacity-40 p-6 rounded">Type a movie title into the search bar to find movies.</div>
        ) : results.length === 0 ? (
          <div className="text-gray-300 bg-slate-800 bg-opacity-40 p-6 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="mb-2">No results found for <span className="font-semibold text-white">"{q}"</span>.</p>
              <p className="text-sm">Try different keywords, remove punctuation, or try a shorter title — e.g. <span className="font-medium text-white">"The Charlie Chaplin Festival"</span>.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Clear query and focus search input in navbar
                  navigate('/search');
                  setTimeout(() => {
                    const input = document.querySelector('input[placeholder="Movies, series, cartoons..."]');
                    if (input) input.focus();
                  }, 80);
                }}
                className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
              >
                Try again
              </button>
              <button
                onClick={() => {
                  // Suggest a sample search
                  navigate(`/search?q=${encodeURIComponent('The Charlie Chaplin Festival')}`);
                }}
                className="px-4 py-2 border border-white/20 rounded-md text-white hover:bg-white/5 transition"
              >
                Search example
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map(r => (
              <Link key={r.tmdbId || r._id} to={`/movie/${r.tmdbId || r._id}`} className="block bg-slate-800 rounded overflow-hidden">
                {r.posterPath ? (
                  <img
                    src={r.posterPath.startsWith('http') ? r.posterPath : `${base_url}${r.posterPath}`}
                    alt={r.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 flex items-center justify-center text-gray-400">No image</div>
                )}
                <div className="p-2">
                  <div className="text-white font-medium truncate">{r.title}</div>
                  <div className="text-gray-400 text-sm">{r.releaseDate?.substring(0,4)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
