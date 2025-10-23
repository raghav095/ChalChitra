import React from 'react';

// A simple reusable shimmer skeleton component
const Skeleton = ({ className = 'w-full h-4 rounded', style = {} }) => {
  return (
    <div className={`relative overflow-hidden bg-zinc-800 ${className}`} style={style}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-150%',
          height: '100%',
          width: '150%',
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0) 100%)',
          transform: 'translateX(0)',
          animation: 'shimmer 1.2s infinite'
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
