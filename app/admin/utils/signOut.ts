"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }

    console.log("Signed out successfully");
    redirect("/en-US")
  } catch (err: any) {
    console.error(err.message);
  }
}
