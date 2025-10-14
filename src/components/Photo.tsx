"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Photo() {
  return (
    <div className="w-full h-full relative flex items-center justify-center perspective-1000">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.2,
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
        className="relative w-[298px] h-[298px] xl:w-[498px] xl:h-[498px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
            src="/assets/photo.jpg"
            priority
            quality={100}
            fill
            alt="photo"
            className="object-cover rounded-full"
          />

        {/* Orbiting ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent/40"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            borderStyle: "solid",
          }}
        />
      </motion.div>
    </div>
  );
}
