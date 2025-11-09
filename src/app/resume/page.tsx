import React from "react";
import ResumeTabs from "./ResumeTabs";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Resume - Mohammed Al Waili",
  description: "Professional experience, education, and technical skills. Senior Software Engineer with expertise in mobile and web development using Swift, Kotlin, TypeScript, and modern frameworks.",
  openGraph: {
    title: "Resume - Mohammed Al Waili",
    description: "Professional experience, education, and technical skills of Mohammed Al Waili",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Resume - Mohammed Al Waili",
    description: "Professional experience, education, and technical skills",
  },
  keywords: ["Resume", "CV", "Experience", "Education", "Skills", "Software Engineer", "Swift", "Kotlin", "TypeScript", "React", "Next.js"],
};

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/resume`);
  const data = await response.json();
  const { experiences, educations, skills, info } = data.data;
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <ResumeTabs experience={experiences} education={educations} skills={skills} info={info} />
      </div>
    </div>
  );
}
