import React from 'react';
import { signInWithGoogle } from '../services/userService';
import { LogoIcon, GoogleIcon } from './icons';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
        <LogoIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to KR Image Generator
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to start creating stunning AI-powered images.
        </p>
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out group"
        >
          <GoogleIcon className="h-6 w-6 mr-3" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};