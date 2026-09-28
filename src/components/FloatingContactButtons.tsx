"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { findBranch } from "@/data/branches";

const WHATSAPP_MESSAGE =
  "Hi! I'd like to know more about Image Clinic and book an appointment.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path fill="currentColor" d="M12.04 2a9.87 9.87 0 0 0-8.49 14.9L2.2 21.8l5.02-1.32A9.87 9.87 0 1 0 12.04 2Zm0 17.93c-1.47 0-2.91-.39-4.18-1.13l-.3-.18-2.98.78.8-2.9-.2-.32a8.03 8.03 0 1 1 6.86 3.75Z" />
      <path fill="currentColor" d="M16.45 13.88c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.52.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

/**
 * Rendered once from the root layout (outside any transformed/scrolling wrapper,
 * so `position: fixed` stays truly fixed). It only appears on a branch page and
 * uses that branch's own number: /gurugram -> Gurugram, /greater-kailash -> Delhi.
 * On the main URL (and every other route) it renders nothing.
 */
export default function FloatingContactButtons() {
  const pathname = usePathname() ?? "/";
  const branch = findBranch(pathname.split("/").filter(Boolean)[0]);

  if (!branch) return null;

  const whatsappHref = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const telHref = `tel:${branch.phoneTel}`;

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-3 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Call button */}
      <a
        href={telHref}
        aria-label={`Call Image Clinic ${branch.area} at ${branch.phoneDisplay}`}
        className="group relative flex items-center"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-taupe/60 bg-ivory px-4 py-2 text-xs font-semibold tracking-wide text-chocolate opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
          Call {branch.area}
        </span>

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#3B8D57] text-white shadow-xl shadow-[#245D38]/35 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#2F7447] active:scale-95">
          <Phone className="h-6 w-6 fill-current stroke-[2.4]" />
        </span>
      </a>

      {/* WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Image Clinic ${branch.area} on WhatsApp`}
        className="group relative flex items-center"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-taupe/60 bg-ivory px-4 py-2 text-xs font-semibold tracking-wide text-chocolate opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
          Chat on WhatsApp {branch.area}
        </span>

        <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping-slow" />

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-[#25D366] text-white shadow-xl shadow-[#128C7E]/40 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#128C7E] active:scale-95 motion-safe:animate-wa-nudge">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>
    </div>
  );
}
