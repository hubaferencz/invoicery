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
    signOutText: string;
  };
  welcomeSection: {
    firstLine: string;
    secondLine: string;
    image: {
      src: string;
      alt: string;
    };
  };
  tasksSection: {
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
  locale:string;
  verifyYourself: any
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
  verifyYourself

}: DashboardProps) {
  const [verified, setVerified] = useState(false);
  const closeText = helpersSection.cancelText;
  return (
    <>
      <Sidebar {...sidebar} />
      <div className="flex flex-col w-full">
        <Welcome name="Alex" {...welcomeSection} />
        <div className="flex flex-col items-center justify-center w-full gap-2 xl:flex-row lg:items-start lg:justify-start lg:p-6 lg:gap-6">
          <div className="flex flex-col max-w-[778px] w-full items-start gap-2 lg:gap-6">
            <Tasks
              setVerified={setVerified}
              locale={locale}
              verified={verified}
              verifyYourself={verifyYourself} 
              {...tasksSection}
            />
            <Errands verified={verified} {...errandsSection} />
            <How
              verified={verified}
              {...howItWorksSection}
              closeText={closeText}
            />
          </div>
          <div className="flex flex-col items-start w-full gap-6 xl:max-w-min">
            {verified && (
              <VerifiedHow
                verified={verified}
                {...howItWorksSection}
                closeText={closeText}
              />
            )}
            {verified && <Tools {...toolsSection} closeText={closeText} />}
          </div>
        </div>
      </div>
    </>
  );
}
