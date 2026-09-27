"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, ArrowUpRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// TODO: replace with your real address + Google Maps "Share" link
const CLINIC = {
  name: "Image Clinic — Greater Kailash",
  addressLine1: "123, Greater Kailash - I",
  addressLine2: "New Delhi, Delhi 110048",
  phoneDisplay: "70441 07484",
  phoneTel: "+917044107484",
  whatsapp: "917044107484",
  hours: "Mon – Sun: 10:00 AM – 8:00 PM",
  directionsUrl: "https://maps.app.goo.gl/ZnwzU5A4VfZ2dGRAA",
  // TODO: swap for your clinic's actual embed src —
  // Google Maps → Share → Embed a map → copy the src="..." URL
  mapEmbedSrc:
    "https://www.google.com/maps?q=Greater+Kailash+I,+New+Delhi&output=embed",
};

const TREATMENTS = ["Anti-Ageing", "Acne Treatment", "Hair Treatment"];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .fromTo(headingRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
          .fromTo(infoRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.25)
          .fromTo(
            formRef.current,
            { autoAlpha: 0, y: 24, scale: 0.98 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 },
            0.3
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-noir-deep px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[340px] w-[340px] rounded-full bg-gold-soft/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p ref={eyebrowRef} className="eyebrow mx-auto mb-4 justify-center">
            Get in Touch
          </p>
          <h2
            ref={headingRef}
            id="contact-heading"
            className="font-display text-[2rem] font-semibold leading-tight text-parchment sm:text-4xl lg:text-5xl"
          >
            Visit Us at <span className="accent-italic">Image Clinic</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: address, contact details, directions, map */}
          <div ref={infoRef} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-parchment/10 bg-smoke p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-parchment">{CLINIC.name}</p>
                  <p className="mt-1 font-sans text-sm text-parchment/65">
                    {CLINIC.addressLine1}
                    <br />
                    {CLINIC.addressLine2}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-parchment">Call Us</p>
                  <a
                    href={`tel:${CLINIC.phoneTel}`}
                    className="mt-1 block font-sans text-sm text-parchment/65 transition-colors hover:text-gold-soft"
                  >
                    +91 {CLINIC.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                  <Clock className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-parchment">Hours</p>
                  <p className="mt-1 font-sans text-sm text-parchment/65">{CLINIC.hours}</p>
                </div>
              </div>

              <a
                href={CLINIC.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-solid group mt-7 inline-flex w-full items-center justify-center gap-2"
              >
                Get Directions
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>

            {/* Map embed */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-parchment/10 sm:aspect-[16/10]">
              <iframe
                src={CLINIC.mapEmbedSrc}
                title={`Map showing the location of ${CLINIC.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.3] contrast-125"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Right: contact form */}
          <div ref={formRef}>
            <ContactForm clinicWhatsapp={CLINIC.whatsapp} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm({ clinicWhatsapp }: { clinicWhatsapp: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState("");
  const [message, setMessage] = useState("");
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
    if (!treatment) {
      setError("Please select a treatment.");
      return;
    }
    setError("");

    const lines = [
      "Hi, I'd like to get in touch.",
      "",
      `Name: ${trimmedName}`,
      `Phone: ${trimmedPhone}`,
      `Interested in: ${treatment}`,
    ];
    if (message.trim()) lines.push(`Message: ${message.trim()}`);

    const url = `https://wa.me/${clinicWhatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
  }

  return (
    <div className="rounded-3xl border border-parchment/10 bg-smoke p-7 shadow-2xl shadow-black/30 sm:p-9">
      <h3 className="font-display text-2xl font-semibold text-parchment">Send Us a Message</h3>
      <p className="mt-2 text-sm text-parchment/60">
        You&apos;ll be redirected to WhatsApp to confirm.
      </p>

      {status === "sent" ? (
        <div className="mt-8 rounded-2xl border border-gold-soft/30 bg-gold-soft/10 px-5 py-6 text-center">
          <p className="font-semibold text-parchment">Thank you! 🎉</p>
          <p className="mt-1 text-sm text-parchment/70">
            Continue on WhatsApp — we&apos;ll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="c-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Full Name
            </label>
            <input
              id="c-name"
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
            <label htmlFor="c-phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Phone
            </label>
            <div className="flex overflow-hidden rounded-xl border border-parchment/20 bg-parchment/5 focus-within:ring-2 focus-within:ring-gold">
              <span className="flex items-center border-r border-parchment/20 px-4 text-sm text-parchment/70">
                +91
              </span>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                required
                placeholder="99999 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full bg-transparent px-4 py-3 text-sm text-parchment placeholder:text-parchment/40 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-treatment" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Select Treatment
            </label>
            <div className="relative">
              <select
                id="c-treatment"
                name="treatment"
                required
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="input-glass appearance-none pr-10"
              >
                <option value="" disabled className="text-noir-deep">
                  Select Treatment...
                </option>
                {TREATMENTS.map((t) => (
                  <option key={t} value={t} className="text-noir-deep">
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/60" />
            </div>
          </div>

          <div>
            <label htmlFor="c-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Message <span className="normal-case text-parchment/40">(optional)</span>
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={3}
              placeholder="Tell us a bit about what you're looking for..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-glass resize-none"
            />
          </div>

          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

          <button type="submit" className="btn-pill-solid w-full justify-center">
            Send via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}