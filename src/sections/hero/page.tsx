import Image from "next/image";
import { Star, ShieldCheck, Award, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { HOME_BRAND } from "@/data/branches";

const BADGES = [
  { icon: Star, label: "4.9/5 Google Reviews" },
  { icon: ShieldCheck, label: "700+ Happy Clients" },
  { icon: Award, label: HOME_BRAND.heroBadge },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-noir">
      {/* LCP image. The ivory wash keeps the page light while the clinic still shows through. */}
      <Image
        src={HOME_BRAND.heroImage}
        alt={HOME_BRAND.heroAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-noir/95 via-noir/82 to-noir/95"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_15%_25%,rgba(184,134,58,0.16),transparent_60%),radial-gradient(ellipse_50%_45%_at_88%_80%,rgba(217,178,107,0.2),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-28 text-center sm:px-10 lg:px-16">
        <p className="rise-in eyebrow mb-5 rounded-full border border-gold/30 bg-cream-white/80 px-5 py-2 [--d:50ms]">
          {HOME_BRAND.name}
        </p>

        <h1 className="rise-in font-display text-4xl font-semibold leading-[1.15] text-parchment sm:text-5xl lg:text-6xl [--d:120ms]">
          <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text italic text-transparent">
            Best
          </span>{" "}
          Hair &amp; Skin Treatment
          <br />
          in Image Clinic
        </h1>

        <p className="rise-in mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-parchment/75 sm:text-lg [--d:200ms]">
          At {HOME_BRAND.name}, we combine doctor-led expertise, advanced aesthetic care, and
          personalised treatment plans to help you look and feel your best.
        </p>

        <div className="rise-in mt-8 flex flex-wrap items-center justify-center gap-5 [--d:280ms]">
          <a href="#clinics" className="btn-pill-solid group px-8 py-3.5 sm:px-9 sm:py-4 sm:text-base">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            <span>Our Clinics</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.25}
            />
          </a>

          <a href="#services" className="btn-pill-outline group px-8 py-3.5 sm:px-9 sm:py-4 sm:text-base">
            <Sparkles
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={2.25}
            />
            <span>Our Treatments</span>
          </a>
        </div>

        <div className="rise-in mt-8 flex flex-wrap items-center justify-center gap-3 [--d:360ms]">
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-gold/25 bg-cream-white/80 px-4 py-2 text-[13px] text-parchment/85 sm:text-sm"
            >
              <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg aria-hidden="true" className="hero-curve" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,25 C125,-5 375,-5 500,25 L500,60 L0,60 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
