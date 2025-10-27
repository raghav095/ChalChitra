import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import SearchBar from './Searchbar';
import Chalchitra from '../assets/Chalchitralogo.png';

const Navbarmain = () => {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  
    const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  dispatch(logout());
  setShowProfile(false);
  navigate('/', { replace: true });
};

  

  return (
  <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
      
      {
      <div className="drop-shadow-lg">
        <Link to="/Mainpage">
          <img
            src={Chalchitra}
            alt="ChalChitra Logo"
            className="h-10 sm:h-16 md:h-20 w-auto object-contain block"
          />
        </Link>
      </div> }
      
      {/* === Middle: Links & Search === */}
     <div className="flex items-center gap-x-4">
        <Link 
          to="/Mainpage" 
          className="px-3 py-1 text-gray-200 text-sm font-semibold rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/30 hidden sm:inline-block"
        >
          Home
        </Link>
        {/* Explore link removed because Explore page was deleted */}
        <div className="hidden sm:block">
          <SearchBar />
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div className="sm:hidden">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-md text-gray-200 bg-white/5 hover:bg-white/10 focus:outline-none"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* === Right Side: Profile === */}
      {isAuthenticated && (
        <div className="relative inline-block">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-zinc-800 text-lg sm:text-xl font-bold uppercase shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={showProfile}
          >
            {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
          </button>
          {showProfile && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-slate-900 bg-opacity-90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl origin-top-right transition-all duration-300 ease-in-out"
              style={{ transform: 'scale(1)', opacity: 1 }} 
            >
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="font-bold text-white truncate">{user?.name || user?.username}</p>
                <p className="text-sm text-gray-400 truncate">{user?.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile menu panel */}
      {showMobileMenu && (
        <div className="absolute top-full right-0 left-0 bg-slate-900 bg-opacity-95 p-4 sm:hidden z-40">
          <div className="mb-3">
            <SearchBar />
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/Mainpage" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded bg-white/5 text-white text-center">Home</Link>
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="px-3 py-2 rounded bg-red-600 text-white">Logout</button>
            ) : (
              <Link to="/register" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded bg-yellow-400 text-zinc-800 text-center">Login / Join</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbarmain;