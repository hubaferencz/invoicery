import React from "react";
import Dashboard from "./Dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage({ params }: any) {
  const { locale } = await params;
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/" + locale);
  }

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("first_name, is_verified")
    .eq("id", data?.user?.id)
    .single();

  // Fetch the dashboard data
  const dashboardRes = await fetch(
    `${mediaBaseUrl}/api/dashboard-layout/1?locale=${locale}&draft=false&depth=1`
  );

  if (!dashboardRes.ok) {
    console.log("Failed to fetch dashboard data.");
  }

  const dashboardData = await dashboardRes.json();

  // Fetch the verifyYourselfForm data
  const verifyYourselfRes = await fetch(
    `${mediaBaseUrl}/api/verifyYourselfForm/1?locale=${locale}&draft=false&depth=1`
  );

  if (!verifyYourselfRes.ok) {
    console.error(
      "Failed to fetch verifyYourselfForm data:",
      verifyYourselfRes.status,
      verifyYourselfRes.statusText
    );
    console.log("Failed to fetch verifyYourselfForm data.");
  }

  const verifyYourselfData = await verifyYourselfRes.json();

  const registerAssignmentRes = await fetch(
    `${mediaBaseUrl}/api/registerAssignmentForm/1?locale=${locale}&draft=false&depth=1`
  );

  if (!registerAssignmentRes.ok) {
    console.log("Failed to fetch registerAssignment data.");
  }

  const registerAssignmentData = await registerAssignmentRes.json();

  const addCustomerFormRes = await fetch(
    `${mediaBaseUrl}/api/add-customer-form/1?locale=${locale}&draft=false&depth=1`
  );

  if (!addCustomerFormRes.ok) {
    console.log("Failed to fetch addCustomerForm data.");
  }

  const addCustomerFormData = await addCustomerFormRes.json();

  const dashboardProps = {
    sidebar: {
      logo: {
        src: `${mediaBaseUrl}${dashboardData.sidebar.logo.url}`,
        alt: dashboardData.sidebar.logo.altText,
      },
      homeText: dashboardData.sidebar.homeText,
      signOutText: dashboardData.sidebar.signOutText,
    },
    welcomeSection: {
      firstName: client?.first_name,
      firstLine: dashboardData.welcomeSection.firstLine,
      secondLine: dashboardData.welcomeSection.secondLine,
      image: {
        src: `${mediaBaseUrl}${dashboardData.welcomeSection.image.url}`,
        alt: dashboardData.welcomeSection.image.altText,
      },
    },
    tasksSection: {
      title: dashboardData.todoSection.title,
      isVerified: client?.is_verified,
    },
    errandsSection: {
      title: dashboardData.errandsSection.title,
      errandInfoBanner: {
        title: dashboardData.errandsSection.errandInfoBanner.infoTitle,
        description:
          dashboardData.errandsSection.errandInfoBanner.infoDescription,
      },
      seeAllText: dashboardData.errandsSection.seeAllText,
      assignmentTitle: dashboardData.errandsSection.assignmentTitle,
      invoicesTitle: dashboardData.errandsSection.invoicesTitle,
      salarySpecificationsTitle:
        dashboardData.errandsSection.salarySpecificationsTitle,
      employmentContractTitle:
        dashboardData.errandsSection.employmentContractTitle,
    },
    howItWorksSection: {
      title: dashboardData.howItWorksSection.title,
      items: dashboardData.howItWorksSection.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: {
          src: `${mediaBaseUrl}${item.image.url}`,
          alt: item.image.altText,
        },
        ctaText: item.ctaText,
      })),
    },
    toolsSection: {
      title: dashboardData.expensesSection.title,
      subtitle: dashboardData.expensesSection.subtitle,
      items: dashboardData.expensesSection.items.map((item: any) => ({
        id: item.id,
        emailToSendTo: item.emailToSendTo,
        title: item.title,
        description: item.description,
        icon: {
          src: `${mediaBaseUrl}${item.icon.url}`,
          alt: item.icon.altText,
        },
        inputPlaceholder: item.inputPlaceholder,
        ctaText: item.ctaText,
      })),
    },
    helpersSection: {
      cancelText: dashboardData.helpersSection.cancelText,
    },
    verifyYourself: verifyYourselfData, // Pass verifyYourself data to the Dashboard component if needed
    registerAssignment: registerAssignmentData, // Pass verifyYourself data to the Dashboard component if needed
    addCustomerForm: addCustomerFormData, // Pass verifyYourself data to the Dashboard component if needed
  };

  const userId = data?.user?.id

  return (
    <main className="flex overflow-x-clip w-full bg-[#F4F4F4]">
      <Dashboard {...dashboardProps} userId={userId} locale={locale} />
    </main>
  );
}
