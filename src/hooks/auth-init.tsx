"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AuthInitializer() {
  const init = useAuthStore((s) => s.init);
  const initialized = useAuthStore((s) => s.initialized);
  const pathname = usePathname();

  useEffect(() => {
    // Re-run init if we are on a new path and somehow became uninitialized
    // (e.g. after logout action but before full page reload)
    // Or normally on first mount.
    if (!initialized) {
        init();
    }
  }, [init, initialized, pathname]);

  return null;
}
