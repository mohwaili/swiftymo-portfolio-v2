import React from 'react'
import ProjectsCarousel from './ProjectsCarousel';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects & Work - Mohammed Al Waili",
  description: "Portfolio of projects and work showcasing mobile and web applications built with modern technologies including Swift, Kotlin, React, and Next.js.",
  openGraph: {
    title: "Projects & Work - Mohammed Al Waili",
    description: "Portfolio of projects showcasing mobile and web applications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Work - Mohammed Al Waili",
    description: "Portfolio of projects showcasing mobile and web applications",
  },
  keywords: ["Portfolio", "Projects", "Mobile Apps", "Web Applications", "iOS Apps", "Android Apps", "React Projects", "Next.js Projects"],
};

export interface ImageModel {
  url: string;
  alternativeText: string;
}
export interface Project {
  title: string;
  description: string;
  stack: string[];
  image: ImageModel;
  url?: string;
}

interface ApiProjectItem {
  title: string;
  description: string;
  stack: string[];
  image: ImageModel;
  url?: string;
}

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/work`);
  const data = await response.json();
  const projects: Project[] = data.data.items.map((item: ApiProjectItem) => {
    return {
      title: item.title,
      description: item.description,
      stack: item.stack,
      image: item.image as ImageModel,
      url: item.url,
    };
  });

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
}
