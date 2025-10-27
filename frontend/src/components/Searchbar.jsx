import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    // close dropdown on outside click
    function onDoc(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShow(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  
  useEffect(() => {
    // If a q param exists in the URL (e.g. navigating from SearchResults example), prefill the input
    const initialQ = String(searchParams.get('q') || '').trim();
    if (initialQ.length > 0) {
      setQuery(initialQ);
      // Also open suggestions if long enough will be handled by the query effect
    }

    const q = String(query || '').trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await api.get(`/api/movies/search?q=${encodeURIComponent(q)}`);
        setSuggestions((res.data || []).slice(0, 8));
        setShow(true);
        setActiveIndex(-1);
      } catch (err) {
        console.error('Search suggestions error', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const goToResults = (q) => {
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setShow(false);
  };

  const goToMovie = (tmdbId) => {
    navigate(`/movie/${tmdbId}`);
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = String(query || '').trim();
    if (q.length === 0) return;
    goToResults(q);
  };

  const onKeyDown = (e) => {
    if (!show) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        goToMovie(suggestions[activeIndex].tmdbId);
      }
    } else if (e.key === 'Escape') {
      setShow(false);
      setActiveIndex(-1);
    }
  };

  const baseThumb = 'https://image.tmdb.org/t/p/w92';

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          onFocus={() => { if (suggestions.length) setShow(true); }}
          onKeyDown={onKeyDown}
          placeholder='Movies, series, cartoons...'
          className="w-full py-2 pl-10 pr-4 bg-slate-800 bg-opacity-70 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200"
          aria-autocomplete="list"
          aria-expanded={show}
          aria-haspopup="listbox"
        />
      </form>

      {/* Dropdown */}
      {show && (suggestions.length > 0 || loading) && (
        <div className="absolute left-0 right-0 mt-2 z-30 bg-slate-900/95 border border-white/6 rounded-lg shadow-lg backdrop-blur-sm">
          {loading && (
            <div className="p-3 text-gray-300">Searching...</div>
          )}

          {!loading && suggestions.map((s, idx) => (
            <button
              key={s.tmdbId}
              onClick={() => goToMovie(s.tmdbId)}
              className={`w-full text-left flex gap-3 items-center p-2 hover:bg-slate-800/60 transition-colors duration-150 ${idx === activeIndex ? 'bg-slate-800/60' : ''}`}
              role="option"
              aria-selected={idx === activeIndex}
            >
              <div className="w-12 h-16 rounded overflow-hidden bg-zinc-700 flex-shrink-0">
                <img src={s.posterPath ? `${baseThumb}${s.posterPath}` : ''} alt={s.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = ''; }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{s.title}</div>
                <div className="text-gray-400 text-sm truncate">{s.releaseDate?.substring(0,4) || ''}</div>
              </div>
            </button>
          ))}

          {!loading && suggestions.length === 0 && (
            <div className="p-3 text-gray-400">No matches</div>
          )}

          {!loading && (
            <div className="border-t border-white/6 p-2 text-sm text-gray-300 flex justify-between items-center">
              <button onClick={() => goToResults(query)} className="text-yellow-400 font-medium">See all results</button>
              <div className="text-gray-400">{suggestions.length} results</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;