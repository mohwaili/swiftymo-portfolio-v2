'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"

import { BsArrowRight, BsArrowUpRight, BsGithub } from 'react-icons/bs'

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper as SwiperType } from 'swiper/types'

const projects = [
  {
    num: '01',
    category: 'Web Development',
    title: 'project 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    stack: [
      { name: 'Html5' }, { name: 'Css3' }, { name: 'Javascript' }
    ],
    image: '/assets/work/thumb1.png',
    live: '',
    github: ""
  },
  {
    num: '02',
    category: 'Mobile Development',
    title: 'project 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    stack: [
      { name: 'Swift' }, { name: 'Kotlin' }, { name: 'React Native' }
    ],
    image: '/assets/work/thumb2.png',
    live: '',
    github: ""
  },
  {
    num: '03',
    category: 'Deployment',
    title: 'project 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    stack: [
      { name: 'AWS' }, { name: 'Docker' }, { name: 'Kubernetes' }
    ],
    image: '/assets/work/thumb3.png',
    live: '',
    github: ""
  },
]

export default function Page() {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex])
  }
  return (
    <motion.section initial={{ opacity: 0 }}
    animate={{
      opacity: 1
    }}
    className='min-h-[80vh] flex flex-col justify-center py-12 xl:py-0'
    >
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
          <div className='w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none gap-6 xl:gap-0'>
            <div className='flex flex-col gap-[30px]'>
              <div className='text-8xl leading-none font-extrabold  text-transparent text-outline'>{project.num}</div>
            </div>
            <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize'>{project.category} project</h2>
            <p className='text-white/60'>{project.description}</p>
            <ul className='flex gap-4'>
              {project.stack.map((item, index) => (
                <li key={index} className='text-xl text-accent'>
                  {item.name}
                  {index !== project.stack.length - 1 && ","}
                </li>
              ))}
            </ul>
            <div className='border border-white/20' />
            <div className='flex items-center gap-4'>
              <Link href={project.live}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                      <BsArrowUpRight className='text-white text-3xl group-hover:text-accent' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
              <Link href={project.github}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                      <BsGithub className='text-white text-3xl group-hover:text-accent' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github Repository</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
          </div>
          <div className='w-full xl:w-[50%]'>
            <Swiper spaceBetween={30} slidesPerView={1} className='xl:h-[520px] mb-12' onSlideChange={handleSlideChange}>
              {projects.map((project, index) => (
                <SwiperSlide key={index} className='w-full'>
                  <div className='h-[460px] relative group flex justify-center items-center bg-pink-50/20'>
                  <div></div>
                  <div className='relative w-full h-full'>
                    <Image src={project.image} fill className='object-cover' alt={project.title} />
                  </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
