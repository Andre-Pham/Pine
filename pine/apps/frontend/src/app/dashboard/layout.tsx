import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Grab the cookie store
  const cookieStore = cookies();

  // Initialize Supabase client for this server component
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  // Fetch the active session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, redirect to login
  if (!session) {
    redirect("/login");
  }

  // Render the protected dashboard content
  return <>{children}</>;
}
