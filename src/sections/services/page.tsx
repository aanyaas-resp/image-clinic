// sections/services/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import BookingModal from "../../components/BookingModal";

type Treatment = {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  price?: string;
  image: string;
};

type Category = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  items: Treatment[];
};
const CATEGORIES: Category[] = [
  {
    id: "anti-ageing",
    tabLabel: "Anti-Ageing",
    eyebrow: "Clinical Expertise",
    heading: "Anti-Ageing",
    subheading:
      "Injectable and regenerative protocols that firm, hydrate and restore facial definition over time.",
    items: [
      { slug: "botox", image: "/services/fillers-compressed.jpg", label: "BOTOX", title: "Botox", tagline: "SMOOTH FINE LINES", description: "Botox softens expression lines and helps create a smoother, refreshed look while preserving natural facial movement." },
      { slug: "mifu", image: "/services2/profhilo-compressed.jpg", label: "MIFU", title: "MIFU", tagline: "LIFT & TIGHTEN", description: "MIFU delivers a lifting, tightening effect to rejuvenate the skin with minimal downtime and long-lasting definition." },
      { slug: "sculptura", image: "/services2/threads-compressed.jpg", label: "SCULPTURA", title: "Sculptura", tagline: "BODY CONTOURING", description: "Sculptura helps refine and contour the silhouette for a more sculpted, balanced profile and smoother look." },
      { slug: "skin-booster", image: "/services2/skinbooster-compressed.jpg", label: "SKIN BOOSTER", title: "Skin Booster", tagline: "DEEP HYDRATION", description: "Injectable hyaluronic acid boosters that hydrate from within for plump, smooth and naturally glowing skin." },
      { slug: "profhilo", image: "/services/propfilo-compressed.jpg", label: "PROFHILO", title: "Profhilo", tagline: "BIO-REMODELLING", description: "A next-generation bio-remodelling injectable that improves skin laxity, hydration and overall firmness." },
    ],
  },
  {
    id: "acne",
    tabLabel: "Acne",
    eyebrow: "Clinical Expertise",
    heading: "Acne",
    subheading:
      "Targeted acne and skin renewal treatments to calm active breakouts and improve long-term texture.",
    items: [
      { slug: "acne-acne-scar", image: "/services/acne-compressed.jpg", label: "ACNE & ACNE SCAR", title: "Acne & Acne Scar", tagline: "CLEARER, SMOOTHER SKIN", description: "Targeted clinical protocols that calm active breakouts and resurface acne scarring for a clearer, more even complexion." },
      { slug: "dermapen-4", image: "/services/dermapen4-compressed.jpg", label: "DERMAPEN 4", title: "Dermapen 4", tagline: "MICRONEEDLING", description: "Advanced medical microneedling that stimulates collagen production to refine texture, scarring and overall skin quality." },
      { slug: "whitening-pigmentation", image: "/services/skinpigm-compressed.jpg", label: "WHITENING & PIGMENTATION", title: "Whitening & Pigmentation", tagline: "EVEN, RADIANT TONE", description: "Medical-grade brightening combined with precision laser and peel therapy to fade pigmentation and even out skin tone." },
      { slug: "korean-glass-skin", image: "/services/koreanglass-compressed.jpg", label: "KOREAN GLASS SKIN", title: "Korean Glass Skin", tagline: "DEWY, LUMINOUS FINISH", description: "A layered glow-boosting protocol that hydrates, refines pores and evens tone for that signature translucent, glass-like skin." },
      { slug: "hydrafacial", image: "/services/hydrafacial-compressed.jpg", label: "HYDRAFACIAL", title: "HydraFacial", tagline: "DEEP CLEANSE", description: "A three-step medical-grade facial that clears out impurities and locks in hydration for instantly brighter skin." },
    ],
  },
  {
    id: "hair-treatment",
    tabLabel: "Hair Treatment",
    eyebrow: "Clinical Expertise",
    heading: "Hair Treatment",
    subheading:
      "Advanced scalp therapies built to reactivate follicles and support thicker, healthier regrowth.",
    items: [
      { slug: "prp-therapy", image: "/services2/prptheropy-compressed.jpg", label: "PRP THERAPY", title: "PRP Therapy", tagline: "NATURAL REGROWTH", description: "Platelet-rich plasma therapy that harnesses your own growth factors to stimulate natural, healthier hair regrowth." },
      { slug: "exosomes", image: "/services2/exosomes-compressed.jpg", label: "EXOSOMES", title: "Exosomes", tagline: "CELLULAR REGROWTH", description: "Advanced exosome therapy that signals dormant follicles to reactivate, supporting thicker, healthier regrowth." },
      { slug: "hairfall-treatment", image: "/services2/hairfalltreatment-compressed.jpg", label: "HAIRFALL TREATMENT", title: "Hairfall Treatment", tagline: "REDUCE SHEDDING", description: "A targeted protocol that addresses the root causes of hairfall to reduce shedding and support fuller-looking hair." },
      { slug: "dandruff-control", image: "/services2/dandruff-compressed.jpg", label: "DANDRUFF CONTROL", title: "Dandruff Control", tagline: "CALM, CLEAR SCALP", description: "Medical-grade scalp therapy that targets flaking and irritation for a calmer, healthier scalp." },
      { slug: "hair-strengthening", image: "/services2/strengthening-compressed.jpg", label: "STRENGTHENING", title: "Hair Strengthening", tagline: "FORTIFY FROM ROOT", description: "Nutrient-infused strengthening therapy that fortifies hair from the root, reducing breakage and improving density." },
    ],
  },
];

