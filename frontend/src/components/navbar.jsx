import React, { useState } from 'react';
import Register from './Register';
import newlogo from '../assets/Chalchitralogo.png'
import { Link, useLocation } from 'react-router-dom';






const Navbar = () => {
  const location = useLocation();
  const hideRegister = location.pathname === '/Mainpage';
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
        {/* Register Button */}
        {!hideRegister && (
          <button
            onClick={modelpop}
            className="bg-gray-900 text-white px-5 py-2 rounded-xl shadow-md hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
          >
            Register
          </button>
        )}
      </nav>
      {/* Modal: Only show when model is true */}
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <Register onClose={closeModel} />
        </div>
      )}
    </>
  );
    
  
};

export default Navbar;
