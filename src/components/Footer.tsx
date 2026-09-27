"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import BookingModal from "@/components/BookingModal";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Greater Kailash", href: "/greater-kailash" },
  { label: "Gurugram", href: "/gurugram" },
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#results" },
  { label: "Journey", href: "/#journey" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Full Results", href: "/#all-results" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/#faq" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/imageclinicindia/", icon: InstagramIcon },
];

const CLINIC_NAME = "Image Clinic";
const PHONE_DISPLAY = "+91 70441 07484";
const PHONE_TEL = "+917044107484";
const EMAIL = "info@bestskillclinic.in";
const ADDRESS = "E-84, Hansraj Gupta Road, Greater Kailash-1, New Delhi, Delhi 110048";
const MAPS_URL =
  "https://maps.google.com/?q=E-84+Hansraj+Gupta+Road+Greater+Kailash-1+New+Delhi+110048";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return;

    const id = href.split("#")[1];
    if (!id) return;

    e.preventDefault();

    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `/#${id}`);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="relative overflow-hidden bg-chocolate-deep px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(217,173,119,0.14),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Image Clinic home" className="block w-full">
              <Image
                src="/images/image_clinic_logo-1.webp"
                alt={`${CLINIC_NAME} logo`}
                width={480}
                height={120}
                sizes="(max-width: 640px) 100vw, 480px"
                className="h-auto w-full object-contain object-left"
              />
            </Link>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              Advanced skin, hair and aesthetic care in Kailash Garden and Gurugram — expert-led, result-driven treatment plans.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-bronze hover:text-bronze"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Quick Links
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:block sm:space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center gap-1 font-sans text-sm text-cream/70 transition-colors duration-200 hover:text-bronze"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Contact
            </p>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/5">
                  <MapPin className="h-3.5 w-3.5 text-bronze" strokeWidth={1.75} />
                </span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm leading-relaxed text-cream/70 transition-colors duration-200 hover:text-bronze"
                >
                  {ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/5">
                  <Phone className="h-3.5 w-3.5 text-bronze" strokeWidth={1.75} />
                </span>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-sans text-sm text-cream/70 transition-colors duration-200 hover:text-bronze"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/5">
                  <Mail className="h-3.5 w-3.5 text-bronze" strokeWidth={1.75} />
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-sans text-sm text-cream/70 transition-colors duration-200 hover:text-bronze"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Book CTA */}
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 sm:p-6 lg:border-none lg:bg-transparent lg:p-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Ready When You Are
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-cream/65">
              Book your consultation today and start your treatment plan.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-pill group mt-5 inline-flex items-center gap-2 bg-bronze text-cream shadow-md shadow-black/20 transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              Book Your Appointment
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 sm:mt-14 sm:flex-row">
          <p className="font-sans text-xs text-cream/45">
            © {year} {CLINIC_NAME}. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <div className="flex gap-5">
              <Link href="/legal#privacy" className="font-sans text-xs text-cream/45 hover:text-bronze">
                Privacy Policy
              </Link>
              <Link href="/legal#terms" className="font-sans text-xs text-cream/45 hover:text-bronze">
                Terms of Service
              </Link>
            </div>

            {/* Dev credit */}
            <a
              href="https://aniketwebdev.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-cream/45 transition-colors duration-200 hover:text-bronze"
            >
              Made by{" "}
              <span className="font-medium text-cream/60 hover:text-bronze">
                aniketwebdev.in
              </span>
            </a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
