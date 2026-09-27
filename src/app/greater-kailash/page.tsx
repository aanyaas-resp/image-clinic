

import type { Metadata } from "next";
import { BRANCHES } from "@/data/branches";
import DelhiHero from "./components/Hero";
import Services from "@/sections/services/page";
import RealResults from "./components/Realresult";
import JourneySection from "@/sections/journey/page";
import ResultsGrid from "@/sections/results/page";
import TestimonialsSection from "./components/Testinomials";
import FAQSection from "./components/Faq";
import ContactSection from "./components/Contact";



const branch = BRANCHES["greater-kailash"];

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: { canonical: `https://www.imageclinic.in/${branch.slug}` },
};

export default function GreaterKailashPage() {
  return (
    <>
      <DelhiHero />
      <Services />
      <RealResults />
      <JourneySection />
      <ResultsGrid />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      
    </>
  );
}