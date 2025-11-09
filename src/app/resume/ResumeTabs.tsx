"use client";

import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";

// Import all icons from react-icons/fa
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";

// Helper function to get icon component dynamically
const getIconComponent = (iconName: string): React.ElementType | null => {
  // Try different icon libraries
  const allIcons = { ...FaIcons, ...Fa6Icons, ...SiIcons, ...DiIcons, ...RiIcons, ...GrIcons };
  return (allIcons as Record<string, React.ElementType>)[iconName] || null;
};

export interface Experience {
    period: string;
    position: string;
    company: string;
    achievements: string[];
}

export interface Education {
    period: string;
    field_of_study: string;
    institution: string;
}

export interface Skill {
    icon: string;
    title: string;
}

export interface Info {
    fieldName: string;
    fieldValue: string;
}
export default function ResumeTabs({ experience, education, skills, info }: { experience: Experience[], education: Education[], skills: Skill[], info: Info[] }) {
  return (
    <Tabs className="flex flex-col xl:flex-row gap-[60px]" defaultValue="experience">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience"> Experience</TabsTrigger>
            <TabsTrigger value="education"> Education</TabsTrigger>
            <TabsTrigger value="skills"> Skills</TabsTrigger>
            <TabsTrigger value="about"> About me</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            {/* Experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">My Experience</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                Throughout my career as a software engineer, I have acquired extensive experience working with leading companies on complex and innovative projects. My roles have allowed me to develop and deliver scalable solutions, lead technical teams, and contribute to products that impact thousands of users. I am passionate about leveraging modern technologies and my expertise to solve real-world problems and drive continuous improvement in every environment I join.
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.map((item: Experience, index: number) => (
                      <li
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent">{item.period}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p>{item.company}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* Education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">My Education</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                During my academic journey at the University of Amsterdam, I developed a strong foundation in computer science principles and honed my problem-solving skills through rigorous coursework and hands-on projects. My education empowered me to work with diverse programming languages, data structures, and system architectures, fostering both analytical thinking and practical expertise. The experiences and knowledge I gained continue to shape my approach to building efficient and impactful technology solutions.
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.map((item: Education, index: number) => (
                      <li
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent">{item.period}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {item.field_of_study}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p>{item.institution}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* Skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">My Skills</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  I have developed a broad and versatile skill set as a software engineer, mastering both frontend and backend technologies. My proficiency in languages such as Swift, Kotlin, and TypeScript enables me to create performant applications across multiple platforms. I am adept at using modern frameworks like SwiftUI and Next.js, and have hands-on experience implementing scalable solutions with AWS and integrating systems with GraphQL and Strapi. My continuous pursuit of learning new tools and technologies ensures I deliver efficient and innovative results in every project.
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-[30px]">
                  {skills.map((skill: Skill, index: number) => {
                    const IconComponent = getIconComponent(skill.icon);
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {IconComponent ? <IconComponent /> : null}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
            {/* About me */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">About me</h3>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {info.map((item: Info, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-center xl:justify-start gap-4"
                    >
                      <span className="text-white/60">{item.fieldName}</span>
                      <span className="text-xl">{item.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
  )
}
