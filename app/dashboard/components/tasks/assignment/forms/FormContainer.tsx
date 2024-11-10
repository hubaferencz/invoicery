// import React, { ReactNode } from "react";

// type FormContainerProps = {
//   title: string;
//   index?: number;
//   subtitle: string;
//   children: ReactNode;
// };

// export default function FormContainer({
//   title,
//   index,
//   subtitle,
//   children,
// }: FormContainerProps) {
//   return (
//     <div className="w-full p-6 bg-white rounded" id={index ? index.toString() : "review"}>
//       {/* Header with title and index */}
//       <header
//         className="flex items-baseline text-[#878484] text-base font-medium pb-4 border-b border-[#EBEBEB]"
//       >
//         <h1>
//           {index && index + "."} {title}
//         </h1>
//       </header>

//       {/* Subtitle */}
//       <p className="py-6 text-xl font-medium">{subtitle}</p>

//       {/* Content */}
//       <div className="w-full">{children}</div>
//     </div>
//   );
// }
import React, { ReactNode } from "react";

type FormContainerProps = {
  title: string;
  index?: number;
  subtitle: string;
  children: ReactNode;
};

const FormContainer = React.forwardRef<HTMLDivElement, FormContainerProps>(
  ({ title, index, subtitle, children }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full p-6 bg-white rounded"
        id={index ? index.toString() : "review"}
      >
        {/* Header with title and index */}
        <header className="flex items-baseline text-[#878484] text-base font-medium pb-4 border-b border-[#EBEBEB]">
          <h1>
            {index && index + "."} {title}
          </h1>
        </header>

        {/* Subtitle */}
        <p className="py-6 text-xl font-medium">{subtitle}</p>

        {/* Content */}
        <div className="w-full">{children}</div>
      </div>
    );
  }
);

FormContainer.displayName = "FormContainer";

export default FormContainer;
