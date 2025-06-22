import React, { useState, useRef, useEffect } from 'react';
import playIcon from '../assets/play.png';
import pauseIcon from '../assets/pause.png';
import nextIcon from '../assets/next.png';
import prevIcon from '../assets/prev.png';
import shuffleIcon from '../assets/shuffle.png';
import loopIcon from '../assets/loop.png';
import volumeIcon from '../assets/volume.png';

const Player = ({ currentSong, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentSong) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 border-t border-gray-800">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (isLooped) {
            audioRef.current.play();
          } else {
            onNext();
          }
        }}
      />
      
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center space-x-4 w-1/4">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-14 h-14 rounded"
          />
          <div>
            <h3 className="font-medium">{currentSong.title}</h3>
            <p className="text-gray-400 text-sm">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-6 mb-2">
            <button 
              className={`hover:text-purple-400 ${isShuffled ? 'text-purple-400' : ''}`}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <img src={shuffleIcon} alt="Shuffle" className="w-5 h-5" />
            </button>
            <button 
              onClick={onPrevious} 
              className="hover:text-purple-400"
            >
              <img src={prevIcon} alt="Previous" className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 hover:scale-105 transition-transform"
            >
              <img
                src={isPlaying ? pauseIcon : playIcon}
                alt={isPlaying ? "Pause" : "Play"}
                className="w-6 h-6"
              />
            </button>
            <button 
              onClick={onNext} 
              className="hover:text-purple-400"
            >
              <img src={nextIcon} alt="Next" className="w-6 h-6" />
            </button>
            <button 
              className={`hover:text-purple-400 ${isLooped ? 'text-purple-400' : ''}`}
              onClick={() => setIsLooped(!isLooped)}
            >
              <img src={loopIcon} alt="Loop" className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <img src={volumeIcon} alt="Volume" className="w-5 h-5" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Player; 