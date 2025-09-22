import React from 'react';
import { useParams } from 'react-router-dom'; 

const MovieDetails = () => {
 
  const { id } = useParams(); 
  


  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)] text-white pt-24">
      <h1 className="text-4xl text-center">
        
        Movie Details for ID: {id}
      </h1>
    </div>
  );
};

export default MovieDetails;