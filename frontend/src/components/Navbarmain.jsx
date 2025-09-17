import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

import Chalchitra from '../assets/Chalchitralogo.png';

const Navbarmain = () => {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    // Optionally, call your backend /logout API here
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="drop-shadow-lg">
        <Link to="/">
          <img
            src={Chalchitra}
            alt="ChalChitra Logo"
            className="h-[100px] w-[220px] object-contain block"
          />
        </Link>
      </div>

      {/* Authentication / Profile */}
      <div>
        {isAuthenticated ? (
          <div className="relative inline-block">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold shadow hover:bg-yellow-500"
            >
              Profile
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 p-4 text-gray-900">
                <p className="font-bold mb-2">{user?.name || user?.username}</p>
                <p className="text-sm mb-2">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-gray-900 text-white px-5 py-2 rounded-xl shadow-md hover:bg-yellow-400 hover:text-gray-900 transition font-semibold">
            Register / Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbarmain;
