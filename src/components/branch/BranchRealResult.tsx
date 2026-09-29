import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BranchConfig } from "@/data/branches";

export default function BranchRealResult({ branch }: { branch: BranchConfig }) {
  return (
    <section
      id="real-results"
      aria-labelledby="real-results-heading"
      className="relative overflow-hidden bg-noir px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      {/* subtle ambient glow, consistent with Hero's signature texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(217,178,107,0.12),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(184,134,58,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Before / After — single image containing both halves */}
        <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="relative aspect-square w-full overflow-hidden rounded-[24px] shadow-[0_16px_48px_rgba(43,32,22,0.18)] ring-1 ring-inset ring-gold/25 sm:rounded-[28px]">
            <Image
              src={branch.resultImage}
              alt={branch.resultAlt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 45vw"
              quality={80}
              className="object-contain"
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-parchment/60">
              Before
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              After
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow mb-4">Real Results</p>
          <h2
            id="real-results-heading"
            className="font-display text-[2rem] font-semibold leading-tight text-parchment sm:text-4xl lg:text-5xl"
          >
            Erase the Past, Reveal the Future:{" "}
            <span className="accent-italic">The Ultimate Skin Renaissance</span>
          </h2>

          <p className="mt-6 font-sans text-base leading-relaxed text-parchment/75 sm:text-lg">
            Real patients, real transformations. At Image Clinic, our
            treatments are led by dermatologist-guided protocols — from
            chemical peels to microneedling and collagen induction — each
            plan built around your skin&apos;s specific needs.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-parchment/75 sm:text-lg">
            Witness the transformation from pitted, dull texture to the
            coveted <span className="accent-italic">Glass Skin</span> finish.
            Our bespoke treatments are designed for Indian skin, ensuring
            safe, lasting correction of scars, pores, and pigmentation.
          </p>
 <a
            href="#contact"
            className="btn-pill-solid group mt-9 inline-flex w-full items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] sm:w-auto"
          >
            Claim Your Skin Analysis
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}