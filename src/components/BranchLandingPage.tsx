import Contact from "@/sections/contact/page";
import FAQPage from "@/sections/faq/page";
import Gallery from "@/sections/galary/page";
import Hero from "@/sections/hero/page";
import JourneySection from "@/sections/journey/page";
import RealResults from "@/sections/result/page";
import ResultsPage from "@/sections/results/page";
import Reviews from "@/sections/review/page";
import Services from "@/sections/services/page";
import { getBranchBySlug } from "@/data/branches";

const INSTAGRAM_URL = "https://www.instagram.com/imageclinicindia/";

export default function BranchLandingPage({ slug = "greater-kailash" }: { slug?: string }) {
  const branch = getBranchBySlug(slug);

  return (
    <main>
      <Hero branch={branch} />

      <div id="services">
        <Services />
      </div>

      <RealResults />

      <div id="journey">
        <JourneySection />
      </div>

      <Gallery />

      <div id="all-results">
        <ResultsPage instagramUrl={INSTAGRAM_URL} results={branch.results} />
      </div>

      <Reviews googleReviewsUrl={branch.googleReviewsUrl} />

      <div id="contact">
        <Contact branch={branch} />
      </div>

      <div id="faq">
        <FAQPage />
      </div>
    </main>
  );
}
