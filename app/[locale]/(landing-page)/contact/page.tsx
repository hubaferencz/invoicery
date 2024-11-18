import Hero from "./Hero";
import ContactUs from "../(contact-us)/ContactUs";
import Faq from "./Faq";
import Image from "next/image";

interface ContactProps {
  params: {
    locale: string;
  };
}

export const metadata = async ({ params }: any) => {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locale } = (await params) || "en-US";

  const res = await fetch(
    `${mediaBaseUrl}/api/contact-us/1?locale=${locale}&draft=false&depth=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch metadata.");
  }

  const data = await res.json();

  return {
    title: data.metadata?.metaTitle || "Contact Us",
    description: data.metadata?.metaDescription || "Contact us for support.",
    openGraph: {
      title: data.metadata?.metaTitle || "Contact Us",
      description: data.metadata?.metaDescription || "Contact us for support.",
      images: [
        {
          url: `${mediaBaseUrl}${
            data.hero?.heroImage?.url || "/media/default.png"
          }`,
          alt: data.hero?.heroImage?.altText || "Contact page image",
        },
      ],
    },
  };
};

export default async function Contact({ params }: any) {
  const { locale } = await params;
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch data from the contact-us API
  const contactRes = await fetch(
    `${mediaBaseUrl}/api/contact-us/1?locale=${locale}&draft=false&depth=1`
  );

  if (!contactRes.ok) {
    throw new Error("Failed to fetch contact page data.");
  }

  const contactData = await contactRes.json();

  // Fetch only the contactInfo section from the homepage API
  const contactInfoRes = await fetch(
    `${mediaBaseUrl}/api/home/2?locale=${locale}&fields=contactInfo&draft=false&depth=1`
  );

  if (!contactInfoRes.ok) {
    throw new Error("Failed to fetch contact info from homepage.");
  }

  const contactInfoData = await contactInfoRes.json();

  // Hero section data
  const heroData = {
    title: contactData.hero?.title,
    description: contactData.hero?.description,
    heroImage: `${mediaBaseUrl}${contactData.hero?.heroImage?.url}`,
    heroImageAlt: contactData.hero?.heroImage?.altText,
  };

  // const contactUsData = {
  //   locale: locale,
  //   headerTitle: data.contactInfo.headerTitle,
  //   highlightedHeaderSubtitle: data.contactInfo.highlightedHeaderSubtitle,
  //   headerSubtitle: data.contactInfo.headerSubtitle,
  //   faqCtaText: data.contactInfo.faqCta.text,
  //   sectionBackgroundImage: `${mediaBaseUrl}${data.contactInfo.sectionBackgroundImage.url}`, // Ensure this is passed
  //   contactInfo: data.contactInfo.contactOptions.map((option: any) => ({
  //     icon: `${mediaBaseUrl}${option.icon.url}`,
  //     title: option.title,
  //     description: option.description,
  //     contact: option.contact || option.linkDetails.url,
  //     type: option.type,
  //     action: option.linkDetails.text,
  // url: option.linkDetails.url,
  //   })),
  // };

  // ContactUs section data
  const contactUsData = {
    headerTitle: contactInfoData.contactInfo?.headerTitle,
    locale: locale,
    highlightedHeaderSubtitle:
      contactInfoData.contactInfo?.highlightedHeaderSubtitle,
    headerSubtitle: contactInfoData.contactInfo?.headerSubtitle,
    faqCtaText: contactInfoData.contactInfo?.faqCta.text,
    sectionBackgroundImage: `${mediaBaseUrl}${contactInfoData.contactInfo?.sectionBackgroundImage?.url}`,
    contactInfo: contactInfoData.contactInfo?.contactOptions.map(
      (option: any) => ({
        icon: `${mediaBaseUrl}${option.icon.url}`,
        title: option.itemTitle,
        description: option.itemDescription,
        contact: option.contact || option.linkDetails.url,
        type: option.type,
        action: option.linkDetails.text,
        url: option.linkDetails.url,
      })
    ),
  };

  // FAQ section data
  const faqData = {
    title: contactData.faqSection?.faqTitle || "FAQ",
    description:
      contactData.faqSection?.faqDescription ||
      "Find answers to your questions here.",
    ctaText: contactData.faqSection?.ctaText || "To the FAQ",
    locale: locale,
  };

  return (
    <>
      <Image
        src={heroData.heroImage}
        alt={heroData.heroImageAlt || ""}
        width={620}
        height={500}
        className="block w-full lg:hidden"
      />

      <div
        className="absolute w-full h-28 bg-[#04567D] top-0 hidden lg:block"
        aria-hidden="true"
      ></div>
      <Hero {...heroData} />
      <ContactUs {...contactUsData} />
      <Faq {...faqData} />
    </>
  );
}
