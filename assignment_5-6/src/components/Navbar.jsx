import React from 'react';
import bellIcon from '../assets/bell.png';
import searchIcon from '../assets/search.png';

const Navbar = () => {
  return (
    <div className="h-16 bg-gray-900 text-white px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for songs, artists..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="absolute right-3 top-2.5">
            <img src={searchIcon} alt="Search" className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="hover:text-purple-400">
          <img src={bellIcon} alt="Notifications" className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">User Name</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 