// import Image from "next/image";
// import React, { useState } from "react";
// import Modal from "./assignment/Modal";
// import Sidebar from "./assignment/Sidebar";
// import Forms from "./assignment/forms/Forms";

// type SidebarItem = {
//   id?: number;
//   label: string;
//   iconPath: string;
//   altText: string;
// };

// const sidebarItems: SidebarItem[] = [
//   {
//     id: 1,
//     label: "Customer",
//     iconPath: "/assignment/customer.svg",
//     altText: "customer",
//   },
//   {
//     id: 2,
//     label: "Assignment time",
//     iconPath: "/assignment/calendar.svg",
//     altText: "calendar",
//   },
//   {
//     id: 3,
//     label: "Compensation",
//     iconPath: "/assignment/wallet.svg",
//     altText: "wallet",
//   },
//   {
//     id: 4,
//     label: "Description of assignment",
//     iconPath: "/assignment/pencil.svg",
//     altText: "pencil",
//   },
// ];

// type Props = {};

// export default function RegisterAssignment({}: Props) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeItemId, setActiveItemId] = useState(1); // State to track the active item

//   // Toggle modal open/close
//   const toggleModal = () => setIsModalOpen((prev) => !prev);

//   return (
//     <>
//       {/* Button to open the modal */}
//       <div
//         onClick={toggleModal}
//         className="w-full select-none cursor-pointer border border-[#FFEBD5] hover:border-[#FF8800] hover:border-opacity-30 transition-all p-5 h-24 hidden lg:flex rounded-[9px] items-center justify-start bg-[#FFEBD5]"
//       >
//         <div className="flex items-center justify-start gap-4">
//           <div className="w-10 h-10 rounded-full bg-[#FF8800] flex items-center justify-center">
//             <Image
//               src={"/icons/write.svg"}
//               width={20}
//               height={20}
//               alt="check"
//             />
//           </div>
//           <div className="flex flex-col items-start justify-center gap-1">
//             <h2
//               className="text-xl font-medium leading-normal"
//               style={{ letterSpacing: "0.20px" }}
//             >
//               Register assignment
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Modal Component */}
//       <Modal
//         isOpen={isModalOpen}
//         title="Register Assignment"
//         onClose={toggleModal}
//       >
//         <div className="relative max-w-[330px] w-full pt-6 pl-6 h-min mr-6">
//           <Sidebar items={sidebarItems} activeItemId={activeItemId} />
//         </div>
//         <Forms />
//       </Modal>
//     </>
//   );
// }
import Image from "next/image";
import React, { useState, useRef } from "react";
import Modal from "./assignment/Modal";
import Sidebar from "./assignment/Sidebar";
import Forms from "./assignment/forms/Forms";

type SidebarItem = {
  id?: number;
  label: string;
  iconPath: string;
  altText: string;
};

const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    label: "Customer",
    iconPath: "/assignment/customer.svg",
    altText: "customer",
  },
  {
    id: 2,
    label: "Assignment time",
    iconPath: "/assignment/calendar.svg",
    altText: "calendar",
  },
  {
    id: 3,
    label: "Compensation",
    iconPath: "/assignment/wallet.svg",
    altText: "wallet",
  },
  {
    id: 4,
    label: "Description of assignment",
    iconPath: "/assignment/pencil.svg",
    altText: "pencil",
  },
];

export default function RegisterAssignment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState(1);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const scrollToForm = (index: number) => {
    const scrollContainer = modalContentRef.current;
    const formRef = containerRefs.current[index];

    if (!scrollContainer || !formRef) return;

    const linePosition = 100; // The line is at 100px from the top

    const formOffsetTop = formRef.offsetTop;
    const targetScrollTop = formOffsetTop - linePosition;

    scrollContainer.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Button to open the modal */}
      <div
        onClick={toggleModal}
        className="w-full select-none cursor-pointer border border-[#FFEBD5] hover:border-[#FF8800] hover:border-opacity-30 transition-all p-5 h-24 hidden lg:flex rounded-[9px] items-center justify-start bg-[#FFEBD5]"
      >
        <div className="flex items-center justify-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FF8800] flex items-center justify-center">
            <Image
              src={"/icons/write.svg"}
              width={20}
              height={20}
              alt="check"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h2
              className="text-xl font-medium leading-normal"
              style={{ letterSpacing: "0.20px" }}
            >
              Register assignment
            </h2>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        title="Register Assignment"
        onClose={toggleModal}
        contentRef={modalContentRef}
      >
        <div
          ref={sidebarRef}
          className="relative max-w-[330px] w-full pl-6 h-min mr-6"
        >
          <Sidebar
            items={sidebarItems}
            activeItemId={activeItemId}
            scrollToForm={scrollToForm}
          />
        </div>
        <Forms
          setActiveItemId={setActiveItemId}
          modalContentRef={modalContentRef}
          containerRefs={containerRefs}
        />
      </Modal>
    </>
  );
}
