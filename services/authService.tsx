// TODO: Create Firebase Auth Functions

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

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
