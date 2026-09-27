import type { Metadata } from "next";
import BranchLandingPage from "@/components/BranchLandingPage";
import { BRANCHES } from "@/data/branches";

const branch = BRANCHES["greater-kailash"];

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: {
    canonical: `/greater-kailash`,
  },
};

export default function GreaterKailashPage() {
  return <BranchLandingPage slug="greater-kailash" />;
}
