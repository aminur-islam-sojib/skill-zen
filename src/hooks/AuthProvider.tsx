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
import { useAxiosSecure } from "@/lib/useAxiosSecure";

type AuthResult = {
  user: User | null;
  error: string | null;
};

type TeacherInfo = {
  displayName: string;
  email: string;
  phoneNumber: string;
  experience: number;
  category: string;
  bio: string;
  imageURL: string;
};

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<AuthResult>;
  userRole: "teacher" | "student" | null;
  teacherInfo: TeacherInfo | null;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signup: async () => ({ user: null, error: null }),
  login: async () => ({ user: null, error: null }),
  logout: async () => {},
  googleLogin: async () => ({ user: null, error: null }),
  userRole: null,
  teacherInfo: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"teacher" | "student" | null>(null);
  const [teacherInfo, setTeacherInfo] = useState<any>(null);
  const instanceSecure = useAxiosSecure();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const res = await instanceSecure.get(
            `/user/role?email=${firebaseUser.email}`
          );
          const data = res.data;
          console.log(data);
          if (data.role === "teacher") {
            setUserRole("teacher");
            setTeacherInfo(data.teacher);
          } else {
            setUserRole("student");
            setTeacherInfo(null);
          }
        } catch (err) {
          console.error("Error fetching user role", err);
        }
      } else {
        // On Logout
        setUserRole(null);
        setTeacherInfo(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [instanceSecure]);

  // Signup
  const signup = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      setLoading(true);
      if (process.env.NODE_ENV === "development")
        console.debug("signup called with", email);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: result.user, error: null };
    } catch (error: any) {
      console.error("Signup error:", error);
      return { user: null, error: error.message || "Signup failed" };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      setLoading(true);
      if (process.env.NODE_ENV === "development")
        console.debug("login called with", email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (process.env.NODE_ENV === "development")
        console.debug("signInWithEmailAndPassword result", result);
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
      if (process.env.NODE_ENV === "development")
        console.debug("googleLogin called");
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
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        googleLogin,
        userRole,
        teacherInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
