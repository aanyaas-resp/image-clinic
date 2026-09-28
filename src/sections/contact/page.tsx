"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Send,
  MapPin,
  Clock,
  Navigation,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRANCHES, HOME_BRAND, type BranchConfig, type BranchSlug, getBranchFromPathname } from "@/data/branches";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GENDERS = ["Male", "Female"];
const DEPARTMENTS = ["Laser Treatments", "Skin Treatments", "Hair Treatments", "Botox", "Filler", "PRP", "Other"];

function directionsUrl(address: string) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
}

export default function Contact({ branch }: { branch?: BranchConfig }) {
  const pathname = usePathname();
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<BranchSlug>(branch?.slug ?? getBranchFromPathname(pathname).slug);
  const activeBranch = branch ?? (pathname === "/" ? HOME_BRAND : BRANCHES[selectedBranchSlug]);
  const visibleBranches = branch ? [branch] : Object.values(BRANCHES);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(GENDERS[0]);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const CLINIC_NAME = activeBranch.name;
  const CLINIC_PHONES = [{ display: activeBranch.phoneDisplay, tel: activeBranch.phoneTel.replace(/\D/g, "") }];
  const CLINIC_ADDRESSES = visibleBranches.map((item) => ({ label: item.location, text: item.address, mapsLink: item.mapsLink }));

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }, defaults: { ease: "power3.out" } });
        tl.fromTo(headingWrapRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .fromTo(cardRefs.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.2)
          .fromTo(mapRef.current, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.5)
          .fromTo(formRef.current, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.25);
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");

    const finalBranch = branch ?? BRANCHES[selectedBranchSlug];
    const lines = [
      `Hi, I'd like to get in touch with ${CLINIC_NAME}.`,
      `Branch: ${finalBranch.area}`,
      "",
      `Name: ${trimmedName}`,
      `Mobile: ${trimmedMobile}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      `Gender: ${gender}`,
      `Interested in: ${department}`,
      message.trim() ? `Message: ${message.trim()}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${finalBranch.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setName("");
    setMobile("");
    setEmail("");
    setGender(GENDERS[0]);
    setDepartment(DEPARTMENTS[0]);
    setMessage("");
  }

  const inputClass = "w-full rounded-xl border border-chocolate-deep/15 bg-cream py-3 pl-11 pr-4 text-sm text-chocolate-deep placeholder:text-chocolate-deep/40 outline-none transition-colors duration-200 focus:border-bronze focus:ring-2 focus:ring-bronze/30";
  const selectClass = "w-full appearance-none rounded-xl border border-chocolate-deep/15 bg-cream py-3 pl-11 pr-9 text-sm text-chocolate-deep outline-none transition-colors duration-200 focus:border-bronze focus:ring-2 focus:ring-bronze/30";

  return (
    <section ref={sectionRef} id="contact" className="bg-ivory px-4 py-16 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 justify-center">Get In Touch</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-chocolate-deep sm:text-4xl lg:text-5xl">Contact <span className="accent-italic">Us</span></h2>
          <p className="mt-4 text-base leading-relaxed text-chocolate-deep/70">Have a question or ready to book your consultation? Reach out and our team will get back to you shortly.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div ref={(el) => { cardRefs.current[1] = el; }} className="rounded-2xl border border-chocolate-deep/10 bg-cream/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/60 hover:shadow-[0_10px_28px_rgba(94,59,21,0.12)]">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chocolate-deep/5"><Phone className="h-4 w-4 text-bronze" strokeWidth={1.75} /></span>
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wide text-chocolate-deep/50">Phone</p>
                    <div className="mt-1 flex flex-col gap-1">
                      {CLINIC_PHONES.map((p) => (<a key={p.tel} href={`tel:${p.tel}`} className="text-sm font-medium text-chocolate-deep transition-colors hover:text-bronze sm:text-base">{p.display}</a>))}
                    </div>
                  </div>
                </div>
              </div>

              {CLINIC_ADDRESSES.map((addr, i) => (
                <div key={addr.label} ref={(el) => { cardRefs.current[2 + i] = el; }} className="group flex items-start gap-4 rounded-2xl border border-chocolate-deep/10 bg-cream/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/60 hover:shadow-[0_10px_28px_rgba(94,59,21,0.12)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chocolate-deep/5 transition-colors duration-300 group-hover:bg-bronze"><MapPin className="h-4 w-4 text-bronze transition-colors duration-300 group-hover:text-cream" strokeWidth={1.75} /></span>
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wide text-chocolate-deep/50">{addr.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-chocolate-deep sm:text-base">{addr.text}</p>
                    <a href={addr.mapsLink || directionsUrl(addr.text)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-bronze transition-colors hover:text-chocolate-deep"><Navigation className="h-3.5 w-3.5" strokeWidth={2} />Get Directions</a>
                  </div>
                </div>
              ))}

              <div ref={(el) => { cardRefs.current[3] = el; }} className="group flex items-start gap-4 rounded-2xl border border-chocolate-deep/10 bg-cream/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/60 hover:shadow-[0_10px_28px_rgba(94,59,21,0.12)]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chocolate-deep/5 transition-colors duration-300 group-hover:bg-bronze"><Clock className="h-4 w-4 text-bronze transition-colors duration-300 group-hover:text-cream" strokeWidth={1.75} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-chocolate-deep/50">Clinic Hours</p>
                  <p className="mt-1 text-sm leading-relaxed text-chocolate-deep sm:text-base">Open daily from 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="rounded-3xl border border-chocolate-deep/10 bg-cream/70 p-4 shadow-[0_10px_30px_-6px_rgba(94,59,21,0.15)] sm:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {!branch && (
                  <div className="relative sm:col-span-2">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                    <select
                      value={selectedBranchSlug}
                      onChange={(e) => setSelectedBranchSlug(e.target.value as BranchSlug)}
                      className={selectClass}
                    >
                      <option value="greater-kailash">Greater Kailash</option>
                      <option value="gurugram">Gurugram</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                  </div>
                )}

                <div className="relative sm:col-span-2">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} />
                </div>

                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                  <input type="tel" inputMode="numeric" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className={inputClass} />
                </div>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className={inputClass} />
                </div>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>{GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}</select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                </div>

                <div className="relative sm:col-span-2">
                  <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-chocolate-deep/40" strokeWidth={1.75} />
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Tell us what service or concern you’re looking for" className="w-full rounded-xl border border-chocolate-deep/15 bg-cream py-3 pl-11 pr-4 text-sm text-chocolate-deep placeholder:text-chocolate-deep/40 outline-none transition-colors duration-200 focus:border-bronze focus:ring-2 focus:ring-bronze/30" />
                </div>

                <div className="relative sm:col-span-2">
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectClass}>
                    {DEPARTMENTS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate-deep/40" strokeWidth={1.75} />
                </div>
              </div>

              {error && <p className="mt-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}
              {submitted && !error && <p className="mt-4 rounded-xl bg-green-500/10 px-3 py-2 text-sm text-green-700">Your enquiry has been prepared in WhatsApp. Please continue the chat to confirm your appointment.</p>}

              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-chocolate-deep px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-chocolate">Send via WhatsApp <Send className="h-4 w-4" strokeWidth={2} /></button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
