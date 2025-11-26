"use client";

import React from "react";
import { AuthProvider } from "@/hooks/AuthProvider";
import { LoaderProvider } from "@/hooks/LoaderContext";
import GlobalLoader from "@/components/Loader/GlobalLoader";
import NavigationLoader from "@/components/Loader/NavigationLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      <AuthProvider>
        {/* NavigationLoader only triggers loader during client navigation */}
        <NavigationLoader />
        {children}
        <GlobalLoader />
      </AuthProvider>
    </LoaderProvider>
  );
}
