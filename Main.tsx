import React, { useState, useEffect } from 'react';
import App from './App';
import { LoginPage } from './components/LoginPage';
import { onAuthStateChanged, getUserProfile, createUserProfile, deductCredits } from './services/userService';
import type { User } from './types';

const Main: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        let userProfile = await getUserProfile(firebaseUser.uid);

        if (!userProfile) {
          // If profile doesn't exist, create it with initial credits
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };
          userProfile = await createUserProfile(newUser);
        }
        
        const appUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
        };

        setUser(appUser);
        setCredits(userProfile.credits);
      } else {
        setUser(null);
        setCredits(0);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGenerationComplete = async () => {
    if (user) {
      const success = await deductCredits(user.uid, 1);
      if (success) {
        setCredits((prevCredits) => Math.max(0, prevCredits - 1));
      } else {
        // Handle error case where credits couldn't be deducted
        console.error("Failed to deduct credits.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
      </div>
    );
  }

  return user ? <App user={user} credits={credits} onGenerationComplete={handleGenerationComplete} /> : <LoginPage />;
};

export default Main;