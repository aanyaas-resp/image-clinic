import type { Metadata } from "next";
import { BRANCHES } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = BRANCHES.kolkata;

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

export default function KolkataPage() {
  return <BranchPage branch={branch} />;
}
