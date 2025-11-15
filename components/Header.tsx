import React from 'react';
import { LogoIcon } from './icons';

interface HeaderProps {
  credits: number;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ credits, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              KR Image Generator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full shadow-inner">
                Credits: <span className="font-bold text-red-600">{credits}</span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md px-2 py-1"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};