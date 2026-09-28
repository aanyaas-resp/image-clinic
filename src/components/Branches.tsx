import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BRANCHES } from "@/data/branches";

export default function Branches() {
  return (
    <section id="clinics" className="bg-noir px-4 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="eyebrow justify-center">Our Clinics</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-parchment sm:text-4xl">Find your nearest clinic</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-parchment/70 sm:text-base">Visit us in Greater Kailash or Gurugram. Get directions or explore each clinic page.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {Object.values(BRANCHES).map((branch) => (
            <Link key={branch.slug} href={`/${branch.slug}`} className="group block">
              <article className="overflow-hidden rounded-[1.75rem] border border-gold/15 bg-smoke shadow-[0_18px_45px_-22px_rgba(43,32,22,0.3)] transition-transform duration-300 hover:-translate-y-1 hover:border-gold/30">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={branch.heroImage}
                    alt={`Image Clinic ${branch.area} branch`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-deep/80 via-noir-deep/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-parchment">
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-parchment/80">Image Clinic</p>
                      <h4 className="mt-1 font-display text-2xl font-semibold">{branch.area}</h4>
                    </div>
                    <div className="rounded-full border border-gold/30 bg-noir/80 px-3 py-1 text-xs font-medium text-amber">
                      {branch.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start gap-2 text-sm text-parchment/75">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                    <span>{branch.address}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                    <span className="text-sm font-medium text-parchment/80">Visit clinic</span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber">
                      View page <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {Object.values(BRANCHES).map((branch) => (
            <article key={`${branch.slug}-map`} className="overflow-hidden rounded-3xl border border-gold/15 bg-smoke">
              <div className="flex flex-wrap items-start justify-between gap-3 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold text-parchment">{branch.area}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-parchment/70">{branch.address}</p>
                </div>
                <a href={branch.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-pill-solid !px-4 !py-2 !text-xs">Get directions</a>
              </div>
              <iframe
                title={`Map to Image Clinic ${branch.area}`}
                src={branch.mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full border-0 sm:h-72"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
