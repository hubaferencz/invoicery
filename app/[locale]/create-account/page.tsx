import Image from "next/image";
import Link from "next/link";
import SignUpSteps from "./components/SignUpSteps";

export default async function SignUpPage({ params }: any) {
  const { locale } = await params;
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch the dashboard data
  const authenticationRes = await fetch(
    `${mediaBaseUrl}/api/authentication/1?locale=${locale}&draft=false&depth=1`,
    {
      cache: "force-cache",
    }
  );

  if (!authenticationRes.ok) {
    throw new Error("Failed to fetch authentication data.");
  }

  const authenticationData = await authenticationRes.json();
  return (
    <>
      <div className="relative flex items-center justify-end">
        {/* Popup */}

        <SignUpSteps authenticationData={authenticationData} locale={locale} />
      </div>
    </>
  );
}
