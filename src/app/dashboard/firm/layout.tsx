import AppSidebar from "@/components/solo/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default async function FirmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Parent layout (dashboard/layout.tsx) already handles Auth Check and User Fetching.
  // We don't need to double-fetch here.
  
  return (
    <SidebarProvider>
        <AppSidebar />
        <main>{children}</main>
    </SidebarProvider>
  );
}