// Flattened once, at module scope — used for the crawler-visible summary
// and JSON-LD below, so it isn't rebuilt on every render.
const ALL_TREATMENTS = CATEGORIES.flatMap((c) => c.items.map((t) => ({ ...t, category: c.tabLabel })));

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: ALL_TREATMENTS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MedicalProcedure",
      name: t.title,
      description: t.description,
      category: t.category,
    },
  })),
};

function useActiveOnCenter<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const els = refs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = els.indexOf(entry.target as T);
          if (idx === -1) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(idx);
          }
        });
      },
      { threshold: [0.6], rootMargin: "0px" }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { refs, activeIndex };
}

function TreatmentRow({
  items,
  onBook,
}: {
  items: Treatment[];
  onBook: (title: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { refs: activeRefs, activeIndex } = useActiveOnCenter<HTMLDivElement>(items.length);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function setRefs(el: HTMLDivElement | null, i: number) {
    cardRefs.current[i] = el;
    activeRefs.current[i] = el;
  }

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.07 }
      );
    }, rowRef);

    return () => ctx.revert();
  }, [items]);

  function updateScrollButtons() {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollButtons();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function scrollByCard(direction: "left" | "right") {
    const el = rowRef.current;
    if (!el) return;
    const firstCard = cardRefs.current[0];
    const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={rowRef} className="services-scroll">
        {items.map((t, i) => (
          <div
            key={t.slug}
            ref={(el) => setRefs(el, i)}
            className={`service-card group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_10px_30px_-6px_rgba(94,59,21,0.25)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(94,59,21,0.45)] ${
              activeIndex === i ? "is-active" : ""
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={t.image}
                alt={`${t.title} at Image Clinic, Kailash Garden, Delhi`}
                fill
                sizes="(max-width: 1024px) 78vw, 25vw"
                className="service-media-img object-cover"
              />
            </div>

            {/* Resting-state gradient: only strong enough at the very
                bottom to keep the label legible — most of the photo
                stays visible instead of getting washed out. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/75 via-chocolate-deep/10 to-transparent"
            />

            <div className="service-label absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/90">{t.label}</p>
               
              </div>
            </div>

            {/* Hover / active overlay: eased back from a near-solid fill
                to a gradient that stays dark where the text sits (bottom
                ~2/3) but lets the top of the photo show through. */}
            <div className="service-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-chocolate-deep/95 via-chocolate-deep/85 to-chocolate-deep/15 p-6">
              <h3 className="font-display text-xl font-semibold leading-snug text-cream">
                {t.title.replace(/ LHR Treatment$/, "")}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-bronze">
                {t.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80 line-clamp-4">{t.description}</p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onBook(t.title)}
                  className="rounded-full bg-bronze px-4 py-2 text-xs font-semibold text-cream shadow-md shadow-chocolate-deep/30 transition-transform duration-200 hover:scale-[1.04] hover:bg-chocolate active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bronze"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll to previous treatments"
          className="scroll-nav-btn"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          disabled={!canScrollRight}
          aria-label="Scroll to more treatments"
          className="scroll-nav-btn"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const headingWrapRef = useRef<HTMLDivElement>(null);

  const current = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0],
    [activeCategory]
  );

  function openBooking(title: string) {
    setPresetService(title);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (!headingWrapRef.current) return;
    gsap.fromTo(
      headingWrapRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <section id="services" className="bg-ivory px-6 py-24 sm:px-10 lg:px-16">
      {/* Structured data — lets search engines see every treatment even
          though the UI only ever renders one category's cards at a time. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />

      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 justify-center">{current.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-chocolate-deep sm:text-4xl lg:text-5xl">
            {current.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="accent-italic">{current.heading.split(" ").slice(-1)}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-chocolate-deep/70">{current.subheading}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div
            role="tablist"
            aria-label="Treatment categories"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {CATEGORIES.map((c) => {
              const isActive = c.id === activeCategory;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${c.id}`}
                  onClick={() => setActiveCategory(c.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 sm:text-sm ${
                    isActive
                      ? "border-chocolate bg-chocolate text-cream shadow-md shadow-chocolate/25"
                      : "border-chocolate-deep/20 bg-transparent text-chocolate-deep/70 hover:border-bronze/50 hover:text-chocolate-deep"
                  }`}
                >
                  {c.tabLabel}
                </button>
              );
            })}
          </div>

          
        </div>

        <div
          className="mt-14"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          <TreatmentRow key={current.id} items={current.items} onBook={openBooking} />
        </div>

        {/* Visually hidden, crawler/screen-reader visible list of every
            treatment across all categories — keeps full service coverage
            indexable without disturbing the tabbed UI. */}
        <div className="sr-only">
          <h3>All treatments at Image Clinic, Kailash Garden and Gurugram</h3>
          <ul>
            {ALL_TREATMENTS.map((t) => (
              <li key={t.slug}>
                {t.title} ({t.category}): {t.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        presetService={presetService}
        onClose={() => {
          setIsModalOpen(false);
          setPresetService(undefined);
        }}
      />
    </section>
  );
}