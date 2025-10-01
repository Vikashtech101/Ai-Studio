
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-4 md:p-6 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase">
        <span className="text-cyan-400">Ai</span> Studio
      </h1>
      <p className="text-sm md:text-base text-gray-300 mt-2">The Ultimate AI Product Shoot Studio</p>
    </header>
  );
};

export default Header;
