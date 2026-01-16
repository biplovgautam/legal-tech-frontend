"use client";

import Loader from "@/components/ui/loader";
import LogoutButton from "@/components/ui/LogoutButton";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SoloAssistantDashboard() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    if (!initialized || loading) return;

    if (!user) {
      router.replace("/signin");
    }
  }, [user, loading, initialized, router]);

  if (loading || !initialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solo Assistant Dashboard</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
