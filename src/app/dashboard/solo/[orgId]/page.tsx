"use client";

import Loader from "@/components/ui/loader";
import LogoutButton from "@/components/ui/LogoutButton";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SoloDashboard() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    if (!initialized || loading) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    if (user.org_type === "SOLO") {
      router.replace("/dashboard/solo");
    } else if (user.org_type === "FIRM") {
      router.replace("/dashboard/firm");
    }
  }, [initialized, loading, user, router]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white z-999999">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solo Dashboard</h1>
        <LogoutButton />
      </div>
      <div>SoloDashboard</div>
    </div>
  );
}
