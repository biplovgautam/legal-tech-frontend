"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import { getDashboardUrl } from "@/lib/nav-utils";

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    // Force init if stuck uninitialized
    if (!initialized && !loading) {
       useAuthStore.getState().init();
    }
    
    if (!initialized || loading) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    const target = getDashboardUrl(user);
    if (target !== "/dashboard") {
        router.replace(target);
    }
  }, [initialized, loading, user, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />

      <p className="text-sm text-muted-foreground animate-pulse">
        Redirecting to dashboard...
      </p>
    </div>
  );
}
