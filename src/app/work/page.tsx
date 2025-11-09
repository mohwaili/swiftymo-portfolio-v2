import React from 'react'
import ProjectsCarousel from './ProjectsCarousel';

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

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/work`);
  const data = await response.json();
  const projects: Project[] = data.data.items.map((item: any) => {
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
