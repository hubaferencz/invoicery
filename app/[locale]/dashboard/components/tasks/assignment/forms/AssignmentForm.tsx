"use client";

import React, { useState, useRef } from "react";
import Sidebar from "../Sidebar";
import Forms from "./Forms";
import Modal from "../Modal";
import Review from "./review/Review";
import Customer from "./customer/Customer";
import AssignmentTime from "./assignment-time/AssignmentTime";
import Compensation from "./compensation/Compensation";
import Description from "./description/Description";
import { motion, AnimatePresence } from "framer-motion";
import ReviewPopup from "./ReviewPopup";

type Props = {
  isModalOpen: boolean;
  toggleModal: any;
  registerAssignment: any; // Dynamic data from parent
  addCustomerForm: any; // Dynamic data from parent
};

export default function AssignmentForm({
  isModalOpen,
  toggleModal,
  registerAssignment,
  addCustomerForm,
}: Props) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [activeItemId, setActiveItemId] = useState(1);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const [isToggled, setIsToggled] = useState(false); // State for the toggle switch
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToForm = (index: number) => {
    const scrollContainer = modalContentRef.current;
    const formRef = containerRefs.current[index];
    if (!scrollContainer || !formRef) return;
    const linePosition = 100;
    const formOffsetTop = formRef.offsetTop;
    const targetScrollTop = formOffsetTop - linePosition;
    scrollContainer.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  const sidebarItems = [
    {
      id: 1,
      label: registerAssignment?.customerSection?.title || "Customer",
      subtitle:
        registerAssignment?.customerSection?.subtitle ||
        "Enter the customer who ordered the assignment",
      iconPath: "/assignment/customer.svg",
      activeIconPath: "/assignment/customer-active.svg",
      altText: "customer",
      component: <Customer addCustomerForm={addCustomerForm} />,
    },
    {
      id: 2,
      label: registerAssignment?.assignmentTime?.title || "Assignment time",
      subtitle:
        registerAssignment?.assignmentTime?.subtitle ||
        "Fill in the start and end dates for the assignment",
      iconPath: "/assignment/calendar.svg",
      activeIconPath: "/assignment/calendar-active.svg",
      altText: "calendar",
      component: (
        <AssignmentTime assignmentTime={registerAssignment?.assignmentTime} />
      ),
    },
    {
      id: 3,
      label: registerAssignment?.compensation?.title || "Compensation",
      subtitle:
        registerAssignment?.compensation?.subtitle ||
        "Enter the amount the customer must pay",
      iconPath: "/assignment/wallet.svg",
      activeIconPath: "/assignment/wallet-active.svg",
      altText: "wallet",
      component: (
        <Compensation compensation={registerAssignment?.compensation} />
      ),
    },
    {
      id: 4,
      label:
        registerAssignment?.description?.title || "Description of assignment",
      subtitle:
        registerAssignment?.description?.subtitle || "Describe the assignment",
      iconPath: "/assignment/pencil.svg",
      activeIconPath: "/assignment/pencil-active.svg",
      altText: "pencil",
      component: (
        <Description description={registerAssignment?.description || {}} />
      ),
    },
  ];

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={registerAssignment?.title}
        onClose={toggleModal}
        contentRef={modalContentRef}
      >
        <div
          ref={sidebarRef}
          className="hidden lg:block relative max-w-[330px] w-full pl-6 h-min mr-6"
        >
          <Sidebar
            title={registerAssignment?.title}
            ctaText={registerAssignment?.review.title}
            items={sidebarItems}
            activeItemId={activeItemId}
            scrollToForm={scrollToForm}
          />
        </div>
        <Forms
          sendButtonText={registerAssignment?.sendButtonText}
          reviewData={registerAssignment?.review || {}}
          setActiveItemId={setActiveItemId}
          modalContentRef={modalContentRef}
          containerRefs={containerRefs}
          items={sidebarItems}
        />
        <div className="absolute lg:hidden bottom-24 w-full p-4 border-t bg-white border-[#EBEBEB]">
          <button
            onClick={() => setShowReviewPopup(true)}
            className="w-full py-[14px] text-base rounded-xl bg-[#04567D] text-white"
          >
            {registerAssignment?.sendButtonText || "Go ahead"}
          </button>
        </div>
      </Modal>

      <AnimatePresence>
        {showReviewPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowReviewPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full lg:max-w-[556px] rounded-t-md lg:rounded-md z-10 p-4 lg:p-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center border-b border-[#EFEFEF] pb-4 mb-4">
                <h2 className="text-base font-medium">
                  {registerAssignment?.review?.title || "Review Assignment"}
                </h2>
              </div>
              <ReviewPopup
                sendButtonText={registerAssignment?.sendButtonText}
                reviewData={registerAssignment?.review || {}} // Pass dynamic review data
                onClose={() => setShowReviewPopup(false)} // Close handler
                isToggled={isToggled} // Initial toggle state
                setIsToggled={setIsToggled} // Stub function or implement state toggle logic
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
