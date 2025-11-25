"use client";

import { useEffect } from "react";
import api from "./axios";
import { auth } from "./firebase.init";
import { onAuthStateChanged, getIdToken } from "firebase/auth";

export function useAxiosSecure() {
  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      api.interceptors.request.use(async (config) => {
        if (user) {
          // Firebase auto-refreshes token internally
          const token = await getIdToken(user, true);
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return api;
}
