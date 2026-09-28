"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    number: 1,
    title: "Book Your Priority Slot",
    description:
      "Skip the queue. Schedule your visit via our website or WhatsApp. Our patient relationship manager ensures a seamless, zero-wait experience upon arrival.",
  },
  {
    number: 2,
    title: "Expert Diagnosis",
    description:
      "Meet our lead dermatologist for a comprehensive skin and hair analysis. We use advanced diagnostic technology to craft a bespoke treatment protocol just for you.",
  },
  {
    number: 3,
    title: "Visible Transformation",
    description:
      "Experience precision-led treatments in our private suites. Walk out with visibly healthier skin or hair and a personalized post-care regime.",
  },
];

export default function JourneySection({ area }: { area: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .fromTo(headingRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1);

        STEPS.forEach((_, i) => {
          const stepStart = 0.35 + i * 0.28;
          tl.fromTo(
            stepRefs.current[i],
            { autoAlpha: 0, x: -18 },
            { autoAlpha: 1, x: 0, duration: 0.5 },
            stepStart
          );
          if (lineRefs.current[i]) {
            tl.fromTo(
              lineRefs.current[i],
              { scaleY: 0, transformOrigin: "top" },
              { scaleY: 1, duration: 0.4, ease: "power2.inOut" },
              stepStart + 0.15
            );
          }
        });

        tl.fromTo(ctaWrapRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2")
          .fromTo(
            imageColRef.current,
            { autoAlpha: 0, x: 24, scale: 0.97 },
            { autoAlpha: 1, x: 0, scale: 1, duration: 0.8 },
            0.2
          )
          .fromTo(
            badgeRef.current,
            { autoAlpha: 0, scale: 0.7, rotate: -8 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
            0.9
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-parchment px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      {/* soft ambient glow — dialed way down since this reads on a light surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,161,59,0.10),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(156,107,46,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Copy + steps column */}
        <div>
          <p ref={eyebrowRef} className="eyebrow mb-4 text-amber [&::before]:bg-amber/50">
            The Image Clinic Journey
          </p>
          <h2
            ref={headingRef}
            id="journey-heading"
            className="font-display text-[2rem] font-semibold leading-tight text-noir sm:text-4xl lg:text-5xl"
          >
            Your Path to
            <br />
            <span className="font-display italic text-amber">Radiance</span>
          </h2>

          <ol className="mt-12 space-y-10">
            {STEPS.map((step, i) => (
              <li
                key={step.number}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative flex gap-5 pl-0"
              >
                <div className="relative flex flex-col items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg font-semibold text-noir-deep shadow-sm shadow-gold/30">
                    {step.number}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span
                      ref={(el) => {
                        lineRefs.current[i] = el;
                      }}
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 border-l border-dashed border-noir/20"
                    />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="font-display text-lg font-semibold text-noir sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-noir/65 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div ref={ctaWrapRef} className="mt-10">
            <p className="font-sans text-sm font-semibold text-noir/80">Ready to start?</p>
            <a href="#contact" className="btn-pill-solid group mt-4 inline-flex">
              Start Your Journey
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>

        {/* Image column */}
        <div ref={imageColRef} className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-[0_16px_48px_rgba(43,32,22,0.16)] ring-1 ring-inset ring-noir/10 sm:rounded-[24px]">
            <Image
              src="/images/galarynew2.webp"
              alt={`Dermatologist performing a skin treatment at Image Clinic, ${area}`}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 45vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Trust badge — swap copy once you have a real, verifiable claim */}
          <div
            ref={badgeRef}
            className="absolute -bottom-8 -left-6 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gold text-center shadow-[0_12px_32px_rgba(20,16,11,0.25)] sm:h-32 sm:w-32"
          >
            <p className="font-display text-sm font-semibold text-noir-deep">Trusted in</p>
            <p className="font-display text-sm font-semibold text-noir-deep">{area}</p>
          </div>
        </div>
      </div>
    </section>
  );
}