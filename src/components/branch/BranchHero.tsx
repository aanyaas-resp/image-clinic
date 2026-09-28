"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Award, Phone, ChevronDown } from "lucide-react";
import type { BranchConfig } from "@/data/branches";

const SERVICES = ["Anti-Ageing", "Acne", "Hair Treatments"];

export default function BranchHero({ branch }: { branch: BranchConfig }) {
  const badges = [
    { icon: Star, label: "4.9/5 Google Reviews" },
    { icon: ShieldCheck, label: "700+ Happy Clients" },
    { icon: Award, label: branch.heroBadge },
  ];
  const clinicName = `${branch.name} — ${branch.area}`;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-noir">
      {/* LCP image. The ivory wash keeps the page light while the clinic still shows through. */}
      <Image
        src={branch.heroImage}
        alt={branch.heroAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center brightness-125 contrast-110 saturate-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-noir/65 via-noir/55 to-noir/70 lg:bg-gradient-to-r lg:from-noir/65 lg:via-noir/55 lg:to-noir/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_12%_18%,rgba(184,134,58,0.10),transparent_60%),radial-gradient(ellipse_50%_45%_at_92%_82%,rgba(217,178,107,0.12),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 py-28 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:px-16">
        <div>
          <p
            className="rise-in eyebrow mb-5 [--d:50ms]"
          >
            {clinicName}
          </p>

          <h1
            className="rise-in font-display text-4xl font-semibold leading-[1.15] text-parchment sm:text-5xl lg:text-6xl [--d:120ms]"
          >
            <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text italic text-transparent">
              Best
            </span>{" "}
            Hair &amp; Skin Clinic
            <br />
            in {branch.place}
          </h1>

          <p
            className="rise-in mt-6 max-w-md font-sans text-base leading-relaxed text-parchment/75 sm:text-lg [--d:200ms]"
          >
            At {clinicName}, we combine doctor-led expertise, advanced aesthetic care, and
            personalised treatment plans to help you look and feel your best.
          </p>

          <div
            className="rise-in mt-8 flex flex-wrap items-center gap-4 [--d:280ms]"
          >
            <a href="#booking" className="btn-pill-solid">
              Book Consultation
            </a>
            <a href={`tel:${branch.phoneTel}`} className="btn-pill-outline">
              <Phone className="h-4 w-4" strokeWidth={2} />
              Call Now
            </a>
          </div>

          <div
            className="rise-in mt-8 flex flex-wrap items-center gap-3 [--d:360ms]"
          >
            {badges.map(({ icon: Icon, label }) => (
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

        <div
          id="booking"
          className="rise-in [--d:260ms]"
        >
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

  return (
    <div className="rounded-3xl border border-gold/25 bg-cream-white/95 p-7 shadow-xl shadow-gold/15 sm:p-9">
      <h2 className="font-display text-2xl font-semibold text-parchment">Request Consultation</h2>
      <p className="mt-2 text-sm text-parchment/65">You&apos;ll be redirected to WhatsApp to confirm.</p>

      {status === "sent" ? (
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-6 text-center">
          <p className="font-semibold text-parchment">Thank you! 🎉</p>
          <p className="mt-1 text-sm text-parchment/70">
            Continue on WhatsApp — we&apos;ll confirm your slot there.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="name" className="form-label">
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
              className="input-glass"
            />
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <div className="input-group">
              <span className="flex items-center border-r border-parchment/15 px-4 text-sm text-parchment/70">
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
                className="w-full bg-transparent px-4 py-3 text-sm text-parchment outline-none placeholder:text-parchment/40"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="form-label">
              Treatment Interest
            </label>
            <div className="relative">
              <select
                id="service"
                name="service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="input-glass appearance-none pr-10"
              >
                <option value="" disabled>
                  Select Service...
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/60" />
            </div>
          </div>

          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" className="btn-pill-solid w-full justify-center">
            Send via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
