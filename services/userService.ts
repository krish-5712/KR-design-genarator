import { auth, db } from '../firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
// Fix: Import UserProfile to use for strong typing of Firestore user documents.
import type { User, UserProfile } from '../types';

const provider = new GoogleAuthProvider();
// Add scopes to ensure we get profile and email info
provider.addScope('profile');
provider.addScope('email');

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    // NOTE: If you receive an 'auth/unauthorized-domain' error, you need to add
    // your application's domain to the list of authorized domains in your
    // Firebase project's Authentication settings. See the README.md for details.
    throw error; // Re-throw to be handled by the UI
  }
};

export const signUpWithEmail = async (displayName: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile with the display name, so it's available for Firestore profile creation
      await updateProfile(userCredential.user, { displayName });
      // The onAuthStateChanged listener in Main.tsx will handle creating the Firestore document.
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      throw error;
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in with email and password:", error);
        throw error;
    }
};


export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const onAuthStateChanged = (callback: (user: FirebaseUser | null) => void) => {
  return onFirebaseAuthStateChanged(auth, callback);
};

// Fix: Add return type and cast the document data to ensure type safety.
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
};

// Fix: Add return type for consistency and type safety.
export const createUserProfile = async (user: User): Promise<UserProfile> => {
    const userDocRef = doc(db, 'users', user.uid);
    const userProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        credits: 10, // Initial credits for new users
        createdAt: serverTimestamp(),
    };
    await setDoc(userDocRef, userProfile);
    return userProfile as UserProfile;
};

export const updateUserProfileOnLogin = async (uid: string, profileData: {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}) => {
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, {
    ...profileData,
    lastLogin: serverTimestamp(),
  });
};

export const deductCredits = async (uid: string, amount: number) => {
    const userDocRef = doc(db, 'users', uid);
    try {
        const userDoc = await getDoc(userDocRef);
        // Fix: Cast user document data to UserProfile to safely access the 'credits' property.
        if (userDoc.exists() && (userDoc.data() as UserProfile).credits >= amount) {
            await updateDoc(userDocRef, {
                credits: increment(-amount)
            });
            return true;
        }
        return false; // Not enough credits or user doesn't exist
    } catch (error) {
        console.error("Error deducting credits:", error);
        return false;
    }
};
