import type { Metadata } from "next";
import Navbar from "./Navbar";

import { Asap } from "next/font/google";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const asap = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADMIN | INVOICERY",
  description: "INVOICERY",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  // Fetch the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/en-US"); // Redirect if not authenticated
  }

  // Check if the user is part of admin_users
  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userData.user.id)
    .single(); // Ensure we only fetch a single row

  if (adminError || !adminUser) {
    redirect("/en-US"); // Redirect if not an admin
  }

  return (
    <main className={`${asap.className} bg-[#FAFAFA] min-h-screen`}>
      <Navbar />
      {children}
    </main>
  );
}
