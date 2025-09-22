import React from "react";
import Navbarmain from "../components/Navbarmain";
import MovieRow from "../components/MovieRow.jsx";

const Mainpage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
      <Navbarmain />
      <div className="box w-full h-screen bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)]">
            <div className="pt-24 px-4"> 
        <MovieRow 
          title="Our Curated Collection" 
          fetchUrl={`${BACKEND_URL}/api/movies`} 
        />
        
        {/* You can add more rows for different categories here later */}

      </div>
      </div>
    </>
  );
};

export default Mainpage;
