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

const SITE_URL = "https://www.imageclinicindia.co/";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C9A13B",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Image Clinic | Hair & Skin Clinic in Delhi and Gurugram",
    template: "%s | Image Clinic",
  },
  description:
    "Doctor-led hair, skin and aesthetic treatments at Image Clinic in Greater Kailash, Delhi, Gurugram and Kolkata. Explore services, real results and clinic locations.",
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
    title: "Image Clinic | Hair & Skin Clinic in Delhi, Gurugram and Kolkata",
    description:
      "Doctor-led hair, skin and aesthetic treatments at Image Clinic in Greater Kailash, Delhi, Gurugram and Kolkata.",
    url: SITE_URL,
    siteName: "Image Clinic",
    images: ["/opengraph-image"],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Image Clinic | Hair & Skin Clinic in Delhi, Gurugram and Kolkata",
    description:
      "Doctor-led hair, skin and aesthetic treatments at Image Clinic in Greater Kailash, Delhi, Gurugram and Kolkata.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Image Clinic",
  url: SITE_URL,
  logo: `${SITE_URL}images/image_clinic_logo-1.webp`,
  sameAs: [
    "https://www.instagram.com/imageclinicindia/",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
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
