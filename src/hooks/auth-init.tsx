"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { useEffect } from "react";

export function AuthInitializer() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
}
