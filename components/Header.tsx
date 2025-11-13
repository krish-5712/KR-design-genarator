import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Designify AI
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};