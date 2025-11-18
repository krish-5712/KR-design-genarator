import React, { useState, FormEvent } from 'react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../services/userService';
import { LogoIcon, GoogleIcon, ClipboardIcon, CheckIcon, MailIcon, LockClosedIcon, UserIcon } from './icons';
import { projectId } from '../firebaseConfig';

interface AuthError {
  code?: string;
  message: string;
  domain?: string;
}

interface LoginPageProps {
  authProcessError: string | null;
}

const mapAuthCodeToMessage = (code: string): string => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

export const LoginPage: React.FC<LoginPageProps> = ({ authProcessError }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [isDomainCopied, setIsDomainCopied] = useState<boolean>(false);
  const firebaseSettingsUrl = `https://console.firebase.google.com/project/${projectId}/authentication/settings`;

  const resetForm = () => {
    setAuthError(null);
    setIsDomainCopied(false);
    setEmail('');
    setPassword('');
    setDisplayName('');
  }
  
  const handleCopyDomain = (domain: string) => {
    if (!domain) return;
    navigator.clipboard.writeText(domain).then(() => {
      setIsDomainCopied(true);
      setTimeout(() => setIsDomainCopied(false), 2000);
    });
  };
  
  const handleAuthAction = async (action: () => Promise<void>) => {
    setAuthError(null);
    setIsDomainCopied(false);
    setIsLoading(true);
    try {
      await action();
    } catch (e: any) {
      // Ignore errors from the user closing the sign-in popup.
      if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') {
        return;
      }

      if (e.code === 'auth/unauthorized-domain') {
        const hostname = window.location.hostname;
        setAuthError({
            message: "This domain is not authorized for Firebase Authentication.",
            domain: hostname,
        });
      } else {
        setAuthError({ code: e.code, message: mapAuthCodeToMessage(e.code) });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleEmailSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
        setAuthError({ message: "Please enter a display name." });
        return;
    }
    handleAuthAction(() => signUpWithEmail(displayName, email, password));
  };
  
  const handleEmailSignIn = (e: FormEvent) => {
    e.preventDefault();
    handleAuthAction(() => signInWithEmail(email, password));
  };
  
  const handleGoogleSignIn = () => {
    handleAuthAction(signInWithGoogle);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
            <LogoIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">
            {isSignUp ? 'Create Account' : 'Welcome Back!'}
            </h1>
            <p className="text-gray-600">
            {isSignUp ? 'Sign up to start creating images.' : 'Sign in to continue.'}
            </p>
        </div>

        {/* --- Error Display Section --- */}
        {authProcessError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-sm text-red-700">{authProcessError}</p>
          </div>
        )}
        {authError && authError.domain && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-base font-bold text-red-800">Action Required to Fix Sign-In</h3>
                <p className="text-sm text-red-700 mt-1">To use Google Sign-In, you must authorize this app's domain in your Firebase project.</p>
                <div className="mt-3 text-sm">
                    <p className="text-gray-700">1. Go to your <a href={firebaseSettingsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Firebase Console</a>.</p>
                    <p className="text-gray-700 mt-1">2. In Authentication &gt; Settings, add this domain to "Authorized domains":</p>
                    <div className="relative mt-2">
                        <code className="block w-full font-mono p-2 pr-12 bg-red-100 text-red-900 rounded break-all select-all">{authError.domain}</code>
                        <button onClick={() => handleCopyDomain(authError.domain!)} className="absolute inset-y-0 right-0 flex items-center px-3 text-red-700 hover:bg-red-200 rounded-r-lg" aria-label="Copy domain">
                            {isDomainCopied ? <CheckIcon className="h-5 w-5 text-green-600" /> : <ClipboardIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
        )}
        {authError && !authError.domain && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-sm text-red-700">{authError.message}</p>
            </div>
        )}
        {/* --- End Error Display Section --- */}

        {isSignUp ? (
             <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="relative">
                    <UserIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3"/>
                    <input type="text" placeholder="Display Name" value={displayName} onChange={e => setDisplayName(e.target.value)} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"/>
                </div>
                <div className="relative">
                    <MailIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3"/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"/>
                </div>
                <div className="relative">
                    <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3"/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"/>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
             </form>
        ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="relative">
                    <MailIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3"/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"/>
                </div>
                <div className="relative">
                    <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3"/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"/>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        )}

        <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
            <GoogleIcon className="h-6 w-6 mr-3" />
            Sign in with Google
        </button>

        <div className="mt-6 text-center text-sm">
            <button
                onClick={() => { setIsSignUp(!isSignUp); resetForm(); }}
                className="font-medium text-red-600 hover:text-red-500"
            >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
        </div>
        
      </div>
    </div>
  );
};