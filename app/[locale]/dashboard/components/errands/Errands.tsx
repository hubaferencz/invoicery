// import React from "react";
// import Note from "./Note";
// import List from "./List";

// interface ErrandsProps {
//   verified: boolean;
//   title: string;
//   errandInfoBanner: {
//     title: string;
//     description: string;
//   };
//   seeAllText: string;
//   assignmentTitle: string;
//   invoicesTitle: string;
//   salarySpecificationsTitle: string;
//   employmentContractTitle: string;
//   userId: string;
// }

// export default function Errands({
//   verified,
//   title,
//   errandInfoBanner,
//   seeAllText,
//   assignmentTitle,
//   invoicesTitle,
//   salarySpecificationsTitle,
//   employmentContractTitle,
//   userId,
// }: ErrandsProps) {
//   return (
//     <div className="bg-white max-w-[778px] p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 rounded-sm">
//       <h2
//         className="leading-normal text-xl font-medium py-0.5"
//         style={{ letterSpacing: "0.20px" }}
//       >
//         {title}
//       </h2>
//       {!verified ? (
//         <Note
//           title={errandInfoBanner.title}
//           description={errandInfoBanner.description}
//         />
//       ) : (
//         <List
//           seeAllText={seeAllText}
//           titles={{
//             assignment: assignmentTitle,
//             invoices: invoicesTitle,
//             salarySpecifications: salarySpecificationsTitle,
//             employmentContract: employmentContractTitle,
//           }}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Note from "./Note";
import List from "./List";
import { createClient } from "@/utils/supabase/client";

interface ErrandsProps {
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
  loading: boolean;
  documents: any;
  fetchDocuments: any;
}

export default function Errands({
  title,
  errandInfoBanner,
  seeAllText,
  assignmentTitle,
  invoicesTitle,
  salarySpecificationsTitle,
  employmentContractTitle,
  loading,
  documents,
  fetchDocuments,
}: ErrandsProps) {
  // const [documents, setDocuments] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // const fetchDocuments = async () => {
  //   setLoading(true);
  //   try {
  //     const { data, error } = await supabase
  //       .from("pdf_documents")
  //       .select("*")
  //       .eq("client_id", userId)
  //       .order("created_at", { ascending: false });

  //     if (error) throw error;

  //     setDocuments(data || []);
  //   } catch (err: any) {
  //     console.error("Error fetching documents:", err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDocuments();
  // }, [userId]);

  return (
    <div className="bg-white max-w-[778px] p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 rounded-sm">
      <h2
        className="leading-normal text-xl font-medium py-0.5"
        style={{ letterSpacing: "0.20px" }}
      >
        {title}
      </h2>
      {loading ? (
        <div className=" h-11 w-full animate-pulse bg-neutral-100 rounded-sm">
          <div className="w-20 bg-white"></div>
        </div>
      ) : documents.length === 0 ? (
        <Note
          title={errandInfoBanner.title}
          description={errandInfoBanner.description}
        />
      ) : (
        <List
          seeAllText={seeAllText}
          documents={documents}
          titles={{
            assignment: assignmentTitle,
            invoices: invoicesTitle,
            salarySpecifications: salarySpecificationsTitle,
            employmentContract: employmentContractTitle,
          }}
          onView={async (documentId: string) => {
            await supabase
              .from("pdf_documents")
              .update({ is_viewed: true })
              .eq("id", documentId);
            fetchDocuments(); // Refresh documents after marking viewed
          }}
        />
      )}
    </div>
  );
}
