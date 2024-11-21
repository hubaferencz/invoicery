"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/welcome/Welcome";
import Tasks from "./components/tasks/Tasks";
import Errands from "./components/errands/Errands";
import How from "./components/how-it-works/How";
import VerifiedHow from "./components/how-it-works/VerifiedHow";
import Tools from "./components/tools/Tools";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { createClient } from "@/utils/supabase/client";

interface DashboardProps {
  sidebar: {
    logo: {
      src: string;
      alt: string;
    };
    homeText: string;
    signOutText: any;
  };
  welcomeSection: {
    firstName?: string;
    firstLine: string;
    secondLine: string;
    image: {
      src: string;
      alt: string;
    };
  };
  tasksSection: {
    isVerified: boolean;
    title: string;
  };
  errandsSection: {
    title: string;
    errandInfoBanner: {
      title: string;
      description: string;
    };
    seeAllText: string;
    assignmentTitle: string;
    invoicesTitle: string;
    salarySpecificationsTitle: string;
    employmentContractTitle: string;
  };
  howItWorksSection: {
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
      image: {
        src: string;
        alt: string;
      };
      ctaText: string;
    }[];
  };
  toolsSection: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      emailToSendTo: string;
      title: string;
      description: string;
      icon: {
        src: string;
        alt: string;
      };
      inputPlaceholder: string;
      ctaText: string;
    }[];
  };
  helpersSection: {
    cancelText: string;
  };
  locale: string;
  verifyYourself: any;
  registerAssignment: any;
  addCustomerForm: any;
  userId: string;
}

export default function Dashboard({
  sidebar,
  welcomeSection,
  tasksSection,
  errandsSection,
  howItWorksSection,
  locale,
  toolsSection,
  helpersSection,
  verifyYourself,
  registerAssignment,
  addCustomerForm,
  userId,
}: DashboardProps) {
  const closeText = helpersSection.cancelText;

  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("pdf_documents")
        .select("*")
        .eq("client_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setDocuments(data || []);
    } catch (err: any) {
      console.error("Error fetching documents:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [userId]);

  return (
    <>
      <Sidebar {...sidebar} />
      <div className="flex flex-col w-full">
        <Welcome
          name={welcomeSection.firstName || ""}
          {...welcomeSection}
          registerAssignment={registerAssignment}
          addCustomerForm={addCustomerForm}
        />
        <div className="flex flex-col items-center justify-center w-full gap-2 xl:flex-row lg:items-start lg:justify-start lg:p-6 lg:gap-6">
          <div className="flex flex-col max-w-[778px] w-full items-start gap-2 lg:gap-6">
            <Tasks
              // setVerified={setVerified}
              locale={locale}
              verifyYourself={verifyYourself}
              registerAssignment={registerAssignment}
              addCustomerForm={addCustomerForm}
              {...tasksSection}
            />
            {/* <Errands verified={tasksSection.isVerified} {...errandsSection} userId={userId} /> */}
            <Errands
              {...errandsSection}
              documents={documents}
              fetchDocuments={fetchDocuments}
              loading={loading}
            />
            <How
              verified={tasksSection.isVerified}
              {...howItWorksSection}
              closeText={closeText}
            />
          </div>
          <div className="flex flex-col items-start w-full gap-6 xl:max-w-min">
            {tasksSection.isVerified && (
              <VerifiedHow
                verified={tasksSection.isVerified}
                {...howItWorksSection}
                closeText={closeText}
              />
            )}
            {documents.length !== 0 && !loading && (
              <Tools {...toolsSection} closeText={closeText} />
            )}
          </div>
        </div>
      </div>
      <Toaster />
      <Script id="freshchat-init" strategy="lazyOnload">
        {`
          function initFreshChat() {
            window.fcWidget.init({
              token: "77890fad-de08-4c19-8896-231e5a444ca3",
              host: "https://frilansfinans-org.freshchat.com",
              widgetUuid: "276d73ed-db71-4ffb-814b-a9ca258ac2c4"
            });
          }

          function initialize(i, t) {
            var e;
            if (i.getElementById(t)) {
              initFreshChat();
            } else {
              e = i.createElement("script");
              e.id = t;
              e.async = true;
              e.src = "https://frilansfinans-org.freshchat.com/js/widget.js";
              e.onload = initFreshChat;
              i.head.appendChild(e);
            }
          }

          function initiateCall() {
            initialize(document, "Freshchat-js-sdk");
          }

          if (window.addEventListener) {
            window.addEventListener("load", initiateCall, false);
          } else if (window.attachEvent) {
            window.attachEvent("onload", initiateCall);
          }
            console.log('Freshchat initialized');

        `}
      </Script>
    </>
  );
}
