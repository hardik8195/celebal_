import React from 'react';
import spotifyLogo from '../assets/spotify_logo.png';
import homeIcon from '../assets/home.png';
import searchIcon from '../assets/search.png';
import stackIcon from '../assets/stack.png';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      {/* Logo */}
      <div className="mb-8">
        <img src={spotifyLogo} alt="Spotify Logo" className="h-10" />
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-purple-400">
              <img src={homeIcon} alt="Home" className="w-6 h-6" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-purple-400">
              <img src={searchIcon} alt="Search" className="w-6 h-6" />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 hover:text-purple-400">
              <img src={stackIcon} alt="Library" className="w-6 h-6" />
              <span>Library</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Playlists */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Playlists</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-gray-400 hover:text-white">Liked Songs</a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">Recently Played</a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">My Playlist #1</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 