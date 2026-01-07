"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { User } from "@/types/user";

export function DashboardClientInit({ user }: { user: User }) {
  const setUser = useAuthStore((s) => s.setUser);
  const initialized = useRef(false);

  // We use a ref to prevent double-setting if using React Strict Mode, 
  // though generally setting the store is idempotent.
  // We want to set the user in the store as soon as possible
  // so that client-side components (like the DashboardPage redirect logic)
  // see the user immediately without waiting for a client-side fetch.
  if (!initialized.current) {
      useAuthStore.setState({ user, initialized: true, loading: false });
      initialized.current = true;
  }
  
  // Also sync in effect for good measure in case of re-renders
  useEffect(() => {
     useAuthStore.setState({ user, initialized: true, loading: false });
  }, [user]);

  return null;
}
