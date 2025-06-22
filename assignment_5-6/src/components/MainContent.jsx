import React from 'react';
import playIcon from '../assets/play.png';
import song1 from '../assets/song1.mp3';
import song2 from '../assets/song2.mp3';
import song3 from '../assets/song3.mp3';

const MainContent = ({ onSongSelect }) => {
  // Array of playlist images
  const playlistImages = [
    '/src/assets/img5.jpg',
    '/src/assets/img4.jpg',
    '/src/assets/img8.jpg',
    '/src/assets/img9.jpg',
  ];

  // Array of songs with their details
  const songs = [
    {
      id: 1,
      title: "Song Title 1",
      artist: "Artist 1",
      image: '/src/assets/img12.jpg',
      audio: song1,
      duration: "3:45"
    },
    {
      id: 2,
      title: "Song Title 2",
      artist: "Artist 2",
      image: '/src/assets/img14.jpg',
      audio: song2,
      duration: "4:20"
    },
    {
      id: 3,
      title: "Song Title 3",
      artist: "Artist 3",
      image: '/src/assets/img7.jpg',
      audio: song3,
      duration: "3:15"
    },
    {
      id: 4,
      title: "Song Title 4",
      artist: "Artist 4",
      image: '/src/assets/img3.jpg',
      audio: song1,
      duration: "3:30"
    },
    {
      id: 5,
      title: "Song Title 5",
      artist: "Artist 5",
      image: '/src/assets/img4.jpg',
      audio: song2,
      duration: "4:00"
    }
  ];

  return (
    <div className="flex-1 bg-gray-900 text-white p-6 overflow-y-auto">
      {/* Featured Playlists */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlistImages.map((img, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="aspect-square rounded-md mb-4 overflow-hidden">
                <img src={img} alt={`Playlist ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold">Playlist {index + 1}</h3>
              <p className="text-gray-400 text-sm">Description of playlist {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="space-y-2">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
              onClick={() => onSongSelect(song)}
            >
              <div className="w-12 h-12 rounded overflow-hidden">
                <img src={song.image} alt={song.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
              <div className="text-gray-400">
                <span>{song.duration}</span>
              </div>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onSongSelect(song);
                }}
              >
                <img src={playIcon} alt="Play" className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent; 