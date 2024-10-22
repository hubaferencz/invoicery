// import React from "react";

// interface LanguageDropdownProps {
//   languages: { name: string; code: string }[];
//   selectedLanguage: string;
//   onSelect: (language: string) => void;
// }

// const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
//   languages,
//   selectedLanguage,
//   onSelect,
// }) => {
//   return (
//     <div className="bg-primary-700 w-full px-4 lg:py-[30px] text-white font-medium lg:px-10 flex items-center justify-center ">
//       <div className="grid grid-cols-4 xl:grid-cols-5 gap-x-10 max-w-7xl w-full mx-auto items-start">
//         {languages.map((language) => (
//           <span
//             key={language.code}
//             className={`px-4 py-3 hover:bg-black hover:bg-opacity-10 transition-all duration-300 rounded-full w-min cursor-pointer max-w-[224px] ${
//               selectedLanguage === language.name
//                 ? "text-secondary-500 font-bold"
//                 : ""
//             }`}
//             onClick={() => onSelect(language.name)}
//           >
//             {language.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LanguageDropdown;

interface Language {
  name: string;
  code: string;
}

interface LanguageDropdownProps {
  languages: Language[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languages,
  selectedLanguage,
  onSelect,
}) => {
  return (
    <div className="bg-primary-700 w-full px-4 lg:py-[30px] text-white font-medium lg:px-10 flex items-center justify-center">
      <div className="grid grid-cols-4 xl:grid-cols-5 gap-x-10 max-w-7xl w-full mx-auto items-start">
        {languages.map((language) => (
          <span
            key={language.code}
            className={`px-4 py-3 hover:bg-black hover:bg-opacity-10 transition-all duration-300 rounded-full w-min cursor-pointer max-w-[224px] ${
              selectedLanguage === language.name
                ? "text-secondary-500 font-bold"
                : ""
            }`}
            onClick={() => onSelect(language.name)}
          >
            {language.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;




