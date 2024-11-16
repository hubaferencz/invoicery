import React from "react";
import Note from "./Note";
import List from "./List";

interface ErrandsProps {
  verified: boolean;
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
}

export default function Errands({
  verified,
  title,
  errandInfoBanner,
  seeAllText,
  assignmentTitle,
  invoicesTitle,
  salarySpecificationsTitle,
  employmentContractTitle,
}: ErrandsProps) {
  return (
    <div className="bg-white max-w-[778px] p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 rounded-sm">
      <h2
        className="leading-normal text-xl font-medium py-0.5"
        style={{ letterSpacing: "0.20px" }}
      >
        {title}
      </h2>
      {!verified ? (
        <Note
          title={errandInfoBanner.title}
          description={errandInfoBanner.description}
        />
      ) : (
        <List
          seeAllText={seeAllText}
          titles={{
            assignment: assignmentTitle,
            invoices: invoicesTitle,
            salarySpecifications: salarySpecificationsTitle,
            employmentContract: employmentContractTitle,
          }}
        />
      )}
    </div>
  );
}
