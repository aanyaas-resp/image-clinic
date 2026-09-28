import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Italiana } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";

// Cormorant Garamond — soft, candlelit serif for headings/logo type.
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-family",
  display: "swap",
});

// Jost — clean geometric sans for body copy & UI.
const sansFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});

// Italiana — slender, luxury small-caps face for eyebrows / kicker labels only.
const accentFont = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent-family",
  display: "swap",
});

const SITE_URL = "https://www.imageclinic.in/";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C9A13B",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Image Clinic | Hair, Skin & Aesthetic Care in Kailash Garden and Gurugram",
    template: "%s | Image Clinic",
  },
  description:
    "Image Clinic offers advanced hair, skin and aesthetic care in Kailash Garden and Gurugram with doctor-led treatments and personalised care.",
  keywords: [
    "Image Clinic",
    "hair clinic Kailash Garden",
    "skin clinic Gurugram",
    "aesthetic clinic Delhi",
    "hair treatment Delhi",
    "skin care Kailash Garden",
    "dermatology clinic Gurugram",
  ],
  icons: {
    icon: "/images/image_clinic_logo-1.webp",
    shortcut: "/images/image_clinic_logo-1.webp",
    apple: "/images/image_clinic_logo-1.webp",
  },
  openGraph: {
    title: "Image Clinic | Hair, Skin & Aesthetic Care in Kailash Garden and Gurugram",
    description:
      "Image Clinic combines expert-led dermatology, hair care and aesthetic treatments to deliver modern, personalised results in Delhi and Gurugram.",
    url: SITE_URL,
    siteName: "Image Clinic",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Image Clinic | Hair, Skin & Aesthetic Care in Kailash Garden and Gurugram",
    description:
      "Image Clinic combines expert-led dermatology, hair care and aesthetic treatments to deliver modern, personalised results in Delhi and Gurugram.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Image Clinic",
  image: `${SITE_URL}og-image.png`,
  telephone: "+91-7044107484",
  address: {
    "@type": "PostalAddress",
    streetAddress: "E-84, Hansraj Gupta Road, Greater Kailash-1",
    addressLocality: "New Delhi",
    addressRegion: "DL",
    postalCode: "110048",
    addressCountry: "IN",
  },
  url: SITE_URL,
  sameAs: [
    "https://www.instagram.com/imageclinicindia/",
    "https://www.google.com/maps/search/?api=1&query=Image+Clinic+Greater+Kailash+New+Delhi",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:30",
      closes: "20:30",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${displayFont.variable} ${sansFont.variable} ${accentFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18375995180"
          strategy="lazyOnload"
        />
        <Script id="google-tag" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18375995180');
          `}
        </Script>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        {/* Root level so it stays fixed; only shows on branch pages (see component). */}
        <FloatingContactButtons />
      </body>
    </html>
  );
}