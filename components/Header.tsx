import React from 'react';
import { LogoIcon } from './icons';
import { signOut } from '../services/userService';
import type { User } from '../types';

interface HeaderProps {
    user: User;
    credits: number;
}

export const Header: React.FC<HeaderProps> = ({ user, credits }) => {
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
            <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user.displayName || 'Welcome'}</p>
                <p className="text-xs font-semibold text-red-600">Credits: {credits}</p>
            </div>
            {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="h-10 w-10 rounded-full" />
            ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                    {user.displayName?.charAt(0) || '?'}
                </div>
            )}
            <button
              onClick={signOut}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};