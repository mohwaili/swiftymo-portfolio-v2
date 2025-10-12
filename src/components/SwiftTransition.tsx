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
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
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
              {/* Rotating ring behind logo */}
              <motion.div
                className="absolute w-64 h-64 rounded-full border-4 border-white/30"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Swift Bird Logo */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
                className="w-48 h-48 text-white relative z-10"
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
                <motion.path
                  fill="currentColor"
                  d="M1522 127q82 0 155 31t127 86t85 127t32 155v994q0 83-31 155t-86 127t-127 85t-155 32H528q-83 0-155-31t-127-86t-86-126t-32-156V526q0-83 31-155t86-127t127-85t156-32zm125 1466q5 0 8-9t5-22t2-22t1-12q0-80-31-156t-82-138q11-38 16-78t6-81q0-106-34-208t-92-192t-137-165t-167-128q72 97 116 212t44 237q0 51-9 100t-27 98q-7-5-13-8t-14-8q-48-26-93-60t-90-68q-112-84-217-174T634 521q-5-4-8-10t-6-10t-7-8t-11-4q0 4 17 28t43 60t58 75t58 76t49 62t26 32q33 40 67 78t69 77q-63-35-121-77t-116-85q-81-60-159-123T439 560q17 28 36 53t39 50q64 80 130 158t135 154t143 145t156 133q-65 39-138 57t-148 19q-130 0-254-47t-229-123q57 92 137 170t176 136t201 89t217 33q72 0 141-15t133-49q38-20 75-34t81-14q63 0 102 30t70 83q2 5 5 5"
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

              {/* Expanding circles */}
              <motion.div
                className="absolute w-32 h-32 rounded-full border-2 border-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3, 4],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute w-32 h-32 rounded-full border-2 border-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3, 4],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.5,
                  ease: "easeOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}