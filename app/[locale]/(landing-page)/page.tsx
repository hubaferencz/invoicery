import Features from "./(features-first)/Features";
import Advantages from "./(advantages)/Advantages";
import Hero from "./(hero)/Hero";
import Statistics from "./(statistics)/Statistics";
import Steps from "./(steps)/Steps";
import ContactUs from "./(contact-us)/ContactUs";
import Image from "next/image";

interface HomeProps {
  params: {
    locale: string;
  };
}

export const metadata = async ({ params }: any) => {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locale } = (await params) || "en-US";

  const res = await fetch(
    `${mediaBaseUrl}/api/home/2?locale=${locale}&draft=false&depth=1`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch metadata.");
  }

  const data = await res.json();

  return {
    title: data.meta?.metaTitle || "Default Title",
    description: data.meta?.metaDescription || "Default description.",
    openGraph: {
      title: data.meta?.metaTitle || "Default Title",
      description: data.meta?.metaDescription || "Default description.",
      images: [
        {
          url: `${mediaBaseUrl}${
            data.hero?.heroImage?.url || "/media/default.png"
          }`,
          alt: data.hero?.heroImageAlt || "Default image alt text",
        },
      ],
    },
  };
};

export default async function Home({ params }: any) {
  const { locale } = await params;
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${mediaBaseUrl}/api/home/2?locale=${locale}&draft=false&depth=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  const data = await res.json();

  // Pass hero section data
  const heroData = {
    title: data.hero.title,
    description: data.hero.description,
    ctaText: data.hero.ctaText,
    ctaLink: data.hero.ctaLink,
    heroImage: `${mediaBaseUrl}${data.hero.heroImage.url}`,
    heroImageAlt: data.hero.heroImageAlt,
    registerSectionText: data.hero.registerSectionText,
  };

  // Pass features data
  const features = data.features.map((feature: any, index: number) => ({
    rank: index + 1,
    description: feature.description,
    icon: `${mediaBaseUrl}${feature.icon.url}`,
  }));

  // Pass steps data
  const stepsData = {
    headerTitle: data.steps.headerTitle,
    highlightedHeaderTitle: data.steps.highlightedHeaderTitle,
    headerSubtitle: data.steps.headerSubtitle,
    steps: data.steps.steps.map((step: any, index: number) => ({
      rank: index + 1,
      title: step.title,
      subtitle: step.subtitle,
      description: step.description,
      image: `${mediaBaseUrl}${step.image.url}`,
    })),
    ctaText: data.steps.cta.textText,
    ctaLink: data.steps.cta.link,
  };

  // Pass statistics data
  const statisticsData = {
    headerTitle: data.statistics.headerTitle,
    headerTitleSecondLine: data.statistics.headerTitleSecondLine,
    sectionBackgroundImage: `${mediaBaseUrl}${data.statistics.sectionBackgroundImage.url}`,
    stats: data.statistics.stats.map((stat: any) => ({
      start: stat.start,
      finish: stat.finish,
      title: stat.title,
      measurement: stat.measurement || "",
    })),
  };

  // Pass advantages data
  const advantagesData = {
    headerTitle: data.advantages.headerTitle,
    highlightedHeaderSubtitle: data.advantages.highlightedHeaderSubtitle,
    headerSubtitle: data.advantages.headerSubtitle,
    advantages: data.advantages.advantages.map(
      (advantage: any, index: number) => ({
        rank: index + 1,
        title: advantage.title,
        subtitle: advantage.subtitle,
        description: advantage.description,
        icon: `${mediaBaseUrl}${advantage.icon.url}`,
      })
    ),
    ctaText: data.advantages.cta.text,
    ctaLink: data.advantages.cta.link,
    sectionImage: `${mediaBaseUrl}${data.advantages.sectionImage.url}`,
  };

  // Pass contact us data
  const contactUsData = {
    locale: locale,
    headerTitle: data.contactInfo.headerTitle,
    highlightedHeaderSubtitle: data.contactInfo.highlightedHeaderSubtitle,
    headerSubtitle: data.contactInfo.headerSubtitle,
    faqCtaText: data.contactInfo.faqCta.text,
    sectionBackgroundImage: `${mediaBaseUrl}${data.contactInfo.sectionBackgroundImage.url}`, // Ensure this is passed
    contactInfo: data.contactInfo.contactOptions.map((option: any) => ({
      icon: `${mediaBaseUrl}${option.icon.url}`,
      title: option.itemTitle,
      description: option.itemDescription,
      contact: option.contact || option.linkDetails.url,
      type: option.type,
      action: option.linkDetails.text,
      url: option.linkDetails.url,
    })),
  };

  return (
    <>
      {/* {heroImage && ( */}
      <Image
        src={heroData.heroImage}
        alt={heroData.heroImageAlt || ""}
        width={620}
        height={500}
        className="block w-full lg:hidden"
      />

      <div className="absolute w-full h-28 bg-primary-800 top-0 hidden lg:block"></div>
      <Hero {...heroData} />
      <div className="w-full px-4 py-[72px] bg-white lg:py-20 lg:px-10">
        <div className="flex flex-col items-center justify-start mx-auto max-w-7xl lg:gap-20">
          <Features features={features} />
          <div
            className="bg-[#EBEBEB] h-[1px] w-full hidden lg:block"
            role="separator"
            aria-hidden="true"
          ></div>
          <Steps {...stepsData} />
        </div>
      </div>
      <Statistics {...statisticsData} />
      <Advantages {...advantagesData} />
      <ContactUs {...contactUsData} />
    </>
  );
}
