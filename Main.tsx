import React, { useState, useEffect } from 'react';
import App from './App';
import { LoginPage } from './components/LoginPage';
import { getCurrentUser, login, logout } from './services/userService';
import type { User } from './services/userService';

const Main: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);

  useEffect(() => {
    // Check for an existing session when the app loads
    const checkSession = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setIsLoadingSession(false);
    };
    checkSession();
  }, []);

  const handleLogin = async (email: string) => {
    const user = await login(email);
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  }

  const handleCreditsUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  if (isLoadingSession) {
    // You can add a proper loading spinner here
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <App user={currentUser} onLogout={handleLogout} onCreditsUpdate={handleCreditsUpdate} />;
};

export default Main;
