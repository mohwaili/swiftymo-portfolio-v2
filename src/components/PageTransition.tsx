"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            duration: 0.3,
            delay: 0.8, // Delay page content until portal expands
            ease: "easeOut"
          }
        }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: "easeIn"
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
