import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Chalchitra from '../assets/Chalchitralogo.png'


const Navbarmain = () => {
  
 

  return (
    <>  
   {/* Logo */}
   <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex justify-between items-center">
     <div className="drop-shadow-lg">
       <Link to="/">
         <img
           src={Chalchitra}
           alt="ChalChitra Logo"
           className="h-[100px] w-[220px] object-contain block"
         />
       </Link>
     </div>
   </nav>


  

        

     

      
 





    </>
  );
};

export default Navbarmain;
