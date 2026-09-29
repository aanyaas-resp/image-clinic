import type { Metadata } from "next";
import BrandOverview from "@/components/Branches";
import Contact from "@/sections/contact/page";
import FAQPage from "@/sections/faq/page";
import Gallery from "@/sections/galary/page";
import Hero from "@/sections/hero/page";
import ResultsPage from "@/sections/results/page";
import Reviews from "@/sections/review/page";
import Services from "@/sections/services/page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandOverview />
      {/* <Services /> */}
      <Gallery />

      <div id="all-results">
        <ResultsPage />
      </div>

      {/* <Reviews googleReviewsUrl="https://www.google.com/maps/search/?api=1&query=Image+Clinic+Greater+Kailash+New+Delhi" /> */}
      {/* <Contact /> */}
      <FAQPage />
    </main>
  );
}
