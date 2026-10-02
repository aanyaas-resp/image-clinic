"use client";

import { usePathname } from "next/navigation";

export default function GurugramGtmNoscript() {
  const pathname = usePathname();

  if (pathname !== "/gurugram") {
    return null;
  }

  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-M249T6H5"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
