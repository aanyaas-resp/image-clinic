import type { Metadata } from "next";
import { BRANCHES } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = BRANCHES["gurugram"];

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: { canonical: `https://www.imageclinic.in/${branch.slug}` },
};

export default function GurugramPage() {
  return <BranchPage branch={branch} />;
}
