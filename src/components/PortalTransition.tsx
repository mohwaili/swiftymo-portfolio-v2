"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PortalTransition({ children }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {children}
        </motion.div>

        {/* Portal Overlay */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 30], opacity: [0, 1, 0] }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <div className="w-20 h-20 rounded-full relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--accent) 0%, var(--accent-hover) 100%)',
                boxShadow: '0 0 50px var(--accent)',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, var(--accent-hover) 360deg)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}