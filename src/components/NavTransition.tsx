"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function NavTransition() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [birdPosition, setBirdPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        {isAnimating && isMounted && (
          <motion.div
            className="fixed pointer-events-none z-[100]"
            initial={{
              x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
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
            {/* Swift Bird */}
            <motion.svg
              width="60px"
              height="60px"
              viewBox="-3.2 -3.2 38.40 38.40"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="relative"
            >
              <defs>
                <linearGradient id="swift-gradient-transition" x1="-134.494" y1="-171.82" x2="-134.497" y2="-171.89" gradientTransform="matrix(240, 0, 0, -205.6, 32295, -35312.585)" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f88535"></stop>
                  <stop offset="1" stopColor="#fd2221"></stop>
                </linearGradient>
              </defs>
              <motion.path
                d="M19.422,4.007s6.217,3.554,7.844,9.2c1.466,5.1.292,7.534.292,7.534a8.915,8.915,0,0,1,1.742,2.8,4.825,4.825,0,0,1,.29,4.453s-.1-2.08-3.2-2.511c-2.841-.4-3.874,2.366-9.3,2.232A18.435,18.435,0,0,1,2,19.354C4.651,20.8,8.124,23.045,12.449,22.7s5.228-1.674,5.228-1.674A66.9,66.9,0,0,1,4.891,7.643c3.4,2.845,11.822,8.507,11.626,8.363A75.826,75.826,0,0,1,8.092,6.24S20.728,16.629,21.745,16.563c.418-.861,2.579-5.318-2.324-12.557Z"
                fill="url(#swift-gradient-transition)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
