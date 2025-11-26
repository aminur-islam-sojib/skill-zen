"use client";

import React from "react";
import { useLoader } from "@/hooks/LoaderContext";
import Loader from "./Loader";

export default function GlobalLoader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Loader />
    </div>
  );
}
