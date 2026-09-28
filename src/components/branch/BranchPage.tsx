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
  return (
    <main>
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
