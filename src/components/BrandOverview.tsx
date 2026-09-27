import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Stethoscope } from "lucide-react";
import { BRANCHES } from "@/data/branches";

export default function BrandOverview() {
  return (
    <section className="bg-ivory px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow mb-4 justify-start text-teal-darker/70">About Us</p>
            <h2 className="max-w-xl font-display text-3xl font-semibold text-chocolate-deep sm:text-4xl lg:text-5xl">
              Image Clinic — Best Hair &amp; Skin Treatment in Image Clinic.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-chocolate-deep/75 sm:text-lg">
              Image Clinic brings together advanced hair, skin and aesthetic care in a calm, doctor-led setting.
              We focus on personalised treatment plans that help every client look refreshed, confident and naturally better.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "4.9/5", label: "Google Reviews" },
                { value: "700+", label: "Happy Clients" },
                { value: "2", label: "Clinics" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-semibold text-chocolate-deep">{item.value}</div>
                  <div className="mt-1 text-sm text-chocolate-deep/70">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-[#f4eee3] to-[#fffdf8] p-6 shadow-[0_22px_60px_-24px_rgba(75,47,21,0.32)] sm:p-8">
            <p className="eyebrow mb-4 justify-start text-teal-darker/70">What We Do</p>
            <div className="space-y-4">
              {[
                { icon: Sparkles, title: "Skin Aesthetics", text: "Facials, glow therapy and personalised skin enhancement plans." },
                { icon: Stethoscope, title: "Anti-Ageing", text: "Advanced rejuvenation treatments for smoother, brighter skin." },
                { icon: ArrowRight, title: "Hair Restoration", text: "Scalp care and hair support plans for stronger, healthier growth." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-stone-200 bg-white/80 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8ead3] text-[#7a552a]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-chocolate-deep">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-chocolate-deep/70">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8">
            <p className="eyebrow text-teal-darker/70">Our Clinics</p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-chocolate-deep">Choose your nearest branch</h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {Object.values(BRANCHES).map((branch) => (
              <Link key={branch.slug} href={`/${branch.slug}`} className="group block">
                <article className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-50 shadow-[0_18px_45px_-22px_rgba(63,40,22,0.22)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={branch.slug === "greater-kailash" ? "/images/delhigalary2.jpg" : "/images/gurugram1.jpg"}
                      alt={branch.area === "Greater Kailash" ? "Image Clinic Greater Kailash branch" : "Image Clinic Gurugram branch"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-white">
                      <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/80">Image Clinic</p>
                        <h4 className="mt-1 font-display text-2xl font-semibold">{branch.area}</h4>
                      </div>
                      <div className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                        {branch.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-start gap-2 text-sm text-chocolate-deep/75">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-darker" strokeWidth={2} />
                      <span>{branch.address}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                      <span className="text-sm font-medium text-chocolate-deep/80">Visit clinic</span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-darker">
                        View page <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
