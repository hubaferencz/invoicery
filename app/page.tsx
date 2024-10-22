// page.tsx

import Hero from './(hero)/Hero';


export default async function Home() {


  return (
    <>
      <Hero
        title={"Guaranteed salary - for you as a freelancer"}
        description={"We make invoicing without a company safe and easy for you as a freelancer. We take care of all the paperwork and guarantee salary so you can be independent without feeling lonely."}
        // cta= {  "Register assignments"; "supportingText?: string" } 
        heroImage={"/hero/bg.png"}
        heroImageAlt={"small business owner standing in front of business"}
      />
    </>
  );
}
