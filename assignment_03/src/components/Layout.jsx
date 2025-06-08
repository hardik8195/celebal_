import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const isOpen = useSelector((state) => state.sidebar?.isOpen ?? true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 