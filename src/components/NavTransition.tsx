"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function NavTransition() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [birdPosition, setBirdPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/resume", label: "Resume" },
    { path: "/work", label: "Work" },
    { path: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === pathname);
    if (index !== -1 && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
      
      // Calculate target position
      if (navRef.current) {
        const navItem = navRef.current.children[index] as HTMLElement;
        if (navItem) {
          const rect = navItem.getBoundingClientRect();
          setBirdPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      }

      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, activeIndex]);

  return (
    <>
      {/* Hidden nav reference for position calculation */}
      <div ref={navRef} className="fixed top-0 left-0 pointer-events-none opacity-0">
        {navItems.map((item, index) => (
          <div key={item.path} data-index={index}>
            {item.label}
          </div>
        ))}
      </div>

      {/* Flying Swift Bird */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed pointer-events-none z-[100]"
            initial={{
              x: window.innerWidth / 2,
              y: -100,
              scale: 0,
              rotate: -180,
            }}
            animate={{
              x: birdPosition.x,
              y: birdPosition.y,
              scale: [0, 1.5, 1],
              rotate: [180, 360, 0],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 1.5],
                opacity: [0, 0.6, 0],
              }}
              transition={{ duration: 0.8 }}
              style={{
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Swift Bird */}
            <motion.svg
              width="60px"
              height="60px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="relative"
            >
              <motion.path
                d="M17.09,19.72a9.92,9.92,0,0,1-8.86.1A13.81,13.81,0,0,1,2,14.5a11.2,11.2,0,0,0,2.3,1.4c3.37,1.57,6.73,1.46,9.1,0A48.49,48.49,0,0,1,5,7.19,10,10,0,0,1,3.91,5.68c8.28,6.05,7.92,7.59,2.41-1a57,57,0,0,0,9.43,7.74l.36.22a6.48,6.48,0,0,0,.26-.78A10.53,10.53,0,0,0,14.29,3c4.55,2.75,7.25,7.91,6.12,12.24a1.09,1.09,0,0,0-.05.39c2.24,2.83,1.64,5.78,1.35,5.22-1.21-2.39-3.48-1.65-4.62-1.17Z"
                fill="var(--accent)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  filter: "drop-shadow(0 0 10px var(--accent))",
                }}
              />
            </motion.svg>

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 40,
                  y: Math.sin((i * Math.PI * 2) / 8) * 40,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
