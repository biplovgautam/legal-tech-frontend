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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

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
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span>
                <LogOutIcon />
                <span>Logout</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
