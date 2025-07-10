import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-800 h-[600px]">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Sustainable shopping background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Shop Smarter, Live Greener
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
            Introducing Green Score - Your guide to sustainable shopping. 
            Make eco-friendly choices with our comprehensive sustainability rating system.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <a
              href="#"
              className="inline-block bg-white text-green-600 py-3 px-8 border border-transparent rounded-md text-base font-medium hover:bg-green-50"
            >
              Learn More
            </a>
            <a
              href="#"
              className="inline-block bg-green-500 text-white py-3 px-8 border border-transparent rounded-md text-base font-medium hover:bg-green-600"
            >
              View Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 