// import React, { useState } from "react";
// import Item from "./Item";
// import Modal from "./Modal";
// import PopupTable from "./PopupTable";

// interface Assignment {
//   name: string;
// }

// interface ItemData {
//   title: string;
//   linkText: string;
//   assignments: Assignment[];
// }

// interface ListProps {
//   seeAllText: string;
//   titles: {
//     assignment: string;
//     invoices: string;
//     salarySpecifications: string;
//     employmentContract: string;
//   };
// }

// export default function List({ seeAllText, titles }: ListProps) {
//   const [modalData, setModalData] = useState<ItemData | null>(null);

//   const handleSeeAllClick = (item: ItemData) => {
//     setModalData(item);
//   };

//   const handleCloseModal = () => {
//     setModalData(null);
//   };

//   const data: ItemData[] = [
//     {
//       title: titles.assignment,
//       linkText: seeAllText,
//       assignments: [
//         { name: "Sven Svensson" },
//         { name: "The company AB" },
//         { name: "Sven Svensson" },
//         { name: "The company AB" },
//         { name: "Sven Svensson" },
//         { name: "The company AB" },
//       ],
//     },
//     {
//       title: titles.invoices,
//       linkText: seeAllText,
//       assignments: [
//         { name: "Sven Svensson" },
//         { name: "The company AB" },
//         { name: "Sven Svensson" },
//       ],
//     },
//     {
//       title: titles.salarySpecifications,
//       linkText: seeAllText,
//       assignments: [{ name: "Erik Eriksson" }, { name: "The company AB" }],
//     },
//     {
//       title: titles.employmentContract,
//       linkText: seeAllText,
//       assignments: [{ name: "Olof Olsson" }, { name: "The company AB" }],
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {data.map((item, index) => (
//         <Item
//           key={index}
//           title={item.title}
//           linkText={item.linkText}
//           count={item.assignments.length}
//           assignments={item.assignments}
//           onSeeAllClick={() => handleSeeAllClick(item)}
//         />
//       ))}

//       {/* Modal displaying all assignments */}
//       <Modal
//         isOpen={modalData !== null}
//         onClose={handleCloseModal}
//         title={modalData?.title}
//       >
//         {modalData && (
//           <PopupTable
//             title={modalData.title}
//             assignments={modalData.assignments}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Item from "./Item";
import Modal from "./Modal";
import PopupTable from "./PopupTable";

interface ListProps {
  seeAllText: string;
  documents: any[];
  titles: {
    assignment: string;
    invoices: string;
    salarySpecifications: string;
    employmentContract: string;
  };
  onView: (documentId: string) => void;
}

export default function List({
  seeAllText,
  documents,
  titles,
  onView,
}: ListProps) {
  const [modalData, setModalData] = useState<{
    title: string;
    items: any[];
  } | null>(null);

  const handleSeeAllClick = (title: string, items: any[]) => {
    setModalData({ title, items });
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const groupedDocuments = {
    assignment: documents.filter((doc) => doc.type === "assignment_agreement"),
    invoices: documents.filter((doc) => doc.type === "invoice"),
    salarySpecifications: documents.filter(
      (doc) => doc.type === "salary_specification"
    ),
    employmentContract: documents.filter(
      (doc) => doc.type === "employment_contract"
    ),
  };

  // Map grouped documents with titles, filtering out empty categories
  const nonEmptyCategories = Object.entries(groupedDocuments)
    .filter(([, items]) => items.length > 0)
    .map(([key, items]) => {
      const titleMap: Record<string, string> = {
        assignment: titles.assignment,
        invoices: titles.invoices,
        salarySpecifications: titles.salarySpecifications,
        employmentContract: titles.employmentContract,
      };

      return {
        title: titleMap[key as keyof typeof titleMap],
        items,
      };
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {nonEmptyCategories.map(({ title, items }, index) => (
        <Item
          key={index}
          title={title} // Use translated title
          linkText={seeAllText}
          count={items.length}
          assignments={items}
          onSeeAllClick={() => handleSeeAllClick(title, items)}
          onView={onView}
        />
      ))}

      {/* Modal displaying all assignments */}
      {modalData && (
        <Modal
          isOpen={modalData.items.length > 0}
          onClose={handleCloseModal}
          title={modalData.title}
        >
          <PopupTable
            title={modalData.title}
            assignments={modalData.items}
            onView={onView}
          />
        </Modal>
      )}
    </div>
  );
}
