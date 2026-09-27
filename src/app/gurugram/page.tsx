import type { Metadata } from "next";
import BranchLandingPage from "@/components/BranchLandingPage";
import { BRANCHES } from "@/data/branches";

const branch = BRANCHES.gurugram;

export const metadata: Metadata = {
  title: branch.pageTitle,
  description: branch.description,
  alternates: {
    canonical: `/gurugram`,
  },
};

export default function GurugramPage() {
  return <BranchLandingPage slug="gurugram" />;
}
