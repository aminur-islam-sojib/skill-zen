/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase.init";

type AuthResult = {
  user: User | null;
  error: string | null;
};

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<AuthResult>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signup: async () => ({ user: null, error: null }),
  login: async () => ({ user: null, error: null }),
  logout: async () => {},
  googleLogin: async () => ({ user: null, error: null }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup
  const signup = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      console.log('signup called with', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error: any) {
      console.error("Signup error:", error);
      return { user: null, error: error.message || "Signup failed" };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      console.log('login called with', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error: any) {
      console.error("Login error:", error);
      return { user: null, error: error.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  // Google Login
  const googleLogin = async (): Promise<AuthResult> => {
    try {
      console.log('googleLogin called');
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      return { user: result.user, error: null };
    } catch (error: any) {
      console.error("Google login error:", error);
      return { user: null, error: error.message || "Google login failed" };
    }
  };
  

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
