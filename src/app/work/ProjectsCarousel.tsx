"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight } from "react-icons/bs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper/types";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { Project } from "./page";

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [project, setProject] = useState(projects[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;
    setCurrentIndex(currentIndex);
    setProject(projects[currentIndex]);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:gap-[30px]">
      <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none gap-6 xl:gap-0">
        <div className="flex flex-col gap-[30px]">
          <div className="text-8xl leading-none font-extrabold  text-transparent text-outline">
            {currentIndex + 1}
          </div>
        </div>
        <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
          {project.title}
        </h2>
        <p className="text-white/60">{project.description}</p>
        <ul className="flex flex-wrap gap-4">
          {project.stack.map((item, index) => (
            <li key={index} className="text-xl text-accent">
              {item}
              {index !== project.stack.length - 1 && ","}
            </li>
          ))}
        </ul>
        <div className="border border-white/20" />
        <div className="flex items-center gap-4">
          {project.url && (
            <Link href={project.url} target="_blank">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                  <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Live project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          )}
        </div>
      </div>
      <div className="w-full xl:w-[50%]">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          className="xl:h-[520px] mb-12"
          onSlideChange={handleSlideChange}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                <div className="relative w-full h-full">
                  <Image
                    src={project.image.url}
                    fill
                    className="object-cover"
                    alt={project.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          {projects.length > 1 && (
          <WorkSliderBtns
            containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
            btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
            iconsStyles=""
          />
          )}
        </Swiper>
      </div>
    </div>
  );
}
