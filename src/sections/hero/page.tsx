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
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-chocolate-deep">
      {/* LCP image */}
      <Image
        src={HOME_BRAND.heroImage}
        alt={HOME_BRAND.heroAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark gradient, left to right on every screen size.
          Kept dark all the way across so the centred text stays readable.
          (chocolate-deep is dark; "noir" in your theme is the light ivory colour.) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-chocolate-deep/65 via-chocolate-deep/55 to-chocolate-deep/65 lg:from-chocolate-deep/50 lg:via-chocolate-deep/50 lg:to-chocolate-deep/55"
      />
      {/* Soft gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_15%_25%,rgba(184,134,58,0.18),transparent_60%),radial-gradient(ellipse_50%_45%_at_88%_80%,rgba(217,178,107,0.14),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-10 sm:pt-40 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="rise-in eyebrow mb-4 text-gold-soft [--d:50ms]">{HOME_BRAND.name}</p>

          <h1 className="rise-in font-display text-[2.75rem] font-semibold leading-[1.1] text-cream-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl [--d:120ms]">
            <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text pr-1 italic text-transparent">
              Best
            </span>{" "}
            Hair &amp; Skin Treatment
            <br />
            in Image Clinic
          </h1>

          <p className="rise-in mx-auto mt-5 max-w-[19rem] font-sans text-[15px] leading-relaxed text-cream-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:max-w-sm sm:text-base [--d:200ms]">
            Doctor-led expertise, advanced aesthetic care and personalised treatment plans to
            help you look and feel your best.
          </p>

          {/* Minimal buttons: side by side, only as wide as their content */}
          <div className="rise-in mt-6 flex flex-wrap items-center justify-center gap-2.5 [--d:280ms]">
            <a href="#clinics" className="btn-pill-solid group !px-5 !py-2.5 !text-[13px]">
              <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              <span>Our Clinics</span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.25}
              />
            </a>

            <a
              href="#services"
              className="btn-pill-outline group !border !border-cream-white/60 !px-4 !py-2.5 !text-[13px] text-cream-white hover:border-cream-white hover:bg-cream-white/10"
            >
              <Sparkles
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-12"
                strokeWidth={2.25}
              />
              <span>Our Treatments</span>
            </a>
          </div>

          
        </div>
      </div>

      <svg aria-hidden="true" className="hero-curve" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,25 C125,-5 375,-5 500,25 L500,60 L0,60 Z" fill="currentColor" />
      </svg>
    </section>
  );
}