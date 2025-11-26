"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type LoaderContextValue = {
  loading: boolean;
  show: () => void;
  hide: () => void;
  setLoading: (value: boolean) => void;
};

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);
  const setLoadingState = (value: boolean) => setLoading(value);

  const value = useMemo(
    () => ({ loading, show, hide, setLoading: setLoadingState }),
    [loading]
  );

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used within LoaderProvider");
  return ctx;
}
