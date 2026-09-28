import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowUpRight, Home } from "lucide-react";
import { HOME_BRAND } from "@/data/branches";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-noir px-5 pb-16 pt-32 sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-7xl font-semibold text-gold/30 sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold leading-snug text-parchment sm:text-3xl lg:text-4xl">
          We couldn&apos;t find that <span className="accent-italic">page</span>
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-parchment/70 sm:text-base">
          The page you&apos;re looking for may have been moved or no longer exists. Let&apos;s get you
          back on track.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-pill-solid group w-full justify-center sm:w-auto">
            <Home className="h-4 w-4" strokeWidth={2} />
            Back to Home
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
          <a href={`tel:${HOME_BRAND.phoneTel}`} className="btn-pill-outline w-full justify-center sm:w-auto">
            <Phone className="h-4 w-4" strokeWidth={2} />
            Call Us
          </a>
        </div>
      </div>
    </main>
  );
}
