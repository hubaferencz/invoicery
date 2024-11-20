import React from "react";
import VerifyYourself from "./VerifyYourself";
import RegisterAssignment from "./RegisterAssignment";
// import RegisterAssignment from "./RegisterAssignment";


type Props = {

  // setVerified: any;
  locale: string;
  isVerified: boolean;
  title: string;
  verifyYourself: any;
  registerAssignment: any;
  addCustomerForm: any;
};

export default function Tasks({

  locale,
  isVerified,
  // setVerified,
  title,
  verifyYourself,
  registerAssignment,
  addCustomerForm,
}: Props) {
  return (
    <div
      className={`bg-white max-w-[778px] p-4 lg:p-6 w-full mx-auto lg:mx-0 grid grid-cols-1 ${
        !isVerified ? "lg:grid-cols-2 gap-x-6" : "hidden lg:grid "
      } rounded-sm`}
    >
      <h2
        className="leading-normal pb-6 text-xl font-medium py-0.5 block lg:hidden"
        style={{ letterSpacing: "0.20px" }}
      >
        {title}
      </h2>

      <VerifyYourself
        verifyYourself={verifyYourself}
        // setVerified={setVerified}
        verified={isVerified}
      />
      <RegisterAssignment registerAssignment={registerAssignment} addCustomerForm={addCustomerForm}/>
    </div>
  );
}
