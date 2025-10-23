import React from 'react';

const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : ''}`}>
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
        <div className="text-white text-lg font-medium">{message}</div>
      </div>
    </div>
  );
};

export default Loader;
