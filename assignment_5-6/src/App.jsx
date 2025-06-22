import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Player from './components/Player';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    // If the song is not in the playlist, add it
    if (!playlist.find(s => s.id === song.id)) {
      setPlaylist([...playlist, song]);
      setCurrentIndex(playlist.length);
    } else {
      setCurrentIndex(playlist.findIndex(s => s.id === song.id));
    }
  };

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentSong(playlist[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentSong(playlist[currentIndex - 1]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <MainContent onSongSelect={handleSongSelect} />
        {currentSong && (
          <Player
            currentSong={currentSong}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </div>
  );
}

export default App;
