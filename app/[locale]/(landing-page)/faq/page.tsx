import Faq from "./Faq";
interface FaqPageProps {
  params: {
    locale: string;
  };
}

export const metadata = async ({ params }: any) => {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locale } = (await params) || "en-US";

  const res = await fetch(
    `${mediaBaseUrl}/api/faq/1?locale=${locale}&draft=false&depth=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch metadata.");
  }

  const data = await res.json();

  return {
    title: data.meta?.metaTitle || "FAQs",
    description:
      data.meta?.metaDescription || "Find answers to common questions.",
    openGraph: {
      title: data.meta?.metaTitle || "FAQs",
      description:
        data.meta?.metaDescription || "Find answers to common questions.",
    },
  };
};

export default async function FaqPage({ params }: any) {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locale } = await params;

  const res = await fetch(
    `${mediaBaseUrl}/api/faq/1?locale=${locale}&draft=false&depth=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch FAQ data.");
  }

  const data = await res.json();

  const faqProps = {
    mainTitle: data.header.mainTitle,
    subTitle: data.header.subTitle,
    searchPlaceholder: data.searchPlaceholder,
    faqCategories: data.faqCategories.map((category: any) => ({
      category: category.category,
      questions: category.questions.map((question: any) => ({
        text: question.text,
        answer: question.answer,
        optionalImage: question.optionalImage
          ? `${mediaBaseUrl}${question.optionalImage.url}`
          : null,
      })),
    })),
    contactSection: {
      contactTitle: data.contactSection.contactTitle,
      contactDescription: data.contactSection.contactDescription,
      ctaText: data.contactSection.ctaText,
      ctaLink: `/${locale}/contact-us`,
    },
    locale,
  };

  return <Faq {...faqProps} />;
}
