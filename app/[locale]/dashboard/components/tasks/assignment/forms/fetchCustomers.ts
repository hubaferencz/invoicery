// fetchCustomers.ts

import { createClient } from "@/utils/supabase/server";


export const fetchCustomers = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not authenticated");
    return [];
  }

  const userId = user.id;

  const { data: customersData, error: customersError } = await supabase
    .from("customers")
    .select("*")
    .eq("created_by", userId);

  if (customersError) {
    console.error("Error fetching customers:", customersError);
    return [];
  } else {
    return customersData || [];
  }
};
