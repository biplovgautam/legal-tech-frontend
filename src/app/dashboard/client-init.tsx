"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { User } from "@/types/user";

export function DashboardClientInit({ user }: { user: User }) {
  const initialized = useRef(false);

  // Use useEffect to update the store to avoid "Cannot update a component while rendering" error
  useEffect(() => {
    if (!initialized.current || user) {
      useAuthStore.setState({ user, initialized: true, loading: false });
      initialized.current = true;
    }
  }, [user]);

  return null;
}
