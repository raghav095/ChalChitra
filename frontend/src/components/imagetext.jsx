import React, { useState, useEffect } from "react";

const words = ["binge.", "laugh.", "thrill.", "adventure.", "escape."];

const ImageText = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
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
        .hero-heading {
          color: #fff;
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        .rotating-word {
          color: #FFC300;
          font-weight: bold;
          font-size: 4rem;
          margin-left: 1rem;
          animation: fadeEffect 3s linear infinite;
          display: inline-block;
        }
        @keyframes fadeEffect {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .hero-sub {
          color: #a0a0a0;
          font-size: 1.25rem;
          margin-top: 1.5rem;
          margin-bottom: 2.5rem;
        }
      `}</style>
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
    </div>
  );
};

export default ImageText;
