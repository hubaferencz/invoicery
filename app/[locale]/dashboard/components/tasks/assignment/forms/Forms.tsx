import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import FormContainer from "./FormContainer";
import Review from "./review/Review";

type Props = {
  setActiveItemId: React.Dispatch<React.SetStateAction<number>>;
  modalContentRef: React.RefObject<HTMLDivElement | null>;
  containerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  items: SidebarItem[];
};

export default function Forms({
  setActiveItemId,
  modalContentRef,
  containerRefs,
  items,
}: Props) {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0); // First item open by default

  // State variable to control visibility of 'Review and create' section
  

  // Media query to detect if screen width is below lg (1024px)
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    const scrollContainer = modalContentRef.current;
    if (!scrollContainer || !containerRefs.current.length) return;

    const handleScroll = () => {
      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const linePosition = scrollContainerRect.top + 100; // Line is at 100px from the top

      let minDistance = Infinity;
      let activeIndex = -1;

      containerRefs.current.forEach((ref, index) => {
        if (ref) {
          const refRect = ref.getBoundingClientRect();
          const refTop = refRect.top;

          const distance = Math.abs(refTop - linePosition);
          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        }
      });

      if (activeIndex !== -1) {
        setActiveItemId(activeIndex + 1);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [setActiveItemId, modalContentRef, containerRefs]);

  const handleAccordionClick = (index: number) => {
    if (isMobile) {
      setActiveAccordionIndex((prevIndex) =>
        prevIndex === index ? -1 : index
      );
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full rounded lg:gap-8 lg:max-w-2xl">
      {items.map((item, index) => (
        <FormContainer
          key={item.id}
          ref={(el) => {
            containerRefs.current[index] = el;
          }}
          item={item}
          isMobile={isMobile}
          isOpen={activeAccordionIndex === index}
          onClick={() => handleAccordionClick(index)}
        >
          {item.component}
        </FormContainer>
      ))}

      {/* Include the 'Review and create' section only if showReviewSection is true */}
      {!isMobile && (
        // @ts-ignore
        <FormContainer
          ref={(el) => {
            containerRefs.current[items.length] = el;
          }}
          item={{
            id: items.length + 1,
            label: "Review and create",
            subtitle: "Fill in your details",
            iconPath: "", // No icon needed
            activeIconPath: "",
            altText: "review",
            component: <Review />,
          }}
          isMobile={false} // Do not make collapsible
          isOpen={true}
          onClick={() => {}}
        >
          <Review />
        </FormContainer>
      )}
     
      <div className="w-full pt-10 text-transparent bg-transparent select-none">
        .
      </div>
    </div>
  );
}
