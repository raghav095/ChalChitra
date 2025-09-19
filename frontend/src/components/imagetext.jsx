import React, { useState, useEffect } from "react";
import  Register  from "./Register.jsx";
const words = ["binge.", "laugh.", "thrill.", "adventure.", "escape."];

const ImageText = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [model, setModel] = useState(false);
  
    function modelpop() {
      setModel(true);
    }
  
    function closeModel() {
      setModel(false);
    }
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
  <div className="hero-content-overlay">
      <style>{`
        .hero-content-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 2;
        }
        .timeless-heading {
          font-family: 'Cinzel', 'Poppins', serif;
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 2rem;
          line-height: 1.1;
          white-space: nowrap;
          background: linear-gradient(90deg, #FFD700 0%, #FF6347 50%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3), 0 4px 12px #FF634733;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .hero-heading {
          font-family: 'Poppins', 'Cinzel', serif;
          color: #F5F5DC;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          letter-spacing: 0.06em;
          text-shadow: 0 2px 8px #2222;
        }
        .rotating-word {
          font-family: 'Poppins', 'Cinzel', serif;
          color: #FFB300;
          font-weight: 700;
          font-size: 3rem;
          margin-left: 1rem;
          animation: fadeEffect 3s linear infinite;
          display: inline-block;
          text-shadow: 0 2px 8px #FFB30033;
        }
        @keyframes fadeEffect {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .hero-sub {
          font-family: 'Poppins', 'Cinzel', serif;
          color: #E0C9A6;
          font-size: 1.3rem;
          margin-top: 1.2rem;
          margin-bottom: 2rem;
          letter-spacing: 0.04em;
          text-shadow: 0 2px 8px #2222;
        }
      `}</style>
      <h2 className="timeless-heading">
        Home for Timeless Content.
      </h2>
      <h1 className="hero-heading">
        Find your next
        <span
          className="rotating-word"
          key={words[wordIndex]}
        >
          {words[wordIndex]}
        </span>
      </h1>
      <p className="hero-sub">
        Thousands of stories. One destination. Welcome to ChalChitra.
      </p>

    <button
      onClick={modelpop}
      className="px-8 py-4 text-xl font-semibold tracking-wider text-zinc-800 bg-gradient-to-b from-yellow-400 to-orange-500 border border-orange-600 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      JOIN FOR FREE &gt;
    </button>
     
    </div>

           {/* Modal: Only show when model is true */}
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <Register onClose={closeModel} />
        </div>
      )}
</>
  );

}

export default ImageText;
