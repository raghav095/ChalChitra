import React from "react";
import Navbarmain from "../components/Navbarmain";
import MovieRow from "../components/MovieRow.jsx";

const Mainpage = () => {
  return (
    <>
      <Navbarmain />
      <div className="w-full min-h-screen bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)]">
        <div className="pt-24 px-4"> 
          <MovieRow 
            title="Our Curated Collection" 
            fetchUrl="/api/movies" 
          />
          
          {/* You can add more rows like this */}
          {/* <MovieRow title="Classic Cartoons" fetchUrl="/api/movies/cartoons" /> */}
        </div>
      </div>
    </>
  );
};

export default Mainpage;