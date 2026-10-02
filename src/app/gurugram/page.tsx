import type { Metadata } from "next";
import Script from "next/script";
import { BRANCHES } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = BRANCHES["gurugram"];

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

export default function GurugramPage() {
  return (
    <>
      <Script id="google-tag-manager-gurugram" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M249T6H5');`}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18265778948"
        strategy="afterInteractive"
      />
      <Script id="google-tag-gurugram" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18265778948');
        `}
      </Script>
      <Script id="google-ads-phone-conversion" strategy="afterInteractive">
        {`gtag('config', 'AW-18265778948/Lj4hCMSK7o0dEITW5oVE', {
          'phone_conversion_number': '+918826379666'
        });`}
      </Script>
      <BranchPage branch={branch} />
    </>
  );
}
