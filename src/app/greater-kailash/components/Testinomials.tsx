"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/ZnwzU5A4VfZ2dGRAA";

const REVIEWS = [
  {
    name: "Priya S.",
    timeAgo: "4 months ago",
    rating: 5,
    text:
      "The clinic is spotless and well run, and the staff is professional yet warm. What stood out most was how thoroughly the doctors explained the treatment before starting — their whole approach to skin and wellness felt genuinely considered.",
  },
  {
    name: "Humam Ansari",
    timeAgo: "2 months ago",
    rating: 5,
    text:
      "Walked out feeling like the best version of myself. The team stayed calm and clearly understood exactly what I was looking for — no over-selling, just the right guidance.",
  },
  {
    name: "Manju Hooda",
    timeAgo: "2 months ago",
    rating: 5,
    text:
      "Attended the launch event for their new Soprano machine and came away impressed by the hospitality. My consultation with Dr. Deboshri was excellent — informative and reassuring from the start.",
  },
  {
    name: "Kalua Kalua",
    timeAgo: "3 weeks ago",
    rating: 5,
    text:
      "Really appreciated the quality of care and how personalized the attention was throughout. An easy clinic to recommend to anyone considering treatment here.",
  },
  {
    name: "Seema Maggo",
    timeAgo: "2 months ago",
    rating: 5,
    text:
      "My doctor was patient and broke everything down clearly before we began. The treatment itself delivered real results — would recommend without hesitation.",
  },
  {
    name: "Shubhankar Banerjee",
    timeAgo: "3 weeks ago",
    rating: 5,
    text:
      "Came in for a hair transplant and the whole process — from the initial consult onward — was handled with real care and attention to detail.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
            scrollerRef.current?.children ?? [],
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
            0.25
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const distance = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-noir px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-gold-soft/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-[340px] w-[340px] rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p ref={eyebrowRef} className="eyebrow mb-4">
              Loved by Our Patients
            </p>
            <h2
              ref={headingRef}
              id="testimonials-heading"
              className="font-display text-[2rem] font-semibold leading-tight text-parchment sm:text-4xl lg:text-5xl"
            >
              Real Words, <span className="accent-italic">Real Trust</span>
            </h2>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-outline inline-flex items-center gap-2 text-sm"
          >
            <MapPin className="h-4 w-4" strokeWidth={2} />
            View All on Google
          </a>
        </div>

        {/* Rating summary strip */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-gold/15 bg-smoke px-5 py-4 sm:w-fit">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />
            ))}
          </div>
          <span className="font-sans text-sm font-semibold text-parchment">4.9 / 5</span>
          <span className="font-sans text-sm text-parchment/50">on Google Reviews</span>
        </div>

        {/* Scroll-snap review cards, reusing the site's services-scroll pattern */}
        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            onScroll={updateScrollState}
            className="services-scroll"
          >
            {REVIEWS.map((review) => (
              <a
                key={review.name}
                data-review-card
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-parchment/10 bg-smoke p-6 transition-colors duration-300 hover:border-gold/30"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-semibold text-gold-soft">
                    {initials(review.name)}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-parchment">{review.name}</p>
                    <p className="font-sans text-xs text-parchment/45">{review.timeAgo}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={0} />
                  ))}
                </div>

                <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-parchment/75">
                  {review.text}
                </p>

                <span className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft/80 transition-colors group-hover:text-gold-soft">
                  Read on Google →
                </span>
              </a>
            ))}
          </div>

          {/* Nav arrows — desktop only, mirrors scroll-nav-btn utility */}
          <div className="mt-6 hidden items-center justify-end gap-3 lg:flex">
            <button
              type="button"
              aria-label="Previous reviews"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
              className="scroll-nav-btn"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
              className="scroll-nav-btn"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}