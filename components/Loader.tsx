import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
        <p className="mt-4 text-lg font-semibold text-gray-800">Generating your masterpiece...</p>
        <p className="text-sm text-gray-600">This might take a moment.</p>
    </div>
  );
};