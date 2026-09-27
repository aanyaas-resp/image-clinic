import BrandOverview from "@/components/BrandOverview";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import Contact from "@/sections/contact/page";
import FAQPage from "@/sections/faq/page";
import Gallery from "@/sections/galary/page";
import Hero from "@/sections/hero/page";
import JourneySection from "@/sections/journey/page";
import RealResults from "@/sections/result/page";
import ResultsPage from "@/sections/results/page";
import Reviews from "@/sections/review/page";
import Services from "@/sections/services/page";

const INSTAGRAM_URL = "https://www.instagram.com/imageclinicindia/";

export default function Home() {
  return (
    <main>
      <Hero />

      <BrandOverview />

      <div id="services">
        <Services />
      </div>

      {/* RealResults already renders <section id="results"> internally */}
      <RealResults />

      <div id="journey">
        <JourneySection />
      </div>

      {/* Gallery already renders <section id="gallery"> internally */}
      <Gallery />

      <div id="all-results">
        <ResultsPage instagramUrl={INSTAGRAM_URL} />
      </div>
      <Reviews googleReviewsUrl="https://www.google.com/maps/search/?api=1&query=Image+Clinic+Greater+Kailash+New+Delhi" />

      <div id="contact">
        <Contact />
      </div>

      <div id="faq">
        <FAQPage />
      </div>
    </main>
  );
}