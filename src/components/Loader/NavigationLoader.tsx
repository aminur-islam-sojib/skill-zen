"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "@/hooks/LoaderContext";

export default function NavigationLoader({ delayMs = 0 }: { delayMs?: number }) {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const { show, hide } = useLoader();

  useEffect(() => {
    if (prev.current && prev.current !== pathname) {
      show();
      // hide after a small delay so the loader doesn't flash too briefly
      const timeout = setTimeout(() => hide(), delayMs);
      return () => clearTimeout(timeout);
    }
    prev.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
