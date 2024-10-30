import ContactUs from "../(contact-us)/ContactUs";
import Faq from "./Faq";
import Hero from "./Hero";

const contactInfo = [
  {
    icon: "phone",
    title: "You can reach us by phone",
    description:
      "We help you by phone, email and chat weekdays 09:00-17:00. The chat is also open on Sundays 15:00-20:00.",
    contact: "0771-151000",
    type: "phone",
    action: null,
  },
  {
    icon: "phone-volume",
    title: "Do you want to be called",
    description: "Leave your name and phone number and we'll call you.",
    contact: "link",
    type: "link",
    action: "Get a call",
  },
  {
    icon: "envelope",
    title: "Feel free to ask a question",
    description: "Feel free to email us, we normally respond within 24 hours.",
    contact: "info@frilansfinans.se",
    type: "email",
    action: null,
  },
  {
    icon: "calendar-circle-user",
    title: "Interested in our solutions?",
    description: "Book a physical or video meeting at a time that suits you.",
    contact: "link",
    type: "link",
    action: "Book a meeting",
  },
];

export default async function Contact() {
  return (
    <>
      <div
        className="absolute w-full h-28 bg-[#04567D] top-0 hidden lg:block"
        aria-hidden="true"
      ></div>
      <Hero
        title="Contact us"
        description="Do you have questions or need help with our services? Do not hesitate to contact us! Our dedicated team is here to listen to your needs and provide you with the support you need. Fill out the form below or call us directly for quick help. We value your time and always strive to provide you with the best possible service."
        heroImage="/contact-page.png"
        heroImageAlt="Small business owner standing in front of business"
      />
      <ContactUs contactInfo={contactInfo} />
      <Faq />
    </>
  );
}
