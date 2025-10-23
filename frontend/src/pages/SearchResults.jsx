import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';

const SearchResults = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState(null);

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
    return <div className="p-8 text-white">Searching...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Search results for "{q}"</h2>
      {results.length === 0 ? (
        <div className="text-gray-300">No results found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map(r => (
            <Link key={r.tmdbId} to={`/movie/${r.tmdbId}`} className="block bg-slate-800 rounded overflow-hidden">
              <img src={`https://image.tmdb.org/t/p/w500${r.posterPath}`} alt={r.title} className="w-full h-56 object-cover" />
              <div className="p-2">
                <div className="text-white font-medium truncate">{r.title}</div>
                <div className="text-gray-400 text-sm">{r.releaseDate?.substring(0,4)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
