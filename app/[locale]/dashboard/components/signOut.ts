"use server";

import { createClient } from "@/utils/supabase/server";

export async function signOut() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }

    console.log("Signed out successfully");
  } catch (err: any) {
    console.error(err.message);
  }
}
