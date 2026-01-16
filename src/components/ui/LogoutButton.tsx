"use client";

import api from "@/lib/axios";
import { useAuthStore } from "@/store/use-auth-store";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Recreating specific styles from SidebarMenuButton (src/components/ui/sidebar.tsx)
// to ensure it matches the sidebar design exactly without depending on Sidebar Context.
// Dependencies: tailwind classes matching "sidebarMenuButtonVariants"
const buttonStyles = 
  "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 cursor-pointer text-sidebar-foreground";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      toast.success("Logged out successfully");
      router.refresh();
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <button onClick={handleLogout} className={`${buttonStyles} ${className || ""}`}>
      <LogOutIcon />
      <span>Logout</span>
    </button>
  );
}
