// page.tsx

import Features from "./(features-first)/Features";
import Advantages from "./(advantages)/Advantages";
import Hero from "./(hero)/Hero";
import Statistics from "./(statistics)/Statistics";
import Steps from "./(steps)/Steps";
import ContactUs from "./(contact-us)/ContactUs";

const features = [
  {
    rank: 1,
    description: "Fastest payout, no hidden fees.",
    icon: "money",
  },
  {
    rank: 2,
    description: "Authorized, with us your money is safe.",
    icon: "safe",
  },
  {
    rank: 3,
    description: "Our retention 6%, less tax and employer contribution.",
    icon: "discount",
  },
  {
    rank: 4,
    description: "150,000 self-employed and 1 million invoices.",
    icon: "connect",
  },
];

const steps = [
  {
    rank: 1,
    title: "You find missions",
    subtitle: "Register the assignment",
    description:
      "Start by registering your upcoming assignment. It's free and no obligation but allows Invoicery to verify the customer and accept the assignment agreement.",
    image: "/steps/1.png",
  },
  {
    rank: 2,
    title: "Invoicery accepts the assignment",
    subtitle: "Billing automatically",
    description:
      "When Invoicery has accepted the assignment, invoices are automatically sent to the customer and we handle all paperwork such as payment of tax, employer's contribution and pension.",
    image: "/steps/2.png",
  },
  {
    rank: 3,
    title: "You get a guaranteed salary",
    subtitle: "Taxed & cleared every month",
    description:
      "Invoicery pays your salary every month on the 25th, as with regular employment. You can sit back and enjoy complete security.",
    image: "/steps/3.png",
  },
];

const stats = [
  { start: 100, finish: 1500, title: "umbrellas (2023)" },
  { start: 200, finish: 5000, title: "full time freelancers" },
  {
    start: 0,
    finish: 12,
    title: "costumers have paid an invoice",
    measurement: "biljon",
  },
];

const advantages = [
  {
    rank: 1,
    title: "Guaranteed salary.",
    subtitle: "The 25th of every month",
    description: "Fastest payout, no hidden fees.",
    icon: "wallet",
  },
  {
    rank: 2,
    title: "Secure self-employment",
    subtitle: "A solid and good business",
    description:
      "Authorized self-employment company, it ensures a solid and good business.",
    icon: "verified",
  },
  {
    rank: 3,
    title: "Fast support team",
    subtitle: "Always available to you",
    description: "Customer support is available to answer all your questions.",
    icon: "support",
  },
];

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

export default async function Home() {
  return (
    <>
    <div className="absolute w-full h-28 bg-primary-800 top-0 hidden lg:block"></div>
      <Hero
        title={"Guaranteed salary - for you as a freelancer"}
        description={
          "We make invoicing without a company safe and easy for you as a freelancer. We take care of all the paperwork and guarantee salary so you can be independent without feeling lonely."
        }
        // cta= {  "Register assignments"; "supportingText?: string" }
        heroImage={"/hero/bg.png"}
        heroImageAlt={"small business owner standing in front of business"}
      />
      <div className="w-full px-4 py-[72px] bg-white lg:py-20 lg:px-10">
        <div className="flex flex-col items-center justify-start mx-auto max-w-7xl lg:gap-20">
          <Features features={features} />
          <div className=" bg-[#EBEBEB] h-[1px] w-full hidden lg:block"></div>
          <Steps steps={steps} />
        </div>
      </div>
      <Statistics stats={stats} />

      <Advantages advantages={advantages} />
      <ContactUs contactInfo={contactInfo} />
    </>
  );
}
