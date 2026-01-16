"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CalendarDaysIcon,
  ChartPieIcon,
  ComponentIcon,
  FileIcon,
  GavelIcon,
  LogOutIcon,
  ScaleIcon,
  UsersIcon,
  WorkflowIcon,
  ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/use-auth-store";
import toast from "react-hot-toast";

import LogoutButton from "@/components/ui/LogoutButton";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  role: string[];
}

const mainItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/solo",
    icon: ChartPieIcon,
    role: ["Super admin", "admin"],
  },
  {
    title: "Cases",
    url: "/dashboard/solo/cases",
    icon: FileIcon,
    role: ["Super admin", "admin"],
  },
  {
    title: "Calendar",
    url: "/dashboard/solo/calendar",
    icon: CalendarDaysIcon,
    role: ["Super admin", "admin"],
  },
  {
    title: "Users",
    url: "/dashboard/solo/users",
    icon: UsersIcon,
    role: ["Super admin", "admin"],
  },
];

const analyticsItem: MenuItem[] = [
  {
    title: "Compilance View",
    url: "/dashboard/solo/compilance-view",
    icon: GavelIcon,
    role: ["Super admin", "admin"],
  },
  {
    title: "Legal Forms",
    url: "/dashboard/solo/legal-forms",
    icon: ScaleIcon,
    role: ["Super admin", "admin"],
  },
];

const managementsItem: MenuItem[] = [
  {
    title: "Team",
    url: "/dashboard/solo/team",
    icon: ComponentIcon,
    role: ["Super admin", "admin"],
  },
  {
    title: "Integrations",
    url: "/dashboard/solo/integrations",
    icon: WorkflowIcon,
    role: ["Super admin", "admin"],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  // const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const canSwitch =
    user?.org_type === "FIRM" &&
    user?.user_roles?.includes("FIRM_ADMIN") &&
    (user?.user_roles?.includes("FIRM_LAWYER") ||
      user?.user_roles?.includes("LAWYER"));

  const handleSwitch = () => {
    if (pathname.includes("/firm/admin")) {
      router.push("/dashboard/firm/lawyer");
      toast.success("Switched to Lawyer View");
    } else {
      router.push("/dashboard/firm/admin");
      toast.success("Switched to Admin View");
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/auth/logout");
  //     logout(); // Clear client state
  //     toast.success("Logged out successfully");
  //     router.refresh(); // Clear Next.js cache
  //     router.push("/signin");
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //     toast.error("Failed to logout");
  //   }
  // };

  const isActive = (item: MenuItem) => {
    if (item.url) {
      return pathname === item.url;
    }
    return pathname.startsWith(item.url);
  };

  return (
    <Sidebar>
      <SidebarHeader>Legal Inspect</SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Managements Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Managements</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementsItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {canSwitch && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSwitch} className="cursor-pointer">
                <ArrowRightLeft />
                <span>Switch View</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
