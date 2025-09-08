import React, { useState } from 'react';
import Register from './Register';

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
      <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold tracking-wide">MoviesMania</div>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
          <li><a href="/movies" className="hover:text-yellow-400 transition">Movies</a></li>
          <li><a href="/search" className="hover:text-yellow-400 transition">Search</a></li>
          <li><a href="/profile" className="hover:text-yellow-400 transition">Profile</a></li>
        </ul>
        <button 
          onClick={modelpop} 
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition font-semibold"
        >
          Register
        </button>
      </nav>

      {/* Conditionally render Register modal */}
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-offwhite bg-opacity-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button 
              onClick={closeModel} 
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <Register />
          </div>
        </div>
      )}
      
    </>
  );
};

export default Navbar;
