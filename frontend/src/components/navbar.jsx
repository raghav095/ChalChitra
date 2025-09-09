import React, { useState } from 'react';
import Register from './Register';
import newlogo from '../assets/logonew.png'
const Navbar = () => {
  const [model, setModel] = useState(false);

  function modelpop() {
    setModel(true);
  }

  function closeModel() {
    setModel(false);
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-yellow-500 drop-shadow-lg">
         <img src={newlogo} alt="logo" className='h-25 w-auto' />
        </div>

        {/* Links */}
        <ul className="flex space-x-8">
          <li><a href="/" className="text-white font-semibold hover:text-yellow-300 transition">Home</a></li>
          <li><a href="/movies" className="text-white font-semibold hover:text-yellow-300 transition">Movies</a></li>
          <li><a href="/search" className="text-white font-semibold hover:text-yellow-300 transition">Search</a></li>
          <li><a href="/profile" className="text-white font-semibold hover:text-yellow-300 transition">Profile</a></li>
        </ul>

        {/* Register Button */}
        <button
          onClick={modelpop}
          className="bg-gray-900 text-white px-5 py-2 rounded-xl shadow-md hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
        >
          Register
        </button>
      </nav>

      {/* Modal */}
   {model && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white/10 backdrop-blur-xl border border-yellow-400/40 
                    text-white p-8 rounded-3xl shadow-2xl w-96 relative 
                    transform transition-all duration-300 scale-100 hover:scale-105">
      {/* Close button */}
      <button
        onClick={closeModel}
        className="absolute top-3 right-3 text-yellow-300 hover:text-white text-xl"
      >
        ✖
      </button>

      {/* Modal content */}
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300 drop-shadow-md">
        Create Account
      </h2>
      <Register />
    </div>
  </div>
)}



    </>
  );
};

export default Navbar;
