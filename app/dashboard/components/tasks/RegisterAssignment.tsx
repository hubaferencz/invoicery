import Image from "next/image";
import React, { useState, useRef } from "react";
import Modal from "./assignment/Modal";
import Sidebar from "./assignment/Sidebar";
import Forms from "./assignment/forms/Forms";
import Customer from "./assignment/forms/customer/Customer";
import AssignmentTime from "./assignment/forms/assignment-time/AssignmentTime";
import Compensation from "./assignment/forms/compensation/Compensation";
import Description from "./assignment/forms/description/Description";
// import Review from "./assignment/forms/review/Review";



const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    label: "Customer",
    subtitle: "Enter the customer who ordered the assignment",
    iconPath: "/assignment/customer.svg",
    activeIconPath: "/assignment/customer-active.svg",
    altText: "customer",
    component: <Customer />,
  },
  {
    id: 2,
    label: "Assignment time",
    subtitle: "Fill in the start and end dates for the assignment",
    iconPath: "/assignment/calendar.svg",
    activeIconPath: "/assignment/calendar-active.svg",
    altText: "calendar",
    component: <AssignmentTime />,
  },
  {
    id: 3,
    label: "Compensation",
    subtitle: "Enter the amount the customer must pay",
    iconPath: "/assignment/wallet.svg",
    activeIconPath: "/assignment/wallet-active.svg",
    altText: "wallet",
    component: <Compensation />,
  },
  {
    id: 4,
    label: "Description of assignment",
    subtitle: "Describe the assignment",
    iconPath: "/assignment/pencil.svg",
    activeIconPath: "/assignment/pencil-active.svg",
    altText: "pencil",
    component: <Description />,
  },
];

// 'Review and create' is not a sidebar item but will be included in the forms

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
          className="hidden lg:block relative max-w-[330px] w-full pl-6 h-min mr-6"
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
          items={sidebarItems}
        />
      </Modal>
    </>
  );
}
