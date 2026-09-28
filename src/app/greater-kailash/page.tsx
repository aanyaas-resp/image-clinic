import type { Metadata } from "next";
import { BRANCHES } from "@/data/branches";
import BranchPage from "@/components/branch/BranchPage";

const branch = BRANCHES["greater-kailash"];

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: { canonical: `https://www.imageclinic.in/${branch.slug}` },
};

export default function GreaterKailashPage() {
  return <BranchPage branch={branch} />;
}
