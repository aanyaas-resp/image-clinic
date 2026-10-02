import type { BranchConfig } from "@/data/branches";
import Services from "@/sections/services/page";
import JourneySection from "@/sections/journey/page";
import ResultsGrid from "@/sections/results/page";
import BranchHero from "./BranchHero";
import BranchRealResult from "./BranchRealResult";
import BranchTestimonials from "./BranchTestimonials";
import BranchFaq from "./BranchFaq";
import BranchContact from "./BranchContact";

export default function BranchPage({ branch }: { branch: BranchConfig }) {
  const branchJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `https://www.imageclinicindia.co/${branch.slug}#clinic`,
    name: `Image Clinic ${branch.area}`,
    image: `https://www.imageclinicindia.co${branch.heroImage}`,
    url: `https://www.imageclinicindia.co/${branch.slug}`,
    telephone: branch.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.addressStreet,
      addressLocality: branch.addressLocality,
      addressRegion: branch.addressRegion,
      postalCode: branch.postalCode,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(branchJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BranchHero branch={branch} />
      <Services />
      <BranchRealResult branch={branch} />
      <JourneySection area={branch.area} />
      <ResultsGrid />
      <BranchTestimonials branch={branch} />
      <BranchFaq />
      <BranchContact branch={branch} />
    </main>
  );
}
