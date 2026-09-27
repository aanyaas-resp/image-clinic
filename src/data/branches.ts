export type BranchSlug = "greater-kailash" | "gurugram";

export type BranchConfig = {
  slug: BranchSlug;
  name: string;
  shortName: string;
  area: string;
  location: string;
  pageTitle: string;
  description: string;
  address: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  mapsLink: string;
  googleReviewsUrl: string;
  heroTitle: string;
  heroBadge: string;
  heroImage: string;
  heroAlt: string;
  results: Array<{ slug: string; image: string; alt: string }>;
};

export const BRANCHES: Record<BranchSlug, BranchConfig> = {
  "greater-kailash": {
    slug: "greater-kailash",
    name: "Image Clinic",
    shortName: "Image Clinic",
    area: "Greater Kailash",
    location: "Greater Kailash (Delhi)",
    pageTitle: "Image Clinic — Greater Kailash | Best Hair & Skin Clinic in Greater Kailash",
    description:
      "Best hair and skin clinic in Greater Kailash for advanced aesthetic, skin and hair treatments with doctor-led care.",
    address: "E-84, Hansraj Gupta Road, Greater Kailash-1, New Delhi, Delhi 110048",
    phoneDisplay: "+91 70441 07484",
    phoneTel: "+917044107484",
    whatsapp: "917044107484",
    mapsLink: "https://maps.google.com/?q=E-84+Hansraj+Gupta+Road+Greater+Kailash-1+New+Delhi+110048",
    googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Image+Clinic+Greater+Kailash+New+Delhi",
    heroTitle: "Best Hair & Skin Clinic in Greater Kailash",
    heroBadge: "Trusted in Greater Kailash",
    heroImage: "/images/delhigalary2.jpg",
    heroAlt: "Image Clinic — clinic exterior in Greater Kailash, Delhi",
    results: [
      { slug: "gk-result-1", image: "/result/result-1.png", alt: "Hair and skin result at Image Clinic Greater Kailash" },
      { slug: "gk-result-2", image: "/result/result-2.png", alt: "Hair and skin result at Image Clinic Greater Kailash" },
      { slug: "gk-result-3", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.38%20PM.jpeg", alt: "Skin glow result at Image Clinic Greater Kailash" },
      { slug: "gk-result-4", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.39%20PM%20(2).jpeg", alt: "Skin treatment result at Image Clinic Greater Kailash" },
      { slug: "gk-result-5", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.39%20PM.jpeg", alt: "Hair treatment result at Image Clinic Greater Kailash" },
      { slug: "gk-result-6", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.43%20PM%20(2).jpeg", alt: "Facial result at Image Clinic Greater Kailash" },
    ],
  },
  gurugram: {
    slug: "gurugram",
    name: "Image Clinic",
    shortName: "Image Clinic",
    area: "Gurugram",
    location: "Gurugram",
    pageTitle: "Image Clinic — Gurugram | Best Hair & Skin Clinic in Gurugram",
    description:
      "Best hair and skin clinic in Gurugram for advanced treatment plans, skin care and hair restoration with expert-led care.",
    address: "Second Floor, A-14, 9, Golf Course Road, DLF Phase 2, Gurugram, Haryana 122002",
    phoneDisplay: "+91 88263 79666",
    phoneTel: "+918826379666",
    whatsapp: "918826379666",
    mapsLink: "https://maps.google.com/?q=Second+Floor+A-14+9+Golf+Course+Road+DLF+Phase+2+Gurugram+122002",
    googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Image+Clinic+Gurugram+Golf+Course+Road",
    heroTitle: "Best Hair & Skin Clinic in Gurugram",
    heroBadge: "Trusted in Gurugram",
    heroImage: "/images/gurugram1.jpg",
    heroAlt: "Image Clinic — clinic exterior in Gurugram",
    results: [
      { slug: "gr-result-1", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.43%20PM.jpeg", alt: "Hair and skin result at Image Clinic Gurugram" },
      { slug: "gr-result-2", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.47%20PM.jpeg", alt: "Facial result at Image Clinic Gurugram" },
      { slug: "gr-result-3", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.54%20PM.jpeg", alt: "Advanced treatment result at Image Clinic Gurugram" },
      { slug: "gr-result-4", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.55%20PM%20(2).jpeg", alt: "Skin glow result at Image Clinic Gurugram" },
      { slug: "gr-result-5", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.33.59%20PM%20(2).jpeg", alt: "Hair treatment result at Image Clinic Gurugram" },
      { slug: "gr-result-6", image: "/result/WhatsApp%20Image%202026-09-27%20at%205.34.06%20PM%20(2).jpeg", alt: "Skin rejuvenation result at Image Clinic Gurugram" },
    ],
  },
};

export const HOME_BRAND: BranchConfig = {
  slug: "greater-kailash",
  name: "Image Clinic",
  shortName: "Image Clinic",
  area: "Image Clinic",
  location: "Image Clinic",
  pageTitle: "Image Clinic — Best Hair & Skin Treatment in Image Clinic",
  description:
    "Advanced skin, hair and aesthetic care at Image Clinic with doctor-led treatment plans for natural, confident results.",
  address: "Greater Kailash · Gurugram",
  phoneDisplay: "+91 70441 07484",
  phoneTel: "+917044107484",
  whatsapp: "917044107484",
  mapsLink: "https://maps.google.com/?q=Image+Clinic+Greater+Kailash+New+Delhi",
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Image+Clinic+Greater+Kailash+New+Delhi",
  heroTitle: "Best Hair & Skin Treatment in Image Clinic",
  heroBadge: "Trusted Care at Image Clinic",
  heroImage: "/images/gurugram1.jpg",
  heroAlt: "Image Clinic — best hair and skin clinic in Delhi and Gurugram",
  results: BRANCHES["greater-kailash"].results,
};

export const DEFAULT_BRANCH = HOME_BRAND;

export function getBranchBySlug(slug?: string): BranchConfig {
  if (!slug || !(slug in BRANCHES)) {
    return HOME_BRAND;
  }

  return BRANCHES[slug as BranchSlug];
}

export function getBranchFromPathname(pathname: string): BranchConfig {
  const slug = pathname.split("/").filter(Boolean)[0];
  return getBranchBySlug(slug);
}
