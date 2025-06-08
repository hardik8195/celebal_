import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isOpen = useSelector((state) => state.sidebar?.isOpen ?? true);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className={`fixed top-0 right-0 h-16 bg-white border-b z-50 transition-all duration-300 ${isOpen ? 'left-64' : 'left-20'}`}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <FiBell className="w-6 h-6" />
          </button>
          
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2"
            >
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium">John Doe</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FiUser className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FiSettings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 