"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

type Treatment = {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  price?: string;
};

type Category = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  items: Treatment[];
};

/* All images live in ONE folder: /public/services/<slug>.webp
   To change a photo, replace the file with the same name. */
const imageFor = (slug: string) => `/services/${slug}.webp`;

const CATEGORIES: Category[] = [
  {
    id: "anti-ageing",
    tabLabel: "Anti-Ageing",
    eyebrow: "Clinical Expertise",
    heading: "Anti-Ageing",
    subheading:
      "Injectable and regenerative protocols that firm, hydrate and restore facial definition over time.",
    items: [
      { slug: "botox", label: "BOTOX", title: "Botox", tagline: "SMOOTH FINE LINES", description: "Botox softens expression lines and helps create a smoother, refreshed look while preserving natural facial movement." },
      { slug: "hifu", label: "HIFU", title: "HIFU", tagline: "LIFT & TIGHTEN", description: "HIFU uses focused ultrasound energy to lift and tighten the skin with minimal downtime and long-lasting definition." },
      { slug: "sculptura", label: "SCULPTURA", title: "Sculptura", tagline: "BODY CONTOURING", description: "Sculptura helps refine and contour the silhouette for a more sculpted, balanced profile and smoother look." },
      { slug: "skin-booster", label: "SKIN BOOSTER", title: "Skin Booster", tagline: "DEEP HYDRATION", description: "Injectable hyaluronic acid boosters that hydrate from within for plump, smooth and naturally glowing skin." },
      { slug: "profhilo", label: "PROFHILO", title: "Profhilo", tagline: "BIO-REMODELLING", description: "A next-generation bio-remodelling injectable that improves skin laxity, hydration and overall firmness." },
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
      { slug: "acne-acne-scar", label: "ACNE & ACNE SCAR", title: "Acne & Acne Scar", tagline: "CLEARER, SMOOTHER SKIN", description: "Targeted clinical protocols that calm active breakouts and resurface acne scarring for a clearer, more even complexion." },
      { slug: "dermapen-4", label: "DERMAPEN 4", title: "Dermapen 4", tagline: "MICRONEEDLING", description: "Advanced medical microneedling that stimulates collagen production to refine texture, scarring and overall skin quality." },
      { slug: "whitening-pigmentation", label: "WHITENING & PIGMENTATION", title: "Whitening & Pigmentation", tagline: "EVEN, RADIANT TONE", description: "Medical-grade brightening combined with precision laser and peel therapy to fade pigmentation and even out skin tone." },
      { slug: "korean-glass-skin", label: "KOREAN GLASS SKIN", title: "Korean Glass Skin", tagline: "DEWY, LUMINOUS FINISH", description: "A layered glow-boosting protocol that hydrates, refines pores and evens tone for that signature translucent, glass-like skin." },
      { slug: "hydrafacial", label: "HYDRAFACIAL", title: "HydraFacial", tagline: "DEEP CLEANSE", description: "A three-step medical-grade facial that clears out impurities and locks in hydration for instantly brighter skin." },
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
      { slug: "prp-therapy", label: "PRP THERAPY", title: "PRP Therapy", tagline: "NATURAL REGROWTH", description: "Platelet-rich plasma therapy that harnesses your own growth factors to stimulate natural, healthier hair regrowth." },
      { slug: "exosomes", label: "EXOSOMES", title: "Exosomes", tagline: "CELLULAR REGROWTH", description: "Advanced exosome therapy that signals dormant follicles to reactivate, supporting thicker, healthier regrowth." },
      { slug: "hairfall-treatment", label: "HAIRFALL TREATMENT", title: "Hairfall Treatment", tagline: "REDUCE SHEDDING", description: "A targeted protocol that addresses the root causes of hairfall to reduce shedding and support fuller-looking hair." },
      { slug: "dandruff-control", label: "DANDRUFF CONTROL", title: "Dandruff Control", tagline: "CALM, CLEAR SCALP", description: "Medical-grade scalp therapy that targets flaking and irritation for a calmer, healthier scalp." },
      { slug: "hair-strengthening", label: "STRENGTHENING", title: "Hair Strengthening", tagline: "FORTIFY FROM ROOT", description: "Nutrient-infused strengthening therapy that fortifies hair from the root, reducing breakage and improving density." },
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

/* Shows the photo; if a file is missing it shows a clean branded block
   instead of a broken-image icon. */
function CardImage({ t }: { t: Treatment }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/25 via-smoke to-gold-soft/30 p-4 text-center">
        <span className="font-display text-xl font-semibold text-amber">{t.title}</span>
      </div>
    );
  }

  return (
    <>
      <Image
        src={imageFor(t.slug)}
        alt={`${t.title} treatment at Image Clinic`}
        fill
        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, (max-width: 1280px) 31vw, 23vw"
        className="service-media-img object-cover"
        onError={() => setFailed(true)}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-noir-deep/40 via-transparent to-transparent"
      />
    </>
  );
}

function TreatmentGrid({ items }: { items: Treatment[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <>
      {/* Phones: swipeable row with the next card peeking in.
          Tablet and up: wrapped grid, the last row is centred. */}
      <div
        ref={gridRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:snap-none sm:flex-wrap sm:justify-center sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6"
      >
        {items.map((t, i) => (
          <div
            key={t.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="service-card group flex h-[410px] w-[78vw] max-w-[300px] flex-none snap-center flex-col overflow-hidden rounded-3xl border border-parchment/10 bg-smoke shadow-[0_10px_30px_-8px_rgba(43,32,22,0.22)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-12px_rgba(184,134,58,0.4)] sm:h-[440px] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
          >
            {/* Image — top 58% of the card */}
            <div className="relative h-[58%] w-full overflow-hidden">
              <CardImage t={t} />
            </div>

            {/* Text — bottom 42% of the card */}
            <div className="flex flex-1 flex-col justify-center px-5 py-4">
              <h3 className="font-display text-xl font-semibold leading-snug text-parchment">
                {t.title}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-amber">
                {t.tagline}
              </p>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-parchment/70">
                {t.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-1 text-center text-xs tracking-wide text-parchment/50 sm:hidden">
        Swipe to see more &rarr;
      </p>
    </>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const headingWrapRef = useRef<HTMLDivElement>(null);

  const current = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0],
    [activeCategory]
  );

  useEffect(() => {
    if (!headingWrapRef.current) return;
    gsap.fromTo(
      headingWrapRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <section id="services" className="bg-noir px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      {/* Structured data — lets search engines see every treatment even
          though the UI only ever renders one category's cards at a time. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />

      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3 justify-center sm:mb-4">{current.eyebrow}</p>
          <h2 className="font-display text-[2rem] font-semibold leading-snug text-parchment sm:text-4xl lg:text-5xl">
            {current.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="accent-italic">{current.heading.split(" ").slice(-1)}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-parchment/70 sm:mt-4 sm:max-w-none sm:text-base">
            {current.subheading}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-center sm:mt-8">
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
                  className={`min-h-10 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200 sm:px-5 sm:text-sm ${
                    isActive
                      ? "border-gold bg-gold text-noir-deep shadow-md shadow-gold/25"
                      : "border-parchment/20 bg-transparent text-parchment/70 hover:border-gold-soft/50 hover:text-parchment"
                  }`}
                >
                  {c.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="mt-9 sm:mt-14"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          <TreatmentGrid key={current.id} items={current.items} />
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
    </section>
  );
}