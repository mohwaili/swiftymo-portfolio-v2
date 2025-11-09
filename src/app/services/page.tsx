
import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Mobile Development",
    description:
      "I build modern, user-friendly applications using Swift, SwiftUI, and UIKit. I enjoy solving complex problems with clean, maintainable code and places strong value on testing to ensure quality.",
    link: "/services/mobile-development",
  },
  {
    num: "02",
    title: "Web Development",
    description:
      "I create beautiful and functional websites using modern technologies and best practices.",
    link: "/services/web-development",
  },
  {
    num: "03",
    title: "Deployment",
    description:
      "I deploy your mobile apps to the App Store and TestFlight and web apps to the cloud using modern technologies like AWS.",
    link: "/services/deployment",
  },
];

interface Service {
  title: string;
  description: string;
}

export default async function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/service?populate[items]=true`);
  const data = await response.json();
  const services: Service[] = data.data.items;
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service: Service, index: number) => (
            <div
              key={index}
              className="flex flex-col flex-1 justify-center gap-6 group"
            >
              <div className="w-full flex justify-between items-center">
                <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                  { index + 1 }
                </div>
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                {service.title}
              </h2>
              <p>{service.description}</p>
              <div className="border-b border-white/20 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
