"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    question: "How do I know which treatment is right for me?",
    answer:
      "Every plan starts with a one-on-one consultation with our dermatologist, where we assess your skin or hair concerns and medical history before recommending a protocol tailored to you — nothing is one-size-fits-all.",
  },
  {
    question: "Are your treatments safe for Indian skin tones?",
    answer:
      "Yes. Our protocols are specifically calibrated for Indian skin, which is more prone to pigmentation and scarring if treated incorrectly, so every procedure factors this in from the start.",
  },
  {
    question: "Is there any downtime after treatment?",
    answer:
      "It depends on the procedure. Many of our treatments, like MediFacials, have zero downtime, while others such as deeper peels or laser sessions may involve mild redness for a day or two. We'll walk you through exactly what to expect during your consultation.",
  },
  {
    question: "How many sessions will I need to see results?",
    answer:
      "This varies by treatment and individual goals — some clients see visible improvement after a single session, while concerns like acne scarring or hair restoration typically need a series of sessions. Your doctor will outline a realistic timeline upfront.",
  },
  {
    question: "Do you offer consultations before booking a full treatment?",
    answer:
      "Absolutely. We encourage a consultation first so you can meet your doctor, ask questions, and get a personalized plan before committing to any treatment.",
  },
  {
    question: "What safety and hygiene standards do you follow?",
    answer:
      "All procedures are performed by qualified dermatologists using sterilized, medical-grade equipment in a clean, private clinic environment — patient safety and hygiene are non-negotiable at every step.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .fromTo(headingRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
          .fromTo(
            listRef.current?.children ?? [],
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 },
            0.25
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-parchment px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,161,59,0.10),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(156,107,46,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <p ref={eyebrowRef} className="eyebrow mx-auto mb-4 justify-center text-amber [&::before]:bg-amber/50">
            Frequently Asked Questions
          </p>
          <h2
            ref={headingRef}
            id="faq-heading"
            className="font-display text-[2rem] font-semibold leading-tight text-noir sm:text-4xl lg:text-5xl"
          >
            Your Questions, <span className="font-display italic text-amber">Answered</span>
          </h2>
        </div>

        <div ref={listRef} className="mt-14 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-noir/10 bg-noir/[0.03] transition-colors duration-300 data-[open=true]:border-gold/30"
                data-open={isOpen}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                >
                  <span className="font-sans text-base font-semibold text-noir sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/12 text-amber transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-gold text-noir-deep" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 font-sans text-sm leading-relaxed text-noir/65 sm:px-7 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center font-sans text-sm text-noir/60">
          Still have questions?{" "}
          <a href="#contact" className="font-semibold text-amber underline decoration-amber/40 underline-offset-4 hover:text-noir">
            Get in touch with us
          </a>{" "}
          and we&apos;ll be happy to help.
        </p>
      </div>
    </section>
  );
}
