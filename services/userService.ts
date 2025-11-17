import { auth, db } from '../firebaseConfig';
// Fix: Use '@firebase/auth' for compatibility.
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from '@firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import type { User } from '../types';

const provider = new GoogleAuthProvider();

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

export const getUserProfile = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists() ? userDoc.data() : null;
};

export const createUserProfile = async (user: User) => {
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
    return userProfile;
};

export const deductCredits = async (uid: string, amount: number) => {
    const userDocRef = doc(db, 'users', uid);
    try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().credits >= amount) {
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