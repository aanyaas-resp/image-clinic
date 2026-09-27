"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type ResultItem = { slug: string; image: string; alt: string };

// Use every file from the dedicated results folder so the gallery reflects the
// latest patient result set instead of older mixed assets.
const DEFAULT_RESULTS: ResultItem[] = [
  { slug: "result-1", image: "/result/result-1.png", alt: "Before and after transformation at Image Clinic" },
  { slug: "result-2", image: "/result/result-2.png", alt: "Before and after transformation at Image Clinic" },
  { slug: "result-3", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.38%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-4", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.39%20PM%20(2).jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-5", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.39%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-6", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.43%20PM%20(2).jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-7", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.43%20PM%20(3).jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-8", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.43%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-9", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.47%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-10", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.54%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-11", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.55%20PM%20(2).jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-12", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.59%20PM%20(2).jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-13", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.59%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-14", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.34.00%20PM.jpeg", alt: "Real skin result at Image Clinic" },
  { slug: "result-15", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.34.06%20PM%20(2).jpeg", alt: "Real skin result at Image Clinic" },
];

const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/imageclinicindia/";

// Only a curated preview shows on the page — the rest live on Instagram,
// which is exactly what the CTA below already points people to.
const DEFAULT_LIMIT = 8;

export default function ResultsGrid({
  results = DEFAULT_RESULTS,
  instagramUrl = DEFAULT_INSTAGRAM_URL,
  limit = DEFAULT_LIMIT,
}: {
  results?: ResultItem[];
  instagramUrl?: string;
  limit?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const visibleResults = results.slice(0, limit);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Heading: reveal on scroll into view
        gsap.fromTo(
          headingWrapRef.current,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: headingWrapRef.current, start: "top 85%" },
          }
        );

        // CTA: reveal on scroll into view
        gsap.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
          }
        );

        // Cards: batch so each tile animates in as it enters the viewport,
        // instead of all firing at once on mount (cheaper + better on
        // mobile, where this grid usually starts below the fold).
        if (gridRef.current) {
          gsap.set(gridRef.current.children, { autoAlpha: 0, y: 24, scale: 0.97 });

          ScrollTrigger.batch(gridRef.current.children, {
            start: "top 88%",
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
              }),
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [visibleResults.length]);

  return (
    <section id="results">
      <main
        ref={sectionRef}
        className="bg-noir px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3 justify-center sm:mb-4">Real Results</p>
            <h1 className="font-display text-2xl font-semibold leading-snug text-parchment sm:text-4xl lg:text-5xl">
              Our <span className="accent-italic">Results</span>
            </h1>
            <p className="mt-3 font-sans text-sm leading-relaxed text-parchment/70 sm:mt-4 sm:text-base">
              A snapshot of real transformations from Image Clinic in Kailash Garden and Gurugram. For the full collection, follow along on Instagram.
            </p>
          </div>

          <div
            ref={gridRef}
            className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
          >
            {visibleResults.length === 0 ? (
              <p className="col-span-full text-center text-sm text-parchment/60">
                Results coming soon.
              </p>
            ) : (
              visibleResults.map((item) => (
                <div
                  key={item.slug}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_10px_30px_-6px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-gold/10 transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(201,161,59,0.3)] sm:rounded-3xl"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-noir-deep/60 via-transparent to-transparent"
                  />
                </div>
              ))
            )}
          </div>

          
        </div>
      </main>
    </section>
  );
}