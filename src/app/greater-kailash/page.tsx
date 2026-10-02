import type { Metadata } from "next";
import Script from "next/script";
import { BRANCHES } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = BRANCHES["greater-kailash"];

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: { canonical: `https://www.imageclinicindia.co/${branch.slug}` },
  openGraph: {
    title: `${branch.pageTitle} | Image Clinic`,
    description: branch.description,
    url: `https://www.imageclinicindia.co/${branch.slug}`,
    siteName: "Image Clinic",
    images: ["/opengraph-image"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${branch.pageTitle} | Image Clinic`,
    description: branch.description,
    images: ["/opengraph-image"],
  },
};

export default function GreaterKailashPage() {
  return (
    <>
      <Script id="google-ads-phone-conversion-greater-kailash" strategy="afterInteractive">
        {`gtag('config', 'AW-18265778948/kAB5CIv9_o0dEITW5oVE', {
          'phone_conversion_number': '+917044107484'
        });`}
      </Script>
      <BranchPage branch={branch} />
    </>
  );
}
