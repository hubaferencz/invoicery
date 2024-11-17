// import React, { ReactNode } from "react";

// type FormContainerProps = {
//   title: string;
//   index?: number;
//   subtitle: string;
//   children: ReactNode;
// };

// const FormContainer = React.forwardRef<HTMLDivElement, FormContainerProps>(
//   ({ title, index, subtitle, children }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className="w-full p-6 bg-white rounded"
//         id={index ? index.toString() : "review"}
//       >
//         {/* Header with title and index */}
//         <header className="flex items-baseline text-[#878484] text-base font-medium pb-4 border-b border-[#EBEBEB]">
//           <h1>
//             {index && index + "."} {title}
//           </h1>
//         </header>

//         {/* Subtitle */}
//         <p className="py-6 text-xl font-medium">{subtitle}</p>

//         {/* Content */}
//         <div className="w-full">{children}</div>
//       </div>
//     );
//   }
// );

// FormContainer.displayName = "FormContainer";

// export default FormContainer;
import React, { ReactNode } from "react";
import Image from "next/image";
import { Collapse } from "react-collapse";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";


type FormContainerProps = {
  item: SidebarItem;
  children: ReactNode;
  isMobile: boolean;
  isOpen: boolean;
  onClick: () => void;
};

const styles = (
  <style jsx global>{`
    .ReactCollapse--collapse {
      transition: height 0.5s ease;
      overflow: hidden;
    }
  `}</style>
);

const FormContainer = React.forwardRef<HTMLDivElement, FormContainerProps>(
  ({ item, children, isMobile, isOpen, onClick }, ref) => {
    return (
      <>
        {styles}
        <div
          ref={ref}
          className={`w-full pt-3 px-4 lg:px-6  lg:pt-6 lg:p-6 rounded transition-all duration-500 ${
            isMobile
              ? isOpen
                ? "bg-transparent"
                : "bg-white"
              : "bg-white"
          }`}
          id={item.id ? item.id.toString() : "review"}
        >
          {/* Header with title and index */}
          <header
            onClick={isMobile ? onClick : undefined}
            className={`flex items-baseline text-base font-medium pb-3 lg:pb-4 lg:border-b border-[#EBEBEB] ${
              isMobile ? "cursor-pointer" : ""
            }`}
            role={isMobile ? "button" : undefined}
            tabIndex={isMobile ? 0 : undefined}
            aria-expanded={isMobile ? isOpen : undefined}
          >
            {isMobile ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  {item.iconPath && (
                    <div
                      className={`${
                        isOpen ? "bg-[#CBE3EF]" : "bg-transparent"
                      } flex w-10 h-10 aspect-square items-center justify-center rounded-full transition-all duration-500`}
                    >
                      <Image
                        src={
                          isOpen
                            ? item.activeIconPath || item.iconPath
                            : item.iconPath
                        }
                        alt={item.altText|| ""}
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                  <h1
                    className={`transition-colors font-normal text-base duration-500 ${
                      isOpen ? "text-[#04567D]" : "text-black"
                    }`}
                  >
                    {item.id && item.id + "."} {item.label}
                  </h1>
                </div>

                {/* <Image
                  src="/icons/down-chev.svg"
                  alt="Toggle"
                  width={24}
                  height={24}
                  
                  /> */}
                  <ChevronIcon color="#878484" className={`transform w-4 h-4 transition-transform duration-500 ${
                    isOpen ? "rotate-180" : ""
                  }`}/>
              </div>
            ) : (
              <h1 className="text-[#878484]">
                {item.id && item.id + "."} {item.label}
              </h1>
            )}
          </header>

          {/* Content */}
          {isMobile ? (
            <Collapse
              isOpened={isOpen}
              theme={{
                collapse: "ReactCollapse--collapse",
              }}
            >
              {/* Subtitle */}
              <p className="hidden py-6 text-xl font-medium lg:block">{item.subtitle}</p>
              <div className="w-full py-4 lg:py-0">{children}</div>
            </Collapse>
          ) : (
            <>
              {/* Subtitle */}
              <p className="py-6 text-xl font-medium">{item.subtitle}</p>
              <div className="w-full">{children}</div>
            </>
          )}
        </div>
      </>
    );
  }
);

FormContainer.displayName = "FormContainer";

export default FormContainer;
