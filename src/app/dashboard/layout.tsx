import { fetchServer } from "@/lib/api-server";
import { redirect } from "next/navigation";
import { DashboardClientInit } from "@/app/dashboard/client-init";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side auth check
  const user = await fetchServer("/users/me");

  if (!user) {
    redirect("/signin");
  }

  // Pass the server-fetched user to a client component 
  // that will hydrate the Zustand store immediately.
  return (
    <>
        <DashboardClientInit user={user} />
        {children}
    </>
  );
}
