"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Info from "./Info";

import { revalidatePath } from "next/cache";
import { addNewCustomer } from "./addNewCustomer";
import { updateCustomer } from "./updateCustomer"; // You will create this function

type Field = {
  label: string;
  name: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string; // "text", "number", "email", etc.
  errorMessage?: string;
};

type FieldSection = {
  title?: string;
  fields: Field[];
};

type Props = {
  addCustomerForm: any;
  showAddCustomerPopup: boolean;
  setShowAddCustomerPopup: (value: boolean) => void;
  isEditing?: boolean;
  customerData?: any;
  setIsEditing?: (value: boolean) => void;
  setCustomerToEdit?: (value: any) => void;
  refreshCustomers?: () => void; // Function to refresh the customers list
};

export default function AddCustomerPopup({
  addCustomerForm,
  showAddCustomerPopup,
  setShowAddCustomerPopup,
  isEditing = false,
  customerData,
  setIsEditing,
  setCustomerToEdit,
  refreshCustomers,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Define your field sections
  const personalFields: FieldSection = {
    fields: [
      {
        label: addCustomerForm.taxFields.nameLabel,
        name: "full_name", // Updated to match database fields
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
      {
        label: addCustomerForm.taxFields.vatNumberLabel,
        name: "vat_or_company_nr", // Updated to match database fields
        required: true,
        minLength: 5,
        maxLength: 30,
        errorMessage: "Must be 5-30 characters.",
      },
    ],
  };

  const locationFields: FieldSection = {
    fields: [
      {
        label: addCustomerForm.contactFields.contactPersonLabel,
        name: "reference_or_contact", // Updated to match database fields
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
      {
        label: addCustomerForm.contactFields.poNumberLabel,
        name: "po_number", // Updated to match database fields
        required: false,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
      {
        label: addCustomerForm.contactFields.phoneLabel,
        name: "phone",
        required: true,
        minLength: 3,
        maxLength: 17,
        errorMessage: "Must be 3-17 characters.",
        type: "tel",
      },
      {
        label: addCustomerForm.contactFields.emailLabel,
        name: "email",
        required: true,
        minLength: 3,
        maxLength: 40,
        errorMessage: "Enter a valid email.",
        type: "email",
      },
    ],
  };

  const paymentFields: FieldSection = {
    fields: [
      {
        label: addCustomerForm.addressFields.addressLine1Label,
        name: "address_line_1", // Updated to match database fields
        required: true,
        minLength: 3,
        maxLength: 40,
        errorMessage: "Must be 3-40 characters.",
      },
      {
        label: addCustomerForm.addressFields.zipCodeLabel,
        name: "zip_code", // Updated to match database fields
        required: true,
        minLength: 3,
        maxLength: 10,
        errorMessage: "Must be 3-10 characters.",
      },
      {
        label: addCustomerForm.addressFields.cityLabel,
        name: "city",
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
      {
        label: addCustomerForm.addressFields.countryLabel,
        name: "country",
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
    ],
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAddCustomerPopup(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (isEditing && customerData) {
      // Pre-fill form with customer data
      const initialValues: { [key: string]: string } = {};
      // Combine all fields into one array
      const allFields = [
        ...personalFields.fields,
        ...locationFields.fields,
        ...paymentFields.fields,
      ];

      allFields.forEach((field) => {
        const value = customerData[field.name] || "";
        initialValues[field.label] = value;
      });

      setInputValues(initialValues);
    } else if (!isEditing) {
      setInputValues({});
    }
    // Adjusted dependency array to avoid infinite loop
  }, [isEditing, customerData?.id]);

  const handleFocus = (fieldLabel: string) =>
    setInputFocus((prevFocus) => ({ ...prevFocus, [fieldLabel]: true }));

  const handleBlur = (field: Field) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [field.label]: false }));
    validateField(field, inputValues[field.label] || "");
  };

  const handleChange = (field: Field, value: string) => {
    setInputValues((prevValues) => ({ ...prevValues, [field.label]: value }));
    validateField(field, value);
  };

  const validateField = (field: Field, value: string) => {
    if (!value) {
      setErrors((prevErrors) => ({ ...prevErrors, [field.label]: null }));
      return;
    }

    if (field.type === "email") {
      // Email format validation using a regular expression
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field.label]: "Please enter a valid email address.",
        }));
        return;
      }
    }

    if (field.minLength && value.length < field.minLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.label]: field.errorMessage || "Invalid input.",
      }));
    } else if (field.maxLength && value.length > field.maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.label]: field.errorMessage || "Invalid input.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field.label]: null }));
    }
  };

  const allFieldsValid = () => {
    return personalFields.fields
      .concat(locationFields.fields, paymentFields.fields)
      .filter(({ required }) => required)
      .every((field) => inputValues[field.label] && !errors[field.label]);
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSaving(true);

    const form = event.currentTarget.form as HTMLFormElement;

    // Create a new FormData object from the form
    const formData = new FormData(form);

    try {
      if (isEditing && customerData) {
        // Update existing customer
        await updateCustomer(customerData.id, formData);
        setIsEditing && setIsEditing(false);
        setCustomerToEdit && setCustomerToEdit(null);
      } else {
        // Add new customer
        await addNewCustomer(formData);
      }
      setShowAddCustomerPopup(false);
      refreshCustomers && refreshCustomers();
    } catch (err: any) {
      console.error("Error saving data:", err.message);
      setErrorMessage(err.message || "An error occurred while saving data.");
    } finally {
      setSaving(false);
      revalidatePath;
    }
  };

  const renderFields = ({ title, fields }: FieldSection) => (
    <div className="flex flex-col w-full gap-2">
      {title && <h3 className="text-sm font-medium">{title}</h3>}
      <div className="w-full bg-[#F4F4F4] rounded p-4 pb-5 space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="relative border-b border-[#EBEBEB]">
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder=" "
              className="w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none"
              onFocus={() => handleFocus(field.label)}
              onBlur={() => handleBlur(field)}
              value={inputValues[field.label] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
            <label
              className={`absolute left-0 flex items-center gap-0.5 bottom-1.5 transition-all duration-200 ease-in-out text-[#878484] pointer-events-none ${
                inputFocus[field.label] || inputValues[field.label]
                  ? "-translate-y-5 text-[10px]"
                  : "text-sm"
              }`}
            >
              <span>{field.label}</span>
              {field.required && <span className="text-[#EB6060]">*</span>}

              {inputValues[field.label] && errors[field.label] && (
                <span className="text-[#EB6060] ml-2">
                  {errors[field.label]}
                </span>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Update the button text based on the mode
  const buttonText = saving
    ? addCustomerForm.savingText
    : isEditing
    ? addCustomerForm.updateButtonText || "Update Customer"
    : addCustomerForm.saveButtonText;

  return (
    <AnimatePresence>
      {showAddCustomerPopup && (
        <motion.div
          className="fixed inset-0 z-[950] flex items-start justify-center bg-black bg-opacity-50 md:p-10 md:overflow-y-scroll"
          onClick={() => {
            setShowAddCustomerPopup(false);
            setIsEditing && setIsEditing(false);
            setCustomerToEdit && setCustomerToEdit(null);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white md:max-w-[556px] md:rounded-md z-10 w-full h-full overflow-y-scroll md:h-auto flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-3 w-full p-4 md:p-6 items-center z-20 justify-between border-b border-[#EFEFEF] md:rounded-t-md bg-white text-black">
              <div className="flex items-center justify-start col-span-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCustomerPopup(false);
                    setIsEditing && setIsEditing(false);
                    setCustomerToEdit && setCustomerToEdit(null);
                  }}
                  className="text-sm text-[#5E5C5C] font-normal"
                >
                  Cancel
                </button>
              </div>
              <div className="flex items-center justify-center col-span-1 text-center">
                <h2 className="text-base font-medium">
                  {!isEditing
                    ? addCustomerForm.popupTitle
                    : addCustomerForm.editText}
                </h2>
              </div>
              <div className="flex lg:hidden items-end justify-end w-full col-span-1"></div>
            </div>

            <form className="flex flex-col items-start gap-6 px-4 md:px-6 py-8 md:py-6">
              <h2
                className="text-xl font-medium"
                style={{ letterSpacing: "0.2px" }}
              >
                {!isEditing
                  ? addCustomerForm.headerTitle
                  : addCustomerForm.editText}
              </h2>
              <div className="flex flex-col gap-2">
                {renderFields(personalFields)}
                <Info
                  title={addCustomerForm.taxFields.vatInfoBanner.vatInfoTitle}
                  description={
                    addCustomerForm.taxFields.vatInfoBanner.vatInfoDescription
                  }
                />
              </div>
              {renderFields(locationFields)}
              {renderFields(paymentFields)}

              <button
                type="button"
                onClick={handleSave}
                disabled={!allFieldsValid() || saving}
                className={`w-full py-[14px] text-base rounded-xl ${
                  allFieldsValid() && !saving
                    ? "bg-[#04567D] text-white"
                    : "bg-[#04567D6B] text-white text-opacity-40"
                }`}
              >
                {buttonText}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
