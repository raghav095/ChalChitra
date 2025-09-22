import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Changed to import from lucide-react

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-full max-w-xs">
      
      {/* The Search Icon from Lucide */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* The Input Field (No changes here) */}
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Movies, series, cartoons...'
        className="
          w-full 
          py-2 pl-10 pr-4 
          bg-slate-800 bg-opacity-70 
          border border-gray-600 
          rounded-full 
          text-white placeholder-gray-400 
          focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 
          transition-all duration-300
        "
      />

    </div>
  );
};

export default SearchBar;