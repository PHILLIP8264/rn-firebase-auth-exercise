// TODO: Create Firebase Auth Functions

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface UserData {
  uid: string;
  email: string;
  createdAt: Date;
  lastLoginAt: Date;
  displayName?: string;
}

// Save user data to Firestore
export const saveUserToDatabase = async (
  user: User
): Promise<{ success: boolean; error?: string }> => {
  try {
    const userData: UserData = {
      uid: user.uid,
      email: user.email || "",
      createdAt: new Date(),
      lastLoginAt: new Date(),
      displayName: user.displayName || "",
    };

    await setDoc(doc(db, "users", user.uid), userData);
    console.log("User data saved to Firestore");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving user to database:", error.message);
    return { success: false, error: error.message };
  }
};

// Get user data from Firestore
export const getUserFromDatabase = async (
  uid: string
): Promise<{ success: boolean; userData?: UserData; error?: string }> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return { success: true, userData: userDoc.data() as UserData };
    } else {
      return { success: false, error: "User data not found" };
    }
  } catch (error: any) {
    console.error("Error getting user from database:", error.message);
    return { success: false, error: error.message };
  }
};

// Login user function
export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in successfully:", user.email);

    // Update last login time in database
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { lastLoginAt: new Date() },
        { merge: true }
      );
    } catch (dbError) {
      console.warn("Failed to update last login time:", dbError);
      // Don't fail login if database update fails
    }

    return { success: true, user };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return { success: false, error: error.message };
  }
};

// Register user function
export const registerUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User registered successfully:", user.email);

    // Save user data to Firestore database
    const saveResult = await saveUserToDatabase(user);
    if (!saveResult.success) {
      console.warn("Failed to save user to database:", saveResult.error);
      // Don't fail registration if database save fails
    }

    return { success: true, user };
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return { success: false, error: error.message };
  }
};

// Logout user function
export const logoutUser = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
    return { success: true };
  } catch (error: any) {
    console.error("Logout error:", error.message);
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
