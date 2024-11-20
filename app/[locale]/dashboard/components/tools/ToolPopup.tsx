// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// type ToolPopupProps = {
//   title: string;
//   ctaText: string;
//   closeText: string;
//   description: string;
//   placeholder: string;
//   onClose: () => void;
// };

// export default function ToolPopup({
//   title,
//   ctaText,
//   closeText,
//   description,
//   placeholder,
//   onClose,
// }: ToolPopupProps) {
//   const [textareaValue, setTextareaValue] = useState("");

//   // Handle Escape key to close the popup
//   useEffect(() => {
//     const handleEsc = (event: KeyboardEvent) => {
//       if (event.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50"
//       onClick={onClose}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.2 }}
//     >
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white rounded-t-md rounded-md overflow-clip w-full md:w-auto md:max-w-[400px] flex flex-col"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//         transition={{ duration: 0.2 }}
//       >
//         {/* Header */}
//         <div className="w-full p-4 md:p-6 flex items-center justify-between border-b border-[#EFEFEF] bg-white text-black">
//           <button
//           type="button"
//             onClick={onClose}
//             className="text-sm text-[#5E5C5C] font-normal"
//           >
//             {closeText}
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex flex-col p-4 md:p-6 gap-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-2">
//               <h2 className="font-bold text-xl">{title}</h2>
//               <p className="text-sm text-[#5E5C5C]">{description}</p>
//             </div>

//             {/* Textarea */}
//             <textarea
//               className="w-full h-20 p-3 border border-[#EFEFEF] rounded resize-none focus:outline-none text-xs placeholder:text-xs"
//               placeholder={placeholder}
//               value={textareaValue}
//               onChange={(e) => setTextareaValue(e.target.value)}
//             />
//           </div>
//           {/* Submit Button */}
//           <button
//           type="button"
//             onClick={onClose}
//             className={`w-full py-3 text-base rounded-xl ${
//               textareaValue
//                 ? "bg-[#04567D] text-white"
//                 : "bg-[#04567D6B] text-white text-opacity-40 cursor-not-allowed"
//             }`}
//             disabled={!textareaValue}
//           >
//             {ctaText}
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sendDeductionRequest } from "./sendDeductionRequest"; // Import the function
import toast from "react-hot-toast";

type ToolPopupProps = {
  title: string;
  ctaText: string;
  closeText: string;
  description: string;
  placeholder: string;
  emailToSendTo: string; // Add the email to send to
  onClose: () => void;
};

export default function ToolPopup({
  title,
  ctaText,
  closeText,
  description,
  placeholder,
  emailToSendTo, // Receive email to send to
  onClose,
}: ToolPopupProps) {
  const [textareaValue, setTextareaValue] = useState("");
  const [sending, setSending] = useState(false); // Track sending state

  // Handle Escape key to close the popup
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    if (!textareaValue.trim()) return;

    setSending(true); // Set sending state
    try {
      await sendDeductionRequest(textareaValue, emailToSendTo, title);
      toast.success("Sent!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to send the request.");
    } finally {
      setSending(false); // Reset sending state
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-md rounded-md overflow-clip w-full md:w-auto md:max-w-[400px] flex flex-col"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="w-full p-4 md:p-6 flex items-center justify-between border-b border-[#EFEFEF] bg-white text-black">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#5E5C5C] font-normal"
          >
            {closeText}
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col p-4 md:p-6 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-xl">{title}</h2>
              <p className="text-sm text-[#5E5C5C]">{description}</p>
            </div>

            {/* Textarea */}
            <textarea
              className="w-full h-20 p-3 border border-[#EFEFEF] rounded resize-none focus:outline-none text-xs placeholder:text-xs"
              placeholder={placeholder}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full py-3 text-base rounded-xl ${
              sending
                ? "bg-[#04567D] bg-opacity-40 text-white cursor-not-allowed"
                : textareaValue
                ? "bg-[#04567D] text-white"
                : "bg-[#04567D6B] text-white text-opacity-40 cursor-not-allowed"
            }`}
            disabled={!textareaValue || sending}
          >
            {sending ? "Sending..." : ctaText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
