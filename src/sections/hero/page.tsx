"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { HOME_BRAND } from "@/data/branches";

/* ------------------------------------------------------------------ */
/*  Liquid-glass button (shadcn-style sizing, glass surface)           */
/*  - h-11 (44px) touch target, fully rounded, consistent padding      */
/*  - sheen follows the cursor, button gently leans toward it          */
/*  - press feedback works on touch too; hover effects are mouse-only  */
/* ------------------------------------------------------------------ */

type GlassButtonProps = {
  href: string;
  variant: "primary" | "ghost";
  icon: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
};

const GLASS_BASE =
  "group relative isolate inline-flex h-11 w-full select-none items-center justify-center gap-2 " +
  "overflow-hidden whitespace-nowrap rounded-full px-6 font-sans text-sm font-medium tracking-wide " +
  "text-cream-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)] " +
  "backdrop-blur-xl backdrop-saturate-150 outline-none " +
  "[translate:var(--tx,0px)_var(--ty,0px)] " +
  "transition-[transform,translate,scale,box-shadow,background-color] duration-300 ease-out " +
  "active:scale-[0.96] " +
  "focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate-deep " +
  "motion-reduce:transition-none motion-reduce:[translate:none] " +
  "sm:w-auto sm:min-w-[11.5rem]";

const GLASS_VARIANTS = {
  primary:
    "bg-[linear-gradient(140deg,rgba(217,178,107,0.55),rgba(184,134,58,0.30))] " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,236,200,0.35),0_10px_30px_-10px_rgba(184,134,58,0.65)] " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_0_0_1px_rgba(255,236,200,0.5),0_14px_36px_-10px_rgba(217,178,107,0.85)]",
  ghost:
    "bg-white/10 hover:bg-white/[0.16] " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.22),0_10px_30px_-12px_rgba(0,0,0,0.6)] " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,255,255,0.35),0_14px_36px_-12px_rgba(0,0,0,0.7)]",
} as const;

function GlassButton({ href, variant, icon, trailing, children }: GlassButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    // Small "magnetic" lean toward the cursor
    el.style.setProperty("--tx", `${((x - r.width / 2) * 0.07).toFixed(2)}px`);
    el.style.setProperty("--ty", `${((y - r.height / 2) * 0.16).toFixed(2)}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`${GLASS_BASE} ${GLASS_VARIANTS[variant]}`}
    >
      {/* Top gloss, the "liquid" highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0.5 -z-10 h-1/2 rounded-full bg-gradient-to-b from-white/35 to-transparent opacity-70"
      />
      {/* Cursor-following sheen (mouse only) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 bg-[radial-gradient(110px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.4),transparent_70%)]"
      />
      {icon}
      <span>{children}</span>
      {trailing}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  // Pointer-reactive spotlight + slight image parallax (mouse only, rAF-throttled,
  // updates CSS variables directly so React never re-renders).
  const handleMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = sectionRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--px", ((px - 0.5) * 2).toFixed(3));
      el.style.setProperty("--py", ((py - 0.5) * 2).toFixed(3));
    });
  };

  const handleLeave = () => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <section
      ref={sectionRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="group/hero relative isolate flex min-h-[100svh] items-center overflow-hidden bg-chocolate-deep"
    >
      {/* LCP image, slightly oversized so the parallax never shows an edge */}
      <div
        className="absolute inset-0 scale-110 transition-[transform,translate] duration-700 ease-out will-change-transform [translate:calc(var(--px,0)*-14px)_calc(var(--py,0)*-10px)] motion-reduce:transition-none motion-reduce:[translate:none]"
      >
        <Image
          src={HOME_BRAND.heroImage}
          alt={HOME_BRAND.heroAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark gradient, left to right on every screen size.
          Kept dark all the way across so the centred text stays readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-chocolate-deep/65 via-chocolate-deep/55 to-chocolate-deep/65 lg:from-chocolate-deep/50 lg:via-chocolate-deep/50 lg:to-chocolate-deep/55"
      />

      {/* Soft gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_15%_25%,rgba(184,134,58,0.18),transparent_60%),radial-gradient(ellipse_50%_45%_at_88%_80%,rgba(217,178,107,0.14),transparent_60%)]"
      />

      {/* Cursor spotlight: only on devices that actually hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 [@media(hover:hover)]:block group-hover/hero:opacity-100 motion-reduce:hidden bg-[radial-gradient(460px_circle_at_var(--mx,50%)_var(--my,40%),rgba(217,178,107,0.22),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-10 sm:pb-24 sm:pt-40 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="rise-in eyebrow mb-4 text-gold-soft [--d:50ms]">{HOME_BRAND.name}</p>

          <h1 className="rise-in font-display text-[clamp(2.15rem,9vw,3.5rem)] font-semibold leading-[1.05] text-cream-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl [--d:120ms]">
            <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text pr-1 italic text-transparent">
              Best
            </span>{" "}
            Hair &amp; Skin Treatment
            <br className="hidden sm:block" />
            <span className="sm:whitespace-nowrap">in Image Clinic</span>
          </h1>

          <p className="rise-in mx-auto mt-5 max-w-[19rem] font-sans text-[15px] leading-relaxed text-cream-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:max-w-sm sm:text-base [--d:200ms]">
            Doctor-led expertise, advanced aesthetic care and personalised treatment plans to
            help you look and feel your best.
          </p>

          {/* Glass buttons: stacked and full width on phones, side by side from sm up */}
          <div className="rise-in mt-8 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 [--d:280ms] sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <GlassButton
              href="#clinics"
              variant="primary"
              icon={<MapPin className="h-4 w-4 shrink-0" strokeWidth={2.25} />}
              trailing={
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  strokeWidth={2.25}
                />
              }
            >
              Our Clinics
            </GlassButton>

            <GlassButton
              href="#services"
              variant="ghost"
              icon={
                <Sparkles
                  className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-[24deg] group-hover:scale-110 motion-reduce:transition-none"
                  strokeWidth={2.25}
                />
              }
            >
              Our Treatments
            </GlassButton>
          </div>
        </div>
      </div>

      <svg aria-hidden="true" className="hero-curve" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,25 C125,-5 375,-5 500,25 L500,60 L0,60 Z" fill="currentColor" />
      </svg>
    </section>
  );
}