
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      <p className="text-white text-lg mt-4 animate-pulse">AI is Creating Magic...</p>
    </div>
  );
};

export default Loader;
