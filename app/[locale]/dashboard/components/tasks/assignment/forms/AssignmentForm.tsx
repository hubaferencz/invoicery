"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar";
import Forms from "./Forms";
import Modal from "../Modal";
import Customer from "./customer/Customer";
import AssignmentTime from "./assignment-time/AssignmentTime";
import Compensation from "./compensation/Compensation";
import Description from "./description/Description";
import { motion, AnimatePresence } from "framer-motion";
import ReviewPopup from "./ReviewPopup";
import { useRouter } from "next/navigation";
import { sendAssignment } from "../../sendAssignment";
import Image from "next/image";
import AddCustomerPopup from "./customer/AddCustomerPopup";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

type Props = {
  isModalOpen: boolean;
  toggleModal: any;
  registerAssignment: any;
  addCustomerForm: any;
};

export default function AssignmentForm({
  isModalOpen,
  toggleModal,
  registerAssignment,
  addCustomerForm,
}: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup
  const [activeItemId, setActiveItemId] = useState(1);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const [isToggled, setIsToggled] = useState(false);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);

  const [customerToEdit, setCustomerToEdit] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  // AssignmentForm.tsx
  const [isCustomerValid, setIsCustomerValid] = useState(false);
  const [isAssignmentTimeValid, setIsAssignmentTimeValid] = useState(false);
  const [isCompensationValid, setIsCompensationValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  const [clientEmail, setClientEmail] = useState(null);
  const [clientPhone, setClientPhone] = useState(null);
  const [clientProfession, setClientProfession] = useState(null);

  const [inputValues, setInputValues] = useState<Record<string, string>>({
    email: clientEmail || "",
    phoneNumber: clientPhone || "",
    profession: clientProfession || "",
  });
  const fetchCustomers = async () => {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("User not authenticated");
      return;
    }

    const userId = userData.user.id;

    const { data: customersData, error: customersError } = await supabase
      .from("customers")
      .select("*")
      .eq("created_by", userId);

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("email, phone, profession")
      .eq("id", userId)
      .single();

    if (clientError) {
      console.error("Error fetching client data:", clientError);
      return;
    }

    // Log fetched data for debugging
    // console.log("Client Data:", clientData);

    // Update states in a consistent and synchronized manner
    const email = clientData?.email || "";
    const phone = clientData?.phone || "";
    const profession = clientData?.profession || "";

    setInputValues({
      email,
      phoneNumber: phone,
      profession,
    });

    setClientEmail(email);
    setClientPhone(phone);
    setClientProfession(profession);

    // console.log("Updated Input Values:", { email, phone, profession });

    if (customersError) {
      console.error("Error fetching customers:", customersError);
    } else {
      setCustomers(customersData || []);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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
      completeIconPath: "/assignment/customer-complete.svg",
      altText: "customer",
      component: (
        <Customer
          setIsCustomerValid={setIsCustomerValid}
          customers={customers}
          fetchCustomers={fetchCustomers}
          showAddCustomerPopup={showAddCustomerPopup}
          setShowAddCustomerPopup={setShowAddCustomerPopup}
          addCustomerForm={addCustomerForm}
          setCustomerToEdit={setCustomerToEdit}
          setIsEditing={setIsEditing}
          selectedCustomerId={selectedCustomerId}
          setSelectedCustomerId={setSelectedCustomerId}
        />
      ),
    },
    {
      id: 2,
      label: registerAssignment?.assignmentTime?.title || "Assignment time",
      subtitle:
        registerAssignment?.assignmentTime?.subtitle ||
        "Fill in the start and end dates for the assignment",
      iconPath: "/assignment/calendar.svg",
      activeIconPath: "/assignment/calendar-active.svg",
      completeIconPath: "/assignment/calendar-complete.svg",
      altText: "calendar",
      component: (
        <AssignmentTime
          assignmentTime={registerAssignment?.assignmentTime}
          setIsAssignmentTimeValid={setIsAssignmentTimeValid}
        />
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
      completeIconPath: "/assignment/wallet-complete.svg",
      altText: "wallet",
      component: (
        <Compensation
          compensation={registerAssignment?.compensation}
          setIsCompensationValid={setIsCompensationValid}
        />
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
      completeIconPath: "/assignment/pencil-complete.svg",
      altText: "pencil",
      component: (
        <Description
          description={registerAssignment?.description || {}}
          setIsDescriptionValid={setIsDescriptionValid}
        />
      ),
    },
  ];
  // AssignmentForm.tsx
  const allFieldsValid =
    isCustomerValid &&
    isAssignmentTimeValid &&
    isCompensationValid &&
    isDescriptionValid;

  const handleSave = (formData: FormData) => {
    setSaving(true);
    setErrorMessage(null);

    sendAssignment(formData)
      .then(() => {
        setShowSuccessPopup(true);
      })
      .catch((err: any) => {
        const errorMessage =
          err.message || "An error occurred while saving data.";
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    setShowReviewPopup(false);
    toggleModal(false); // Close the modal
    // router.refresh(); // Refresh the page
    window.location.reload();
  };

  // console.log("clientEmail"+clientEmail);
  // console.log("clientPhone"+clientPhone);
  // console.log("clientProfession"+clientProfession);

  return (
    <>
      <AddCustomerPopup
        refreshCustomers={fetchCustomers}
        showAddCustomerPopup={showAddCustomerPopup}
        setShowAddCustomerPopup={setShowAddCustomerPopup}
        addCustomerForm={addCustomerForm}
        isEditing={isEditing}
        customerData={customerToEdit}
        setIsEditing={setIsEditing}
        setCustomerToEdit={setCustomerToEdit}
      />
      <form>
        {/* Hidden inputs to include values from ReviewPopup */}
        <input
          type="hidden"
          name="responsiveClientEmail"
          value={inputValues.email}
        />
        <input
          type="hidden"
          name="responsiveClientPhone"
          value={inputValues.phoneNumber}
        />
        <input
          type="hidden"
          name="responsiveClientProfession"
          value={inputValues.profession}
        />
        <input
          type="hidden"
          name="selectedCustomerId"
          value={selectedCustomerId || ""}
        />

        <Modal
          isOpen={isModalOpen}
          title={registerAssignment?.title}
          onClose={() => toggleModal(false)}
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
            validationStatuses={[
              isCustomerValid,
              isAssignmentTimeValid,
              isCompensationValid,
              isDescriptionValid,
            ]}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            clientProfession={clientProfession}
            sendButtonText={registerAssignment?.sendButtonText}
            reviewData={registerAssignment?.review || {}}
            setActiveItemId={setActiveItemId}
            modalContentRef={modalContentRef}
            handleSave={handleSave}
            saving={saving}
            containerRefs={containerRefs}
            items={sidebarItems}
            allFieldsValid={allFieldsValid}
          />
          <div className="fixed lg:hidden bottom-0 w-full p-4 border-t bg-white border-[#EBEBEB]">
            {/* <button
              type="button"
              onClick={() => setShowReviewPopup(true)}
              className="w-full py-[14px] text-base rounded-xl bg-[#04567D] text-white"
            >
              {registerAssignment?.sendButtonText || "Go ahead"}
            </button> */}
            <button
              type="button"
              onClick={() => {
                if (allFieldsValid) {
                  setShowReviewPopup(true);
                } else {
                  toast.error("Please complete all required fields.");
                }
              }}
              disabled={!allFieldsValid}
              className={`w-full py-[14px] text-base rounded-xl ${
                allFieldsValid
                  ? "bg-[#04567D] text-white"
                  : "bg-[#04567D6B] text-white text-opacity-40"
              }`}
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
                  saving={saving}
                  inputValues={inputValues}
                  handleSave={handleSave}
                  setInputValues={setInputValues}
                  sendButtonText={registerAssignment?.sendButtonText}
                  reviewData={registerAssignment?.review || {}}
                  onClose={() => setShowReviewPopup(false)}
                  isToggled={isToggled}
                  setIsToggled={setIsToggled}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center bg-black bg-opacity-20 backdrop-blur-md"
            onClick={handleSuccessClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="
          bg-white rounded-t-lg lg:rounded-lg flex flex-col
          w-full lg:max-w-lg
          z-[70]
          absolute bottom-0
          lg:relative lg:bottom-auto
        "
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 50 }}
              dragElastic={0.1}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) handleSuccessClose();
              }}
            >
              <div className="p-4 lg:p-6 flex lg:hidden items-center justify-between">
                <div className="flex justify-center w-full">
                  <div className="w-8 h-1.5 bg-[#CECECE] rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 pt-4 lg:pt-7 lg:p-6 gap-4 pb-20">
                <h2
                  className="text-2xl font-medium"
                  style={{ letterSpacing: "0.48px" }}
                >
                  {registerAssignment?.review?.successPopup?.title ||
                    "Success!"}
                </h2>
                <Image
                  src={"/icons/review/done.svg"}
                  width={125}
                  height={125}
                  className="py-2"
                  alt="done"
                />
                <div className="flex items-start flex-col text-start justify-start gap-2">
                  <h3 className="text-lg font-semibold">
                    {registerAssignment?.review?.successPopup?.subtitle ||
                      "Your assignment has been registered."}
                  </h3>
                  <p
                    className="text-sm font-normal leading-snug"
                    style={{ letterSpacing: "0.14px" }}
                  >
                    {registerAssignment?.review?.successPopup?.description ||
                      "Thank you for registering the assignment. We'll get back to you shortly."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSuccessClose}
                  className="w-full py-[14px] text-base rounded-xl bg-[#04567D] text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
