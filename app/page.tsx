// page.tsx

import Features from "./(features)/Features";
import Hero from "./(hero)/Hero";

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

export default async function Home() {
  return (
    <>
      <Hero
        title={"Guaranteed salary - for you as a freelancer"}
        description={
          "We make invoicing without a company safe and easy for you as a freelancer. We take care of all the paperwork and guarantee salary so you can be independent without feeling lonely."
        }
        // cta= {  "Register assignments"; "supportingText?: string" }
        heroImage={"/hero/bg.png"}
        heroImageAlt={"small business owner standing in front of business"}
      />
      <section className="w-full px-4 py-[72px] bg-white lg:py-20 lg:px-10">
        <div className="flex flex-col items-center justify-start mx-auto max-w-7xl lg:gap-20">
          <Features features={features} />
          <div className=" bg-[#EBEBEB] h-[1px] w-full hidden lg:block"></div>
          {/* <Features features={features} /> */}
        </div>
      </section>
    </>
  );
}
