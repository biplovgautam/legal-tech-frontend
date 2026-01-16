import { fetchServer } from "@/lib/api-server";
import { redirect } from "next/navigation";
import { DashboardClientInit } from "@/app/dashboard/client-init";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user;
  
  try {
    // Server-side auth check
    user = await fetchServer("/users/me");
  } catch (error: any) {
    // Basic detection of Next.js internal dynamic usage error
    if (error.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }

    // If backend is down, we don't want to redirect to /signin (which causes loops)
    // Instead we throw to let Next.js Error Boundary handle it.
    console.error("DashboardLayout Auth Error:", error);
    throw error; 
  }

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
