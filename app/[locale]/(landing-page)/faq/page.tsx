import Faq from "./Faq";

interface FaqPageProps {
  params: {
    locale: string;
  };
}

interface OptionalImage {
  id: number;
  altText: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
}

interface Question {
  id: string;
  text: string;
  answer: string;
  optionalImage?: OptionalImage;
}

interface Category {
  id: string;
  category: string;
  questions: Question[];
}

interface ContactSection {
  contactTitle: string;
  contactDescription?: string;
  ctaText: string;
  ctaLink?: string;
}

interface FaqData {
  id: number;
  meta?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  title?: string;
  header?: {
    mainTitle?: string;
    subTitle?: string;
  };
  searchPlaceholder?: string;
  faqCategories: Category[];
  contactSection: {
    contactTitle: string;
    contactDescription?: string;
    ctaText: string;
  };
  updatedAt: string;
  createdAt: string;
}

export const metadata = async ({ params }: any) => {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locale } = (await params) || { locale: "en-US" };

  // Fetch localized data
  const localizedRes = await fetch(
    `${mediaBaseUrl}/api/faq/1?locale=${locale}&draft=false&depth=1`,
    {
      cache: "force-cache",
    }
  );

  // Fetch fallback English data
  const fallbackRes = await fetch(
    `${mediaBaseUrl}/api/faq/1?locale=en-US&draft=false&depth=1`,
    {
      cache: "force-cache",
    }
  );

  if (!localizedRes.ok || !fallbackRes.ok) {
    throw new Error("Failed to fetch metadata.");
  }

  const localizedData: FaqData = await localizedRes.json();
  const fallbackData: FaqData = await fallbackRes.json();

  return {
    title:
      localizedData.meta?.metaTitle || fallbackData.meta?.metaTitle || "FAQs",
    description:
      localizedData.meta?.metaDescription ||
      fallbackData.meta?.metaDescription ||
      "Find answers to common questions.",
    openGraph: {
      title:
        localizedData.meta?.metaTitle || fallbackData.meta?.metaTitle || "FAQs",
      description:
        localizedData.meta?.metaDescription ||
        fallbackData.meta?.metaDescription ||
        "Find answers to common questions.",
    },
  };
};

export default async function FaqPage({ params }: any) {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locale } = (await params) || { locale: "en-US" };

  // Fetch localized data
  const localizedRes = await fetch(
    `${mediaBaseUrl}/api/faq/1?locale=${locale}&draft=false&depth=1`,
    {
      cache: "force-cache",
    }
  );

  // Fetch fallback English data
  const fallbackRes = await fetch(
    `${mediaBaseUrl}/api/faq/1?locale=en-US&draft=false&depth=1`,
    {
      cache: "force-cache",
    }
  );

  if (!localizedRes.ok || !fallbackRes.ok) {
    throw new Error("Failed to fetch FAQ data.");
  }

  const localizedData: FaqData = await localizedRes.json();
  const fallbackData: FaqData = await fallbackRes.json();

  // Initialize faqProps with default values
  const faqProps: any = {
    mainTitle:
      localizedData.header?.mainTitle || fallbackData.header?.mainTitle || "",
    subTitle:
      localizedData.header?.subTitle || fallbackData.header?.subTitle || "",
    searchPlaceholder:
      localizedData.searchPlaceholder || fallbackData.searchPlaceholder || "",
    faqCategories: [] as any[],
    contactSection: {
      contactTitle:
        localizedData.contactSection.contactTitle ||
        fallbackData.contactSection.contactTitle ||
        "",
      contactDescription:
        localizedData.contactSection.contactDescription ||
        fallbackData.contactSection.contactDescription ||
        "",
      ctaText:
        localizedData.contactSection.ctaText ||
        fallbackData.contactSection.ctaText ||
        "",
      ctaLink: `contact`,
    },
    locale,
  };

  const localizedCategories = localizedData.faqCategories || [];
  const fallbackCategories = fallbackData.faqCategories || [];

  // Helper function to compare questions
  const isSameQuestion = (q1: Question, q2: Question): boolean => {
    return q1.text === q2.text && q1.answer === q2.answer;
  };

  if (localizedCategories.length > 0) {
    // Process localized categories
    faqProps.faqCategories = localizedCategories.reduce(
      (acc: any[], localizedCategory: Category) => {
        const categoryId = localizedCategory.id;
        const fallbackCategory = fallbackCategories.find(
          (fc) => fc.id === categoryId
        );

        let questions: any[] = [];

        if (
          localizedCategory.questions &&
          localizedCategory.questions.length > 0
        ) {
          // Filter out fallback questions that might be included due to CMS fallback
          questions = localizedCategory.questions.filter(
            (localizedQuestion) => {
              // Check if the question exists in the fallback category
              const isInFallback =
                fallbackCategory &&
                fallbackCategory.questions.some((fallbackQuestion) =>
                  isSameQuestion(localizedQuestion, fallbackQuestion)
                );

              // Only include the question if it's not identical to the fallback question
              return !isInFallback;
            }
          );
        }

        // Only include the category if it has localized questions
        if (questions.length > 0) {
          acc.push({
            category: localizedCategory.category,
            questions: questions.map((question) => ({
              text: question.text,
              answer: question.answer,
              optionalImage: question.optionalImage
                ? `${mediaBaseUrl}${question.optionalImage.url}`
                : null,
            })),
          });
        }

        return acc;
      },
      [] as any[]
    );

    // If no localized categories after filtering, fallback to English
    if (faqProps.faqCategories.length === 0) {
      faqProps.faqCategories = fallbackCategories.map((fallbackCategory) => ({
        category: fallbackCategory.category,
        questions: fallbackCategory.questions.map((question) => ({
          text: question.text,
          answer: question.answer,
          optionalImage: question.optionalImage
            ? `${mediaBaseUrl}${question.optionalImage.url}`
            : null,
        })),
      }));
    }
  } else {
    // No localized categories, use fallback English categories
    faqProps.faqCategories = fallbackCategories.map((fallbackCategory) => ({
      category: fallbackCategory.category,
      questions: fallbackCategory.questions.map((question) => ({
        text: question.text,
        answer: question.answer,
        optionalImage: question.optionalImage
          ? `${mediaBaseUrl}${question.optionalImage.url}`
          : null,
      })),
    }));
  }

  return <Faq {...faqProps} />;
}
