import BrandOverview from "@/components/Branches";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import Contact from "@/sections/contact/page";
import FAQPage from "@/sections/faq/page";
import Gallery from "@/sections/galary/page";
import Hero from "@/sections/hero/page";
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

      <FloatingContactButtons />
    </main>
  );
}