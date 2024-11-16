import React from "react";
import VerifyYourself from "./VerifyYourself";
import RegisterAssignment from "./RegisterAssignment";
// import RegisterAssignment from "./RegisterAssignment";


type Props = {
  verified: any;
  // setVerified: any;
  locale: string;
  title: string;
  verifyYourself: any;
  registerAssignment: any;
  addCustomerForm: any;
};

export default function Tasks({
  verified,
  locale,
  // setVerified,
  title,
  verifyYourself,
  registerAssignment,
  addCustomerForm,
}: Props) {
  return (
    <div
      className={`bg-white max-w-[778px] p-4 lg:p-6 w-full mx-auto lg:mx-0 grid grid-cols-1 ${
        !verified ? "lg:grid-cols-2" : "hidden lg:grid"
      } gap-6 rounded-sm`}
    >
      <h2
        className="leading-normal text-xl font-medium py-0.5 block lg:hidden"
        style={{ letterSpacing: "0.20px" }}
      >
        {title}
      </h2>

      <VerifyYourself
        verifyYourself={verifyYourself}
        // setVerified={setVerified}
        verified={verified}
      />
      <RegisterAssignment registerAssignment={registerAssignment} addCustomerForm={addCustomerForm}/>
    </div>
  );
}
