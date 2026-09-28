"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { BRANCHES, HOME_BRAND } from "@/data/branches";

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
  { label: "Gallery", href: "/#gallery" },
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
export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();
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
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-noir-deep px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(184,134,58,0.14),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
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
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-parchment/65">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-parchment/15 text-parchment/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-parchment/45">
              Quick Links
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:block sm:space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center gap-1 font-sans text-sm text-parchment/70 transition-colors duration-200 hover:text-gold"
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
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-parchment/45">
              Contact
            </p>
            <ul className="mt-4 space-y-3.5">
              {Object.values(BRANCHES).map((branch) => (
                <li key={branch.slug} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-xs font-semibold uppercase tracking-wide text-parchment/50">{branch.area}</p>
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm leading-relaxed text-parchment/70 transition-colors duration-200 hover:text-gold"
                    >
                      {branch.address}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
                </span>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-sans text-sm text-parchment/70 transition-colors duration-200 hover:text-gold"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Mail className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-sans text-sm text-parchment/70 transition-colors duration-200 hover:text-gold"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick contact */}
          <div className="rounded-2xl border border-gold/20 bg-parchment/[0.04] p-5 sm:p-6 lg:border-none lg:bg-transparent lg:p-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-parchment/45">
              Ready When You Are
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-parchment/65">
              Reach out directly and start your treatment plan today.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                aria-label="Call Image Clinic"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-noir shadow-md shadow-gold/30 transition-transform duration-300 hover:scale-[1.06] hover:bg-gold-soft active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href={`https://wa.me/${HOME_BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Image Clinic on WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-parchment/15 bg-parchment/5 text-parchment shadow-sm transition-transform duration-300 hover:scale-[1.06] hover:border-gold hover:bg-gold hover:text-noir active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-parchment/10 pt-6 sm:mt-14 sm:flex-row">
          <p className="font-sans text-xs text-parchment/45">
            © {year} {CLINIC_NAME}. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <div className="flex gap-5">
              <Link href="/legal#privacy" className="font-sans text-xs text-parchment/45 hover:text-gold">
                Privacy Policy
              </Link>
              <Link href="/legal#terms" className="font-sans text-xs text-parchment/45 hover:text-gold">
                Terms of Service
              </Link>
            </div>

            {/* Dev credit */}
            <a
              href="https://aniketwebdev.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-parchment/45 transition-colors duration-200 hover:text-gold"
            >
              Made by{" "}
              <span className="font-medium text-parchment/60 hover:text-gold">
                aniketwebdev.in
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
