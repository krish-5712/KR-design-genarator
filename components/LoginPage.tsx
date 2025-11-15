import React, { useState, useEffect } from 'react';
import { LogoIcon, GoogleIcon, ArrowLeftIcon, UserCircleIcon, UserIcon } from './icons';
import { getPreviouslyLoggedInUsers, login, createUser } from '../services/userService';
import type { User } from '../services/userService';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const PasswordRequirement: React.FC<{met: boolean; text: string}> = ({ met, text }) => (
    <li className={`flex items-center text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            {met ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            )}
        </svg>
        {text}
    </li>
);


export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'main' | 'google' | 'create-password'>('main');
  const [previousUsers, setPreviousUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // State for password creation
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
  });

  useEffect(() => {
    if (view === 'create-password') {
        const length = newPassword.length >= 5 && newPassword.length <= 25;
        const uppercase = /[A-Z]/.test(newPassword);
        const lowercase = /[a-z]/.test(newPassword);
        const number = /[0-9]/.test(newPassword);
        const symbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        setPasswordValidation({ length, uppercase, lowercase, number, symbol });
    }
  }, [newPassword, view]);


  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const user = await login(email, password);
      onLogin(user.email);
    } catch (err: any) {
      if (err.message.includes('User not found')) {
        setView('create-password');
      } else {
        setError(err.message || 'Failed to sign in.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = (email: string) => {
    onLogin(email);
  };
  
  const handleShowGoogleAccounts = async () => {
    setIsLoading(true);
    setView('google');
    try {
      const users = await getPreviouslyLoggedInUsers();
      setPreviousUsers(users);
    } catch (error) {
      console.error("Failed to load previous users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(passwordValidation).some(v => !v)) {
        setError("Please ensure your password meets all requirements.");
        return;
    }
    if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
    setError(null);
    setIsLoading(true);
    try {
        const newUser = await createUser(email, newPassword);
        onLogin(newUser.email);
    } catch (err: any) {
        setError(err.message || 'Failed to create account.');
    } finally {
        setIsLoading(false);
    }
  };
  
  const nameFromEmail = (email: string) => {
    const namePart = email.split('@')[0];
    return namePart.replace(/[._-]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  if (view === 'google') {
    const googleUsers = previousUsers.filter(user => 
      user.email.endsWith('@gmail.com') || user.email.endsWith('@google.com')
    );

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-6 relative">
          <button 
            onClick={() => { setView('main'); setError(null); }}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition-colors" 
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <GoogleIcon className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Choose an account
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              to continue to <span className="font-semibold">KR Image Generator</span>
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spin border-gray-500"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {googleUsers.length > 0 ? (
                googleUsers.map(user => (
                  <button key={user.email} onClick={() => handleGoogleLogin(user.email)} className="w-full flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-800">{nameFromEmail(user.email)}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center text-gray-500 p-4 border rounded-lg bg-gray-50">
                  <p>No previously used Google accounts found.</p>
                  <p className="text-sm mt-1">Please use another account to sign in.</p>
                </div>
              )}

              <button onClick={() => setView('main')} className="w-full flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <UserIcon className="h-10 w-10 text-gray-400 p-1.5 border rounded-full" />
                <div>
                  <p className="font-semibold text-gray-800">Use another account</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'create-password') {
    const allValid = Object.values(passwordValidation).every(v => v) && newPassword === confirmPassword;
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
             <div className="w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <LogoIcon className="h-12 w-12 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900">
                    Create your password
                </h1>
                <p className="text-center text-gray-600 mt-2">
                    An account for <span className="font-semibold">{email}</span> doesn't exist yet.
                </p>

                <div className="bg-white rounded-lg shadow-xl p-8 mt-8">
                    <form onSubmit={handleCreateAccount} className="space-y-4">
                         <div>
                            <label htmlFor="new-password"  className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="new-password"
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password"  className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-2">
                           <p className="text-sm font-medium text-gray-800 mb-2">Your password must include:</p>
                           <ul className="space-y-1">
                                <PasswordRequirement met={passwordValidation.length} text="5-25 characters long" />
                                <PasswordRequirement met={passwordValidation.uppercase} text="Uppercase letters (A-Z)" />
                                <PasswordRequirement met={passwordValidation.lowercase} text="Lowercase letters (a-z)" />
                                <PasswordRequirement met={passwordValidation.number} text="Numbers (0-9)" />
                                <PasswordRequirement met={passwordValidation.symbol} text="Symbols (!, @, #, etc.)" />
                           </ul>
                        </div>
                        
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={!allValid || isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account & Sign In'}
                        </button>

                        <button type="button" onClick={() => { setView('main'); setError(null); }} className="w-full text-center text-sm text-gray-600 hover:text-red-600 pt-2">
                           Go back to sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <LogoIcon className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900">
          Welcome to KR Image Generator
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Sign in to start creating.
        </p>

        <div className="bg-white rounded-lg shadow-xl p-8 mt-8">
          <button
            onClick={handleShowGoogleAccounts}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 ease-in-out disabled:opacity-50"
          >
            <GoogleIcon className="h-5 w-5" />
            Sign in with Google
          </button>
          
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};