import React, { useState } from "react";
import Item from "./Item";
import Modal from "./Modal";
import PopupTable from "./PopupTable";

interface Assignment {
  name: string;
}

interface ItemData {
  title: string;
  linkText: string;
  assignments: Assignment[];
}

interface ListProps {
  seeAllText: string;
  titles: {
    assignment: string;
    invoices: string;
    salarySpecifications: string;
    employmentContract: string;
  };
}

export default function List({ seeAllText, titles }: ListProps) {
  const [modalData, setModalData] = useState<ItemData | null>(null);

  const handleSeeAllClick = (item: ItemData) => {
    setModalData(item);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const data: ItemData[] = [
    {
      title: titles.assignment,
      linkText: seeAllText,
      assignments: [
        { name: "Sven Svensson" },
        { name: "The company AB" },
        { name: "Sven Svensson" },
        { name: "The company AB" },
        { name: "Sven Svensson" },
        { name: "The company AB" },
      ],
    },
    {
      title: titles.invoices,
      linkText: seeAllText,
      assignments: [
        { name: "Sven Svensson" },
        { name: "The company AB" },
        { name: "Sven Svensson" },
      ],
    },
    {
      title: titles.salarySpecifications,
      linkText: seeAllText,
      assignments: [{ name: "Erik Eriksson" }, { name: "The company AB" }],
    },
    {
      title: titles.employmentContract,
      linkText: seeAllText,
      assignments: [{ name: "Olof Olsson" }, { name: "The company AB" }],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          linkText={item.linkText}
          count={item.assignments.length}
          assignments={item.assignments}
          onSeeAllClick={() => handleSeeAllClick(item)}
        />
      ))}

      {/* Modal displaying all assignments */}
      <Modal
        isOpen={modalData !== null}
        onClose={handleCloseModal}
        title={modalData?.title}
      >
        {modalData && (
          <PopupTable
            title={modalData.title}
            assignments={modalData.assignments}
          />
        )}
      </Modal>
    </div>
  );
}
