"use client";

import { useEffect } from "react";
import api from "./axios";
import { auth } from "./firebase.init";
import { getIdToken } from "firebase/auth";
import { useLoader } from "@/hooks/LoaderContext";

export function useAxiosSecure() {
  const { show, hide } = useLoader();
  useEffect(() => {
    // Add a request interceptor and response interceptor once
    const reqId = api.interceptors.request.use(async (config) => {
      try { show(); } catch {}
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await getIdToken(user, true);
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        } catch {
          // ignore token errors, proceed without auth header
        }
      }
      return config;
    }, (err) => {
      try { hide(); } catch {}
      return Promise.reject(err);
    });

    const resId = api.interceptors.response.use((res) => {
      try { hide(); } catch {}
      return res;
    }, (err) => {
      try { hide(); } catch {}
      return Promise.reject(err);
    });

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [show, hide]);

  return api;
}
