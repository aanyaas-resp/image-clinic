export type BranchSlug = "greater-kailash" | "gurugram" | "kolkata";

export type BranchConfig = {
  slug: BranchSlug;
  name: string;
  area: string;
  location: string;
  /** Used in the hero heading: "Best Hair & Skin Clinic in {place}" */
  place: string;
  pageTitle: string;
  description: string;
  address: string;
  addressStreet: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  /** Two-line version of the address for the contact card */
  addressLines: [string, string];
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  hours: string;
  mapsLink: string;
  directionsUrl: string;
  mapEmbedSrc: string;
  googleReviewsUrl: string;
  /** Rating summary shown above the review cards */
  reviewRating: string;
  heroBadge: string;
  heroImage: string;
  heroAlt: string;
  resultImage: string;
  resultAlt: string;
};

export const BRANCHES: Record<BranchSlug, BranchConfig> = {
  "greater-kailash": {
    slug: "greater-kailash",
    name: "Image Clinic",
    area: "Greater Kailash",
    location: "Greater Kailash (Delhi)",
    place: "Greater Kailash, Delhi",
    pageTitle: "Hair & Skin Clinic in Greater Kailash, Delhi",
    description:
      "Best hair and skin clinic in Greater Kailash for advanced aesthetic, skin and hair treatments with doctor-led care.",
    address: "E-84, Hansraj Gupta Road, Greater Kailash-1, New Delhi, Delhi 110048",
    addressStreet: "E-84, Hansraj Gupta Road, Greater Kailash-1",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110048",
    addressLines: ["E-84, Hansraj Gupta Road", "Greater Kailash-1, New Delhi, Delhi 110048"],
    phoneDisplay: "+91 70441 07484",
    phoneTel: "+917044107484",
    whatsapp: "917044107484",
    hours: "Mon – Sun: 10:00 AM – 8:00 PM",
    mapsLink: "https://maps.google.com/?q=E-84+Hansraj+Gupta+Road+Greater+Kailash-1+New+Delhi+110048",
    directionsUrl: "https://maps.app.goo.gl/ZnwzU5A4VfZ2dGRAA",
    mapEmbedSrc:
      "https://www.google.com/maps?q=E-84+Hansraj+Gupta+Road+Greater+Kailash-1+New+Delhi+110048&output=embed",
    googleReviewsUrl: "https://maps.app.goo.gl/ZnwzU5A4VfZ2dGRAA",
    reviewRating: "4.9 / 5",
    heroBadge: "Trusted in Greater Kailash",
    heroImage: "/images/gallery-1.webp",
    heroAlt: "Image Clinic — clinic exterior in Greater Kailash, Delhi",
    resultImage: "/result/result-7.webp",
    resultAlt: "Before and after skin treatment results at Image Clinic, Greater Kailash, Delhi",
  },
  gurugram: {
    slug: "gurugram",
    name: "Image Clinic",
    area: "Gurugram",
    location: "Gurugram",
    place: "Gurugram",
    pageTitle: "Hair & Skin Clinic in Gurugram",
    description:
      "Best hair and skin clinic in Gurugram for advanced treatment plans, skin care and hair restoration with expert-led care.",
    address: "Second Floor, A-14, 9, Golf Course Road, DLF Phase 2, Gurugram, Haryana 122002",
    addressStreet: "Second Floor, A-14, 9, Golf Course Road, DLF Phase 2",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122002",
    addressLines: ["Second Floor, A-14, 9, Golf Course Road", "DLF Phase 2, Gurugram, Haryana 122002"],
    phoneDisplay: "+91 88263 79666",
    phoneTel: "+918826379666",
    whatsapp: "918826379666",
    hours: "Mon – Sun: 10:00 AM – 8:00 PM",
    mapsLink: "https://maps.google.com/?q=Second+Floor+A-14+9+Golf+Course+Road+DLF+Phase+2+Gurugram+122002",
    directionsUrl:
      "https://maps.google.com/?q=Second+Floor+A-14+9+Golf+Course+Road+DLF+Phase+2+Gurugram+122002",
    mapEmbedSrc:
      "https://www.google.com/maps?q=Second+Floor+A-14+9+Golf+Course+Road+DLF+Phase+2+Gurugram+122002&output=embed",
    googleReviewsUrl: "https://maps.app.goo.gl/ajGKPF5j2XmhFQxA6",
    reviewRating: "5.0 / 5",
    heroBadge: "Trusted in Gurugram",
    heroImage: "/images/gurugram1.webp",
    heroAlt: "Image Clinic — clinic exterior in Gurugram",
    resultImage: "/result/result-7.webp",
    resultAlt: "Before and after skin treatment results at Image Clinic, Gurugram",
  },
  kolkata: {
    slug: "kolkata",
    name: "Image Clinic",
    area: "Kolkata",
    location: "Kolkata",
    place: "Kolkata",
    pageTitle: "Hair & Skin Clinic in Kolkata",
    description:
      "Advanced hair, skin and aesthetic treatments at Image Clinic in Kolkata. Call or WhatsApp us to book a consultation.",
    address: "Clinic address to be announced, Kolkata, West Bengal",
    addressStreet: "Kolkata",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "",
    addressLines: ["Clinic address to be announced", "Kolkata, West Bengal"],
    phoneDisplay: "+91 98308 36666",
    phoneTel: "+919830836666",
    whatsapp: "919830836666",
    hours: "Mon – Sun: 10:00 AM – 8:00 PM",
    mapsLink: "",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kolkata%2C%20West%20Bengal",
    mapEmbedSrc: "https://www.google.com/maps?q=Kolkata%2C%20West%20Bengal&output=embed",
    googleReviewsUrl: "",
    reviewRating: "",
    heroBadge: "Now serving Kolkata",
    heroImage: "/images/kolkata.webp",
    heroAlt: "Image Clinic serving Kolkata",
    resultImage: "/result/result-7.webp",
    resultAlt: "Before and after skin treatment results at Image Clinic",
  },
};

/** Generic brand config used on the home page (both branches). */
export const HOME_BRAND: BranchConfig = {
  ...BRANCHES["greater-kailash"],
  area: "Image Clinic",
  location: "Image Clinic",
  pageTitle: "Image Clinic — Best Hair & Skin Treatment in Image Clinic",
  description:
    "Advanced skin, hair and aesthetic care at Image Clinic with doctor-led treatment plans for natural, confident results.",
  address: "Greater Kailash · Gurugram",
  mapsLink: "https://maps.google.com/?q=Image+Clinic+Greater+Kailash+New+Delhi",
  heroBadge: "Trusted Care at Image Clinic",
  heroImage: "/images/gurugram1.webp",
  heroAlt: "Image Clinic — best hair and skin clinic in Delhi and Gurugram",
};

/** Returns the branch for a real branch slug, or undefined for anything else. */
export function findBranch(slug?: string): BranchConfig | undefined {
  return slug && Object.prototype.hasOwnProperty.call(BRANCHES, slug)
    ? BRANCHES[slug as BranchSlug]
    : undefined;
}

export function getBranchBySlug(slug?: string): BranchConfig {
  return findBranch(slug) ?? HOME_BRAND;
}

export function getBranchFromPathname(pathname: string): BranchConfig {
  return getBranchBySlug(pathname.split("/").filter(Boolean)[0]);
}
