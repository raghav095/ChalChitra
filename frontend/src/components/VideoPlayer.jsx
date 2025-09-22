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
  const playerRef = useRef(null);

  // 2. Determine video type and validate URL
  const isYouTubeUrl = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  const isArchiveUrl = videoUrl?.includes('archive.org');
  const isValidUrl = videoUrl && (videoUrl.startsWith('http') || videoUrl.startsWith('blob:'));

  // Convert Archive.org embed URL to direct video URL
  const getProcessedUrl = (url) => {
    if (isArchiveUrl && url.includes('/embed/')) {
      // Extract identifier from embed URL
      const identifier = url.split('/embed/')[1];
      // Return the direct video URL for better compatibility
      return `https://archive.org/download/${identifier}/${identifier}.mp4`;
    }
    return url;
  };

  const processedVideoUrl = getProcessedUrl(videoUrl);

  useEffect(() => {
    if (!isValidUrl) {
      setError(true);
      setIsLoading(false);
    } else {
      setError(false);
      setIsLoading(true);
    }
  }, [videoUrl, isValidUrl]);

  // 3. Create a function to handle player errors
  const handleError = (e) => {
    console.error("ReactPlayer error:", e);
    setError(true);
    setIsLoading(false);
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
              <p className="text-sm mt-2 text-gray-400">Please check the video source.</p>
              {!isValidUrl && (
                <p className="text-sm mt-2 text-red-400">Invalid video URL format</p>
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
            
            {/* ReactPlayer with Archive.org support */}
            {isArchiveUrl ? (
              // Use iframe for Archive.org embed URLs as fallback
              <iframe
                src={videoUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Movie Player"
                onLoad={() => {
                  setIsReady(true);
                  setIsLoading(false);
                }}
                onError={() => {
                  setError(true);
                  setIsLoading(false);
                }}
                style={{ border: 'none' }}
              />
            ) : (
              // Use ReactPlayer for other video types
              <ReactPlayer
                ref={playerRef}
                url={processedVideoUrl}
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