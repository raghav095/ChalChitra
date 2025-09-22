import React from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react'; 

const VideoPlayer = ({ videoUrl, onClose }) => {
  return (
   
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl">
        
      
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
          aria-label="Close video player"
        >
          <X size={40} />
        </button>

        
        <ReactPlayer
          url={videoUrl}
          controls={true}
          playing={true}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;