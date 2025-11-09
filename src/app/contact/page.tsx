

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Contact - Mohammed Al Waili",
  description: "Get in touch for software development projects, consulting, or collaboration opportunities. Available for mobile and web development work.",
  openGraph: {
    title: "Contact - Mohammed Al Waili",
    description: "Get in touch for software development projects and collaboration opportunities",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact - Mohammed Al Waili",
    description: "Get in touch for software development projects",
  },
  keywords: ["Contact", "Hire Developer", "Software Development", "Freelance", "Consulting", "Collaboration"],
};

export default async function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/contact`);
  const data = await response.json();
  const { phone, email, address, form_title, form_description } = data.data;
  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <ContactForm form_title={form_title} form_description={form_description} />
          </div>

          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              <li className="flex items-center gap-6">
                <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                  <div className="text-[28px]"><FaPhoneAlt /></div>
                </div>
                <div className="flex-1">
                  <p className="text-white/60">Phone</p>
                  <h3 className="text-xl">{phone}</h3>
                </div>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                  <div className="text-[28px]"><FaEnvelope /></div>
                </div>
                <div className="flex-1">
                  <p className="text-white/60">Email</p>
                  <h3 className="text-xl">{email}</h3>
                </div>
              </li>
              <li className="flex items-center gap-6">
                <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                  <div className="text-[28px]"><FaMapMarkerAlt /></div>
                </div>
                <div className="flex-1">
                  <p className="text-white/60">Address</p>
                  <h3 className="text-xl">{address}</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
