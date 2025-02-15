import { Metadata } from "next";
import Footer from "./components/(footer)/Footer";
import Navbar from "./components/(navbar)/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: "INVOICERY",
  description: "INVOICERY",
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const mediaBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch navbar data
  const navbarRes = await fetch(
    `${mediaBaseUrl}/api/navbar/1?locale=${locale}&draft=false&depth=1`
  );
  if (!navbarRes.ok) {
    throw new Error("Failed to fetch navbar data.");
  }
  const navbarData = await navbarRes.json();

  const navbarProps = {
    logo: {
      src: `${mediaBaseUrl}${navbarData.logo.url}`,
      alt: navbarData.logo.altText,
    },
    links: [
      { title: navbarData.contactUsText, route: "/contact" },
      { title: navbarData.faqText, route: "/faq" },
    ],
    languages: navbarData.languages.map((lang: any) => ({
      name: lang.name,
      code: lang.code,
    })),
    createAccountText: navbarData.createAccountText,
    signInText: navbarData.signInText,
    locale,
  };

  // Fetch footer data
  const footerRes = await fetch(
    `${mediaBaseUrl}/api/footer/1?locale=${locale}&draft=false&depth=1`
  );
  if (!footerRes.ok) {
    throw new Error("Failed to fetch footer data.");
  }
  const footerData = await footerRes.json();

  const footerProps = {
    logo: {
      src: `${mediaBaseUrl}${footerData.logo.url}`,
      alt: footerData.logo.altText,
    },
    sections: footerData.sections.map((section: any) => ({
      title: section.title,
      links: section.links.map((link: any) => ({
        href: link.href,
        name: link.name,
      })),
    })),
    contactInfo: footerData.contactInfo,
    socialMedia: footerData.socialMedia.map((social: any) => ({
      name: social.name,
      link: social.link,
    })),
    copyrightText: footerData.copyrightText,
  };

  return (
    <>
      <Navbar {...navbarProps} />
      <main>{children}</main>
      <Footer {...footerProps} />
    </>
  );
}
