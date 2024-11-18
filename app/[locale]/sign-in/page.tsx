// import supabase from "@/lib/";

import { cookies } from "next/headers";
import SignInSteps from "./components/SignInSteps";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function SignInPage({ params }: any) {
  const { locale } = (await params) || "en"; // Default locale
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch the dashboard data
  const authenticationRes = await fetch(
    `${mediaBaseUrl}/api/authentication/1?locale=${locale}&draft=false&depth=1`
  );

  if (!authenticationRes.ok) {
    console.log("Failed to fetch authentication data");
  }

  const authenticationData = await authenticationRes.json();

  async function signInUser(formData: FormData) {
    "use server";

    try {
      const email = formData.get("email");
      if (!email) {
        console.log("Email is missing");
      }
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email as string,
      });
      console.log(error);

      const cookieStore = await cookies();
      cookieStore.set("email", email as string, {
        path: "/",
        maxAge: 3600, // 1 hour expiry
        httpOnly: true,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function verifyUser(formData: FormData) {
    "use server";

    try {
      const cookieStore = await cookies();
      const email = cookieStore.get("email")?.value;
      const code = formData.get("code");

      if (email || code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({
          email: email as string,
          token: code as string,
          type: "email",
        });

        if (error) {
          console.log(error.message);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    redirect(`/${locale}/dashboard`);
  }

  return (
    <>
      <div className="relative flex items-center justify-end">
        {/* Popup */}
        <SignInSteps
          authenticationData={authenticationData}
          locale={locale}
          signInUser={signInUser}
          verifyUser={verifyUser}
        />
      </div>
    </>
  );
}
