"use client";

import { useState, type FormEvent, type SVGProps } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Award, Phone, ChevronDown } from "lucide-react";
import type { BranchConfig } from "@/data/branches";

const SERVICES = ["Anti-Ageing", "Acne", "Hair Treatments"];

/* Official WhatsApp glyph (lucide-react has no brand icons) */
function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* Shared liquid-glass shadow: bright top edge, soft bottom edge, depth */
const GLASS_SHADOW =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.25)]";

export default function BranchHero({ branch }: { branch: BranchConfig }) {
  const badges = [
    { icon: Star, label: "4.9/5 Google Reviews" },
    { icon: ShieldCheck, label: "700+ Happy Clients" },
    { icon: Award, label: branch.heroBadge },
  ];
  const clinicName = `${branch.name} — ${branch.area}`;
  const heroWhatsappUrl = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
    `Hi, I'd like to book a consultation at ${clinicName}.`
  )}`;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-chocolate-deep">
      {/* LCP image */}
      <Image
        src={branch.heroImage}
        alt={branch.heroAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark gradient, left to right on every screen size. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-chocolate-deep/95 via-chocolate-deep/85 to-chocolate-deep/45 lg:from-chocolate-deep/95 lg:via-chocolate-deep/75 lg:to-chocolate-deep/10"
      />
      {/* Soft gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_12%_18%,rgba(184,134,58,0.18),transparent_60%),radial-gradient(ellipse_50%_45%_at_92%_82%,rgba(217,178,107,0.14),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-20 pt-36 sm:px-10 sm:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:px-16 lg:py-28">
        {/* LEFT: content */}
        <div>
          <p className="rise-in eyebrow mb-4 text-gold-soft [--d:50ms]">{clinicName}</p>

          <h1 className="rise-in font-display text-[2.75rem] font-semibold leading-[1.1] text-cream-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl [--d:120ms]">
            <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text pr-1 italic text-transparent">
              Best
            </span>{" "}
            Hair &amp; Skin Clinic
            <br />
            in {branch.place}
          </h1>

          <p className="rise-in mt-5 max-w-[17rem] font-sans text-[15px] leading-relaxed text-cream-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:max-w-sm sm:text-base [--d:200ms]">
            Doctor-led expertise, advanced aesthetic care and personalised treatment plans to
            help you look and feel your best.
          </p>

          {/* Buttons: WhatsApp + Call Now (clinic's own numbers) */}
          <div className="rise-in mt-6 flex w-full flex-col items-stretch gap-2.5 [--d:280ms] sm:w-auto sm:flex-row sm:items-center">
            <a
              href={heroWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-gradient-to-b from-[#25D366]/80 to-[#128C7E]/80 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-xl backdrop-saturate-150 transition duration-300 hover:-translate-y-0.5 hover:from-[#25D366] hover:to-[#128C7E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${GLASS_SHADOW}`}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${branch.phoneTel}`}
              aria-label="Call the clinic"
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-gradient-to-b from-white/30 to-white/10 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-xl backdrop-saturate-150 transition duration-300 hover:-translate-y-0.5 hover:from-white/40 hover:to-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${GLASS_SHADOW}`}
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              Call Now
            </a>
          </div>

          {/* Trust badges */}
          <div className="rise-in mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3 [--d:360ms]">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-gold/40 bg-chocolate-deep/50 px-3.5 py-2 text-[12.5px] text-cream-white backdrop-blur-sm sm:px-4 sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.75} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT (below on mobile): form */}
        <div id="booking" className="rise-in scroll-mt-24 [--d:260ms]">
          <ConsultationForm clinicWhatsapp={branch.whatsapp} />
        </div>
      </div>

      <svg aria-hidden="true" className="hero-curve" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,25 C125,-5 375,-5 500,25 L500,60 L0,60 Z" fill="currentColor" />
      </svg>
    </section>
  );
}

function ConsultationForm({ clinicWhatsapp }: { clinicWhatsapp: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!service) {
      setError("Please select a treatment.");
      return;
    }
    setError("");

    const message = `Hi, I'd like to book a consultation.\n\nName: ${trimmedName}\nPhone: ${trimmedPhone}\nInterested in: ${service}`;
    const url = `https://wa.me/${clinicWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setStatus("sent");
  }

  const label = "mb-1.5 block text-[13px] font-medium tracking-wide text-white/90";
  const field =
    "w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.05)] outline-none transition duration-300 focus:border-white/60 focus:bg-white/20 focus:ring-2 focus:ring-white/30 sm:text-sm";

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br from-white/25 via-white/10 to-white/5 p-5 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_30px_rgba(255,255,255,0.05),0_25px_60px_rgba(0,0,0,0.4)] sm:p-8 lg:p-9">
      {/* Liquid highlights */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-gold-soft/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/15 via-transparent to-transparent" />

      <div className="relative">
        <h2 className="font-display text-2xl font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
          Request Consultation
        </h2>
        <p className="mt-2 text-sm text-white/75">You&apos;ll be redirected to WhatsApp to confirm.</p>

        {status === "sent" ? (
          <div className="mt-8 rounded-2xl border border-white/30 bg-white/15 px-5 py-6 text-center backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            <p className="font-semibold text-white">Thank you! 🎉</p>
            <p className="mt-1 text-sm text-white/80">
              Continue on WhatsApp — we&apos;ll confirm your slot there.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className={label}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="phone" className={label}>
                Phone
              </label>
              <div className="flex overflow-hidden rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.05)] transition duration-300 focus-within:border-white/60 focus-within:bg-white/20 focus-within:ring-2 focus-within:ring-white/30">
                <span className="flex items-center border-r border-white/25 px-4 text-sm text-white/80">
                  +91
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  placeholder="99999 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full bg-transparent px-4 py-3 text-base text-white outline-none placeholder:text-white/50 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className={label}>
                Treatment Interest
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${field} appearance-none pr-10 ${service ? "text-white" : "text-white/50"}`}
                >
                  <option value="" disabled className="text-chocolate-deep">
                    Select Service...
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="text-chocolate-deep">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-300/30 bg-red-500/20 px-3 py-2 text-sm text-red-100 backdrop-blur-md">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-gradient-to-b from-[#25D366]/85 to-[#128C7E]/85 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(255,255,255,0.1),0_10px_30px_rgba(18,140,126,0.35)] transition duration-300 hover:-translate-y-0.5 hover:from-[#25D366] hover:to-[#128C7E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
}