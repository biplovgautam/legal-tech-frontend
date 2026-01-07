import AppSidebar from "@/components/solo/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthInitializer } from "@/hooks/auth-init";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SoloLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies())?.get("access_token")?.value;

  if (!token) {
    redirect("/signin");
  }

  // const user = await getUser(token);

  // console.log(user)

  // if (!user) {
  //   redirect("/signin");
  // }

  return (
    <>
      <AuthInitializer />
      <SidebarProvider>
        <AppSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </>
  );
}
