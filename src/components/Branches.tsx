import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BRANCHES } from "@/data/branches";

export default function Branches() {
  return (
    <section id="clinics" className="bg-noir px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="eyebrow">Our Clinics</p>
          <h3 className="mt-2 font-display text-3xl font-semibold text-parchment">Choose your nearest branch</h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {Object.values(BRANCHES).map((branch) => (
            <Link key={branch.slug} href={`/${branch.slug}`} className="group block">
              <article className="overflow-hidden rounded-[1.75rem] border border-gold/15 bg-smoke shadow-[0_18px_45px_-22px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:border-gold/30">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={branch.slug === "greater-kailash" ? "/images/delhigalary2.jpg" : "/images/gurugram1.jpg"}
                    alt={branch.area === "Greater Kailash" ? "Image Clinic Greater Kailash branch" : "Image Clinic Gurugram branch"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-deep/80 via-noir-deep/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-parchment">
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-parchment/80">Image Clinic</p>
                      <h4 className="mt-1 font-display text-2xl font-semibold">{branch.area}</h4>
                    </div>
                    <div className="rounded-full border border-gold/30 bg-noir-deep/40 px-3 py-1 text-xs font-medium text-gold-soft backdrop-blur-sm">
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
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-soft">
                      View page <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}