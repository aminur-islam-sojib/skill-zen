"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthProvider";

export default function ProtectedRoute({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page if not authenticated
      router.push("/log-in");
    }
  }, [loading, user, router]);

  if (loading || !user) return <>{fallback ?? <div className="p-4 text-center">Loading...</div>}</>;

  return <>{children}</>;
}
