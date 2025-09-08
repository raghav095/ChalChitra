import React from "react";

const ImageText = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black/70">
      {/* Title */}
      <div className="flex items-center justify-center space-x-8 mb-6">
        {/* Lights */}
        <h1
          className="text-4xl md:text-6xl font-extrabold text-yellow-400 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(250,204,21,0.7)]"
          style={{ transform: "rotateX(35deg)" }}
        >
          Lights
        </h1>

        {/* Camera */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
          Camera
        </h1>

        {/* Action */}
        <h1
          className="text-4xl md:text-6xl font-extrabold text-red-500 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
          style={{ transform: "rotateX(35deg)" }}
        >
          Action
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-lg md:text-2xl text-gray-200 italic drop-shadow-md mb-8">
        Your binge starts here.
      </p>

      {/* CTA Button */}
      <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl shadow-lg hover:bg-yellow-500 transition">
        Start Watching
      </button>
    </div>
  );
};

export default ImageText;
