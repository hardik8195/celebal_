import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Walmart_Spark.svg/1200px-Walmart_Spark.svg.png"
              alt="Walmart Logo"
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-[#0071DC]">Walmart</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2">Green Score</a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2">Sustainable Products</a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2">About</a>
            </div>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sustainable products..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              />
            </div>
            <button className="text-gray-700 hover:text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 