import React, { useState, useEffect } from 'react';
import App from './App';
import { LoginPage } from './components/LoginPage';
import { onAuthStateChanged, getUserProfile, createUserProfile, deductCredits, signOut, updateUserProfileOnLogin } from './services/userService';
import type { User } from './types';

const Main: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authProcessError, setAuthProcessError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      setAuthProcessError(null); // Clear previous errors on a new auth state change
      try {
        if (firebaseUser) {
          let userProfile = await getUserProfile(firebaseUser.uid);

          const latestAuthData = {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };

          if (!userProfile) {
            // If profile doesn't exist, create it with initial credits
            const newUser: User = {
              uid: firebaseUser.uid,
              ...latestAuthData,
            };
            userProfile = await createUserProfile(newUser);
          } else {
            // If profile exists, update it with the latest auth data from the provider
            await updateUserProfileOnLogin(firebaseUser.uid, latestAuthData);
            // Merge the latest data into our profile object for immediate use in the UI
            userProfile = { ...userProfile, ...latestAuthData };
          }
          
          const appUser: User = {
              uid: userProfile.uid as string,
              email: userProfile.email as string | null,
              displayName: userProfile.displayName as string | null,
              photoURL: userProfile.photoURL as string | null,
          };

          setUser(appUser);
          setCredits(userProfile.credits as number);
        } else {
          setUser(null);
          setCredits(0);
        }
      } catch (error) {
          console.error("Error during authentication state change:", error);
          setAuthProcessError("Sign-in was successful, but we couldn't access your user profile. This is often due to Firestore security rules. Please check your Firebase project configuration, as outlined in the README file, and try again.");
          // If there's an error (e.g., Firestore permissions), log the user out
          // to prevent an inconsistent state.
          setUser(null);
          setCredits(0);
          await signOut(); // Ensure a clean state
      } finally {
        setIsLoading(false);
      }
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

  return user ? <App user={user} credits={credits} onGenerationComplete={handleGenerationComplete} /> : <LoginPage authProcessError={authProcessError} />;
};

export default Main;