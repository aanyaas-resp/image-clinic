"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, ArrowUpRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { BranchConfig } from "@/data/branches";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TREATMENTS = ["Anti-Ageing", "Acne Treatment", "Hair Treatment"];

export default function BranchContact({ branch }: { branch: BranchConfig }) {
  const clinicName = `${branch.name} — ${branch.area}`;
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
        className="pointer-events-none absolute -left-24 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(184,134,58,0.12),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(217,178,107,0.12),transparent_65%)]"
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
          {/* Left: address, contact details, directions and map */}
          <div ref={infoRef} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-parchment/10 bg-smoke p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-parchment">{clinicName}</p>
                  <p className="mt-1 font-sans text-sm text-parchment/65">
                    {branch.addressLines[0]}
                    <br />
                    {branch.addressLines[1]}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-parchment">Call Us</p>
                  <a
                    href={`tel:${branch.phoneTel}`}
                    {...(branch.slug === "gurugram"
                      ? {
                          onClick: () =>
                            window.gtag?.("event", "conversion", {
                              send_to: "AW-18265778948/Lj4hCMSK7o0dEITW5oVE",
                            }),
                        }
                      : {})}
                    className="mt-1 block font-sans text-sm text-parchment/65 transition-colors hover:text-gold"
                  >
                    {branch.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Clock className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-parchment">Hours</p>
                  <p className="mt-1 font-sans text-sm text-parchment/65">{branch.hours}</p>
                </div>
              </div>

              {branch.slug !== "kolkata" && (
                <a
                  href={branch.directionsUrl}
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
              )}
            </div>

            {branch.slug !== "kolkata" && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-parchment/10 sm:aspect-[16/10]">
                <iframe
                  src={branch.mapEmbedSrc}
                  title={`Map showing the location of ${clinicName}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                  style={{ border: 0 }}
                />
              </div>
            )}
          </div>

          {/* Right: contact form */}
          <div ref={formRef}>
            <ContactForm clinicWhatsapp={branch.whatsapp} />
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
    <div className="relative overflow-hidden rounded-3xl border border-white/45 bg-white/70 p-5 shadow-2xl shadow-black/15 backdrop-blur-2xl sm:p-8 lg:p-9">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <h3 className="font-display text-2xl font-semibold text-parchment">Send Us a Message</h3>
      <p className="mt-2 text-sm text-parchment/60">
        You&apos;ll be redirected to WhatsApp to confirm.
      </p>

      {status === "sent" ? (
        <div className="mt-8 rounded-2xl border border-gold/25 bg-white/45 px-5 py-6 text-center backdrop-blur-lg">
          <p className="font-semibold text-parchment">Thank you! 🎉</p>
          <p className="mt-1 text-sm text-parchment/70">
            Continue on WhatsApp — we&apos;ll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="c-name" className="form-label">
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
              className="input-glass border-white/70 bg-white/55 shadow-sm backdrop-blur-lg focus:bg-white/80"
            />
          </div>

          <div>
            <label htmlFor="c-phone" className="form-label">
              Phone
            </label>
            <div className="input-group border-white/70 bg-white/55 shadow-sm backdrop-blur-lg focus-within:bg-white/80">
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
            <label htmlFor="c-treatment" className="form-label">
              Select Treatment
            </label>
            <div className="relative">
              <select
                id="c-treatment"
                name="treatment"
                required
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="input-glass appearance-none border-white/70 bg-white/55 pr-10 shadow-sm backdrop-blur-lg focus:bg-white/80"
              >
                <option value="" disabled>
                  Select Treatment...
                </option>
                {TREATMENTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/60" />
            </div>
          </div>

          <div>
            <label htmlFor="c-message" className="form-label">
              Message <span className="normal-case text-parchment/40">(optional)</span>
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={3}
              placeholder="Tell us a bit about what you're looking for..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-glass resize-none border-white/70 bg-white/55 shadow-sm backdrop-blur-lg focus:bg-white/80"
            />
          </div>

          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full border border-white/45 bg-[#25D366]/85 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#128C7E]/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#128C7E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E] focus-visible:ring-offset-2">
            Send via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
