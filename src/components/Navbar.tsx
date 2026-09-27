"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Greater Kailash", href: "/greater-kailash" },
  { label: "Gurugram", href: "/gurugram" },
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#all-results" },
  { label: "FAQ", href: "/#faq" },
];

const SCROLL_THRESHOLD = 48;

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const isCompact = !isHome || isScrolled || isMobileOpen;

  // Handles hash links (#about, #services, etc). If already on "/", scroll
  // smoothly instead of letting Link do a hash-only URL change that doesn't
  // reliably scroll. If on another route, navigate to "/" first, then scroll
  // once the page has mounted.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return; // plain routes (e.g. "/") behave normally

    const id = href.split("#")[1];
    if (!id) return;

    e.preventDefault();
    setIsMobileOpen(false);

    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `/#${id}`);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          isCompact ? "max-w-3xl px-3 pt-3 sm:px-4 sm:pt-4 lg:max-w-4xl" : "max-w-7xl px-4 pt-0 sm:px-6 lg:px-16"
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-3 transition-all duration-500 ease-out ${
            isCompact
              ? "rounded-[12px] border border-gold/15 bg-noir-deep/85 px-4 py-2.5 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-5"
              : "rounded-none border-transparent bg-transparent px-2 py-4 sm:py-5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            onClick={() => setIsMobileOpen(false)}
          >
            <Image
              src="/images/image_clinic_logo-1.webp"
              alt="Image Clinic logo"
              width={180}
              height={52}
              className={`h-auto w-auto object-contain transition-all duration-500 ${
                isCompact ? "max-h-8 sm:max-h-9" : "max-h-10 sm:max-h-12"
              }`}
              priority
            />
            
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`whitespace-nowrap font-sans text-sm font-medium transition-colors duration-300 ${
                    isCompact
                      ? "text-parchment/80 hover:text-gold"
                      : "text-parchment/90 hover:text-parchment"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
              isCompact
                ? "border-gold/20 text-parchment"
                : "border-gold/25 text-parchment"
            }`}
          >
            {isMobileOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out lg:hidden ${
            isMobileOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-3xl border border-gold/15 bg-noir-deep/90 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <ul className="flex flex-col gap-1 px-4 pb-2 pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-parchment/85 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}