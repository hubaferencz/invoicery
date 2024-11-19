"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/welcome/Welcome";
import Tasks from "./components/tasks/Tasks";
import Errands from "./components/errands/Errands";
import How from "./components/how-it-works/How";
import VerifiedHow from "./components/how-it-works/VerifiedHow";
import Tools from "./components/tools/Tools";

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
}: DashboardProps) {
  const closeText = helpersSection.cancelText;
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
            <Errands verified={tasksSection.isVerified} {...errandsSection} />
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
            {tasksSection.isVerified && (
              <Tools {...toolsSection} closeText={closeText} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
