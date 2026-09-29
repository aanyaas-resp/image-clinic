import type { Metadata } from "next";
import { BRANCHES } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = BRANCHES["greater-kailash"];

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: { canonical: `https://www.imageclinic.in/${branch.slug}` },
  openGraph: {
    title: `${branch.pageTitle} | Image Clinic`,
    description: branch.description,
    url: `https://www.imageclinic.in/${branch.slug}`,
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
  return <BranchPage branch={branch} />;
}
