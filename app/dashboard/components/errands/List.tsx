import React, { useState } from "react";
import Item from "./Item";
import Modal from "./Modal";
import PopupTable from "./PopupTable"; // Adjust the path if necessary

type Assignment = {
  name: string;
};

type ItemData = {
  title: string;
  linkText: string;
  assignments: Assignment[];
};

// Sample data
const data: ItemData[] = [
  {
    title: "Registered assignments",
    linkText: "See all",
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
    title: "Employment agreement",
    linkText: "See all",
    assignments: [{ name: "Erik Eriksson" }, { name: "The company AB" }],
  },
  {
    title: "Invoices",
    linkText: "See all",
    assignments: [
      { name: "Olof Olsson" },
      { name: "The company AB" },
      { name: "Olof Olsson" },
      { name: "The company AB" },
      { name: "Olof Olsson" },
      { name: "The company AB" },
    ],
  },
  {
    title: "Salary specifications",
    linkText: "See all",
    assignments: [{ name: "Olof Olsson" }, { name: "The company AB" }],
  },
];

export default function List() {
  const [modalData, setModalData] = useState<ItemData | null>(null);

  const handleSeeAllClick = (item: ItemData) => {
    setModalData(item);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          linkText={item.linkText}
          count={item.assignments.length} // Pass the dynamic count
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
