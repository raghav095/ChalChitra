import React, { useState } from 'react';
import Register from './Register';
import Chalchitra from '../assets/Chalchitralogo.png'
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

    {/* Logo is only inside the navbar below */}
  <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="drop-shadow-lg">
      <Link to="/">
        <img
          src={Chalchitra}
          alt="ChalChitra Logo"
          className="h-8 sm:h-12 md:h-16 w-auto object-contain block"
        />
      </Link>
    </div>

        
        {!hideRegister && (
          <>
            <button
              onClick={modelpop}
              className="login-gradient-btn px-4 py-1.5 rounded-lg shadow-md font-semibold cursor-pointer text-white transition hidden sm:inline-block"
            >
              Login
            </button>
            <style>{`
              .login-gradient-btn {
                background: linear-gradient(90deg, #1a2233 0%, #283a5b 100%);
                border: 1.5px solid #e7d9b2;
                letter-spacing: 0.06em;
              }
              .login-gradient-btn:hover {
                background: linear-gradient(90deg, #f8f6f2 0%, #e7d9b2 100%);
                color: #232323;
                border-color: #e7d9b2;
              }
            `}</style>                                     
          </>
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
