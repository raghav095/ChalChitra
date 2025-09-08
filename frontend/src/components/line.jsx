import React from "react";

const Line = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-full shadow-lg" style={{boxShadow: '0 0 20px 5px #FFD700, 0 0 40px 10px #FF4500'}}></div>
    </div>
  );
};

export default Line;