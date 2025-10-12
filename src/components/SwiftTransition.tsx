"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function SwiftTransition({ children }: Props) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Hide overlay after 1 second

    return () => clearTimeout(timer);
  }, [pathname]);

  // Create particles around the logo
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i * Math.PI * 2) / 20,
    distance: 100 + Math.random() * 50,
  }));

  return (
    <>
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Transition Overlay - Only show when transitioning */}
      {isTransitioning && (
        <style jsx global>{`
          html, body {
            overflow: hidden !important;
            max-width: 100vw !important;
          }
        `}</style>
      )}
      
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            style={{ maxWidth: '100vw', maxHeight: '100vh' }}
          >
            {/* Animated Background with gradient sweep */}
            <motion.div
              className="absolute inset-0"
              initial={{ 
                background: `conic-gradient(from 0deg at 50% 50%, var(--accent) 0deg, var(--accent-hover) 180deg, var(--accent) 360deg)`
              }}
              animate={{ 
                background: [
                  `conic-gradient(from 0deg at 50% 50%, var(--accent) 0deg, var(--accent-hover) 180deg, var(--accent) 360deg)`,
                  `conic-gradient(from 360deg at 50% 50%, var(--accent) 0deg, var(--accent-hover) 180deg, var(--accent) 360deg)`,
                ]
              }}
              transition={{ 
                duration: 0.8,
                ease: "linear"
              }}
            />

            {/* Particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: Math.cos(particle.angle) * particle.distance,
                    y: Math.sin(particle.angle) * particle.distance,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.2 + (particle.id * 0.02),
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            {/* Swift Logo Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Swift Bird Logo */}
              <motion.svg
                width="131px"
                height="131px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                initial={{ 
                  scale: 0, 
                  rotate: -180,
                  x: -200,
                  y: 100
                }}
                animate={{ 
                  scale: [0, 1.3, 1], 
                  rotate: [-180, 10, 0],
                  x: [-200, 20, 0],
                  y: [100, -10, 0]
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.34, 1.56, 0.64, 1],
                  times: [0, 0.6, 1]
                }}
              >
                <rect width="24" height="24" fill="none"></rect>
                <motion.path
                  d="M17.09,19.72a9.92,9.92,0,0,1-8.86.1A13.81,13.81,0,0,1,2,14.5a11.2,11.2,0,0,0,2.3,1.4c3.37,1.57,6.73,1.46,9.1,0A48.49,48.49,0,0,1,5,7.19,10,10,0,0,1,3.91,5.68c8.28,6.05,7.92,7.59,2.41-1a57,57,0,0,0,9.43,7.74l.36.22a6.48,6.48,0,0,0,.26-.78A10.53,10.53,0,0,0,14.29,3c4.55,2.75,7.25,7.91,6.12,12.24a1.09,1.09,0,0,0-.05.39c2.24,2.83,1.64,5.78,1.35,5.22-1.21-2.39-3.48-1.65-4.62-1.17Z"
                  initial={{ 
                    pathLength: 0,
                    fill: "rgba(255, 255, 255, 0)"
                  }}
                  animate={{ 
                    pathLength: [0, 1, 1],
                    fill: [
                      "rgba(255, 255, 255, 0)", 
                      "rgba(255, 255, 255, 1)",
                      "rgba(255, 255, 255, 1)"
                    ]
                  }}
                  transition={{ 
                    duration: 0.8,
                    times: [0, 0.5, 1],
                    ease: "easeInOut"
                  }}
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))"
                  }}
                />
              </motion.svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}