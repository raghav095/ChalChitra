import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';

const VideoPlayer = ({ videoUrl, onClose }) => {
  // 1. States for managing video playback
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const playerRef = useRef(null);

  // 2. Determine video type and generate fallback URLs
  const isYouTubeUrl = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  const isArchiveUrl = videoUrl?.includes('archive.org');
  const isValidUrl = videoUrl && (videoUrl.startsWith('http') || videoUrl.startsWith('blob:'));

  // Generate multiple URL options for Archive.org videos
  const getArchiveUrls = (url) => {
    if (!isArchiveUrl || !url.includes('/embed/')) return [url];
    
    const identifier = url.split('/embed/')[1];
    return [
      url, // Original embed URL
      `https://archive.org/details/${identifier}`, // Details page
      `https://ia902707.us.archive.org/17/items/${identifier}/${identifier}.mp4`, // Direct MP4 (common server)
      `https://archive.org/download/${identifier}/${identifier}.mp4`, // Download URL
      `https://archive.org/serve/${identifier}/${identifier}.mp4` // Serve URL
    ];
  };

  const urlOptions = isArchiveUrl ? getArchiveUrls(videoUrl) : [videoUrl];
  const currentUrl = urlOptions[currentUrlIndex];

  useEffect(() => {
    if (!isValidUrl) {
      setError(true);
      setIsLoading(false);
    } else {
      setError(false);
      setIsLoading(true);
      setCurrentUrlIndex(0); // Reset to first URL when videoUrl changes
    }
  }, [videoUrl, isValidUrl]);

  

  // 3. Enhanced error handler with fallback URLs
  const handleError = (e) => {
    console.error("Video player error:", e);
    
    // Try next URL if available
    if (currentUrlIndex < urlOptions.length - 1) {
      console.log(`Trying fallback URL ${currentUrlIndex + 1}...`);
      setCurrentUrlIndex(currentUrlIndex + 1);
      setIsLoading(true);
      setError(false);
    } else {
      console.error("All URL options failed");
      setError(true);
      setIsLoading(false);
    }
  };

  // 4. Handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          setIsPlaying(false);
        } catch (error) {
          // Ignore any errors during cleanup
        }
      }
    };
  }, []);

  // 5. Handle ready state
  const handleReady = () => {
    console.log("ReactPlayer is ready");
    setIsReady(true);
    setIsLoading(false);
    
    // Auto-play YouTube videos, but require manual play for direct video files
    if (isYouTubeUrl && hasUserInteracted) {
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  // 6. Handle play/pause events
  const handlePlay = () => {
    console.log("Video started playing");
    setIsPlaying(true);
  };

  const handlePause = () => {
    console.log("Video paused");
    setIsPlaying(false);
  };

  // 7. Manual play button
  const handleManualPlay = () => {
    setHasUserInteracted(true);
    setIsPlaying(true);
  };

  // 7. Handle close with proper cleanup
  const handleClose = () => {
    // Stop playback before closing to prevent AbortError
    setIsPlaying(false);
    // Small delay to ensure stop is processed before unmounting
    setTimeout(() => {
      onClose();
    }, 50);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl">
        
        <button 
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors z-20"
          aria-label="Close video player"
        >
          <X size={40} />
        </button>

        {/* Show loading, error, or video player */}
        {error ? (
          <div className="w-full h-full flex items-center justify-center text-white text-xl bg-black">
            <div className="text-center">
              <p>Sorry, this video is currently unavailable.</p>
              <p className="text-sm mt-2 text-gray-400">All video sources failed to load.</p>
              {isArchiveUrl && (
                <div className="mt-4">
                  <button 
                    onClick={() => window.open(videoUrl.replace('/embed/', '/details/'), '_blank')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View on Archive.org
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black z-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading video...</p>
                  {currentUrlIndex > 0 && (
                    <p className="text-sm text-gray-400 mt-2">Trying alternative source ({currentUrlIndex + 1}/{urlOptions.length})</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Manual play button overlay - only for ReactPlayer, not iframe */}
            {isReady && !isPlaying && !isArchiveUrl && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 z-10">
                <button 
                  onClick={handleManualPlay}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-yellow-300 transition-colors flex items-center gap-3 shadow-lg"
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {isYouTubeUrl ? 'Play Trailer' : 'Play Movie'}
                </button>
              </div>
            )}
            
            {/* Conditional rendering based on video type and current URL */}
            {isArchiveUrl && currentUrlIndex === 0 ? (
              // Use iframe for original Archive.org embed URL
              <iframe
                src={currentUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Movie Player"
                loading="lazy"
                onLoad={() => {
                  setIsReady(true);
                  setIsLoading(false);
                }}
                onError={() => handleError({ type: 'iframe', message: 'Iframe failed to load' })}
                style={{ 
                  border: 'none',
                  backgroundColor: '#000'
                }}
              />
            ) : (
              // Use ReactPlayer for all other URLs (including Archive.org fallbacks)
              <ReactPlayer
                key={currentUrl} // Force re-render when URL changes
                ref={playerRef}
                url={currentUrl}
                controls={true}
                playing={isPlaying}
                width="100%"
                height="100%"
                onError={handleError}
                onReady={handleReady}
                onPlay={handlePlay}
                onPause={handlePause}
                onBuffer={() => setIsLoading(true)}
                onBufferEnd={() => setIsLoading(false)}
                pip={false}
                stopOnUnmount={true}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 0,
                      controls: 1,
                      rel: 0,
                      showinfo: 0,
                      modestbranding: 1,
                      enablejsapi: 1
                    }
                  },
                  file: {
                    attributes: {
                      playsInline: true,
                      preload: 'metadata',
                      crossOrigin: 'anonymous',
                      controlsList: 'nodownload'
                    },
                    forceVideo: true,
                    forceAudio: false,
                    forceHLS: false,
                    forceDASH: false
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;