import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import newlogo from '../assets/logonew.png'


const Navbarmain = () => {
  
 

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-yellow-500 drop-shadow-lg">
         <img src={newlogo} alt="logo" className='h-25 w-auto' />
        </div>

        

      </nav>

      
 





    </>
  );
};

export default Navbarmain;
