// import supabase from "@/lib/supabaseClient";
import { createClient } from "@/utils/supabase/server";
import SignUpSteps from "./components/SignUpSteps";
import { cookies } from "next/headers";

export default async function SignUpPage({ params }: any) {
  const { locale } = await params;
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch the dashboard data
  const authenticationRes = await fetch(
    `${mediaBaseUrl}/api/authentication/1?locale=${locale}&draft=false&depth=1`
  );

  if (!authenticationRes.ok) {
    console.log("Failed to fetch authentication data.");
  }

  const authenticationData = await authenticationRes.json();

  async function createUser(formData: FormData) {
    "use server";

    const cookieStore = await cookies(); // Call dynamically
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (email && phone) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email as string,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard/${locale}`,
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.log(`Error signing in: ${error.message}`);
      }

      // Set the email to cookies on successful OTP sending
      cookieStore.set("email", email as string, {
        path: "/",
        maxAge: 3600, // 1 hour expiry
        httpOnly: true, // Prevents client-side access
      });
      cookieStore.set("phone", phone as string, {
        path: "/",
        maxAge: 3600, // 1 hour expiry
        httpOnly: true, // Prevents client-side access
      });
    } else {
      console.log("Email or phone is missing.");
    }
  }

  async function verifyUser(formData: FormData) {
    "use server";

    const cookieStore = await cookies(); // Call dynamically
    const email = cookieStore.get("email")?.value;
    const phone = cookieStore.get("phone")?.value;
    const code = formData.get("code");

    if (email && code && phone) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: code as string,
        type: "email",
      });

      if (error) {
        console.log(`Error verifying OTP: ${error.message}`);
      }

      // Insert basic user data into the clients table
      const { user } = data;
      if (user) {
        const { data: clientData, error: insertError } = await supabase
          .from("clients")
          .insert({
            id: user.id, // Matches auth.uid()
            email: email,
            phone: phone,
            created_at: new Date(),
          });

        if (insertError) {
          console.log(`Error creating user: ${insertError.message}`);
        }
      }
    } else {
      console.log("Email or code is missing.");
    }
  }

  return (
    <>
      <div className="relative flex items-center justify-end">
        {/* Popup */}
        <SignUpSteps
          authenticationData={authenticationData}
          locale={locale}
          createUser={createUser}
          verifyUser={verifyUser}
        />
      </div>
    </>
  );
}
