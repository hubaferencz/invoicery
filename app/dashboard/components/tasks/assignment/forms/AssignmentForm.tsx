import React, { useState, useRef } from "react";

import Sidebar from "../Sidebar";
import Forms from "../forms/Forms";
import Modal from "../Modal";


import Customer from "../forms/customer/Customer";
import AssignmentTime from "../forms/assignment-time/AssignmentTime";
import Compensation from "../forms/compensation/Compensation";
import Description from "../forms/description/Description";

type Props = { isModalOpen: boolean; toggleModal: any };

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

export default function AssignmentForm({ isModalOpen, toggleModal }: Props) {
  const [activeItemId, setActiveItemId] = useState(1);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
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
  );
}
