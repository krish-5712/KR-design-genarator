import React, { useState } from 'react';
import { signInWithGoogle } from '../services/userService';
import { LogoIcon, GoogleIcon, ClipboardIcon, CheckIcon } from './icons';
import { projectId } from '../firebaseConfig';

interface AuthError {
  message: string;
  domain?: string;
}

interface LoginPageProps {
  authProcessError: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ authProcessError }) => {
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDomainCopied, setIsDomainCopied] = useState<boolean>(false);

  const firebaseSettingsUrl = `https://console.firebase.google.com/project/${projectId}/authentication/settings`;

  const handleCopyDomain = (domain: string) => {
    if (!domain) return;
    navigator.clipboard.writeText(domain).then(() => {
      setIsDomainCopied(true);
      setTimeout(() => setIsDomainCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleSignIn = async () => {
    setAuthError(null);
    setIsDomainCopied(false);
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (e: any) {
      if (e.code === 'auth/unauthorized-domain') {
        const hostname = window.location.hostname;
        if (hostname) {
            setAuthError({
              message: "This domain is not authorized for Firebase Authentication.",
              domain: hostname,
            });
        } else {
            setAuthError({
                message: "Authentication failed. This app cannot be run from a 'file://' URL. Please use a local web server (like Vite's dev server) which serves the app from 'localhost' or '127.0.0.1', and ensure that domain is authorized in your Firebase settings."
            });
        }
      } else {
        setAuthError({ message: `An unexpected error occurred during sign-in: ${e.message || 'Please try again.'}` });
      }
    } finally {
        setIsLoading(false);
    }
  };

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
        
        {authProcessError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-sm text-red-700">{authProcessError}</p>
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out group disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <GoogleIcon className="h-6 w-6 mr-3" />
          )}
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        
        {authError && authError.domain && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-md font-bold text-red-800">Configuration Required</h3>
                <p className="text-sm text-red-700 mt-1">
                To enable Google Sign-In, you need to authorize this application's domain in your Firebase project.
                </p>

                <div className="mt-4 text-sm space-y-3">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-red-200 text-red-800 font-bold rounded-full">1</div>
                    <p className="text-gray-700">
                    Open your project's authentication settings in the <a href={firebaseSettingsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Firebase Console</a>.
                    </p>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-red-200 text-red-800 font-bold rounded-full">2</div>
                    <p className="text-gray-700">
                    Once on that page, find the <br/>
                    <code className="text-xs bg-gray-200 p-1 rounded inline-block mt-1">Authorized domains</code> section.
                    </p>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-red-200 text-red-800 font-bold rounded-full">3</div>
                    <div className="flex-1">
                    <p className="text-gray-700">
                        Click <span className="font-semibold">"Add domain"</span> and enter this value:
                    </p>
                    <div className="relative mt-2">
                        <code className="block w-full font-mono p-2 pr-12 bg-red-100 text-red-900 rounded break-all select-all">
                        {authError.domain}
                        </code>
                        <button
                        onClick={() => handleCopyDomain(authError.domain!)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-red-700 hover:bg-red-200 rounded-r-lg transition-colors"
                        aria-label="Copy domain"
                        >
                        {isDomainCopied ? (
                            <CheckIcon className="h-5 w-5 text-green-600" />
                        ) : (
                            <ClipboardIcon className="h-5 w-5" />
                        )}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {authError.domain === 'localhost' || authError.domain.startsWith('127.0.0.1')
                          ? 'This is your local development domain.'
                          : "Since your app is deployed, you must add its public domain to the list of authorized domains."}
                    </p>
                    </div>
                </div>
                </div>
            </div>
        )}
        {authError && !authError.domain && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-sm text-red-700">{authError.message}</p>
            </div>
        )}
      </div>
    </div>
  );
};