// import supabase from "@/lib/supabaseClient";
// import SignUpSteps from "./components/SignUpSteps";

// export default async function SignUpPage({ params }: any) {
//   const { locale } = await params;
//   const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Fetch the dashboard data
//   const authenticationRes = await fetch(
//     `${mediaBaseUrl}/api/authentication/1?locale=${locale}&draft=false&depth=1`,
//     {
//       cache: "force-cache",
//     }
//   );

//   if (!authenticationRes.ok) {
//     throw new Error("Failed to fetch authentication data.");
//   }

//   const authenticationData = await authenticationRes.json();

//   async function createUser(formData: FormData) {
//     "use server";
//     const email = formData.get("email");
//     const phone = formData.get("phone");
//     if (email && phone) {
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: email as string,

//         options: {
//           emailRedirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard/${locale}`,
//           shouldCreateUser: true,
//         },
//       });
//     }
//   }

//   async function verifyUser(formData: FormData) {
//     "use server";
//     const code = formData.get("code");

//     const { data, error } = await supabase.auth.verifyOtp({
//       email: "hello@tappr.co.uk",
//       token: code as string,
//       type: "email",
//     });
//   }

//   return (
//     <>
//       <div className="relative flex items-center justify-end">
//         {/* Popup */}

//         <SignUpSteps
//           authenticationData={authenticationData}
//           locale={locale}
//           createUser={createUser}
//           verifyUser={verifyUser}
//         />
//       </div>
//     </>
//   );
// }

import supabase from "@/lib/supabaseClient";
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
    throw new Error("Failed to fetch authentication data.");
  }

  const authenticationData = await authenticationRes.json();

  async function createUser(formData: FormData) {
    "use server";

    const cookieStore = await cookies(); // Call dynamically
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (email && phone) {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email as string,
        phone: phone as string,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard/${locale}`,
          shouldCreateUser: true,
        },
      });

      if (error) {
        throw new Error(`Error signing in: ${error.message}`);
      }

      // Set the email to cookies on successful OTP sending
      cookieStore.set("email", email as string, {
        path: "/",
        maxAge: 3600, // 1 hour expiry
        httpOnly: true, // Prevents client-side access
      });
    } else {
      throw new Error("Email or phone is missing.");
    }
  }

  async function verifyUser(formData: FormData) {
    "use server";

    const cookieStore = await cookies(); // Call dynamically
    const email = cookieStore.get("email")?.value; // Fetch email from cookies
    const code = formData.get("code");

    if (email && code) {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: code as string,
        type: "email",
      });

      if (error) {
        throw new Error(`Error verifying OTP: ${error.message}`);
      }
    } else {
      throw new Error("Email or code is missing.");
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
