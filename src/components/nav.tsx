'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'services',
        path: '/services'
    },
    {
        name: 'resume',
        path: '/resume'
    },
    {
        name: 'work',
        path: '/work'
    },
    {
        name: 'contact',
        path: '/contact'
    }
]

export default function Nav() {
    const pathname = usePathname();
    const [isAnimating, setIsAnimating] = useState(false);
    const [showBird, setShowBird] = useState(true);
    const [birdPosition, setBirdPosition] = useState({ x: 0, y: 0 });
    const [prevPath, setPrevPath] = useState(pathname);
    const [isInitialized, setIsInitialized] = useState(false);
    const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const animationTimer = useRef<NodeJS.Timeout | null>(null);

    // Initialize bird position on mount
    useEffect(() => {
        if (!isInitialized && navRefs.current[0]) {
            const activeIndex = links.findIndex(link => link.path === pathname);
            const targetIndex = activeIndex !== -1 ? activeIndex : 0;
            
            const element = navRefs.current[targetIndex];
            const rect = element?.getBoundingClientRect();
            if (rect) {
                setBirdPosition({
                    x: rect.left + rect.width / 2 - 15,
                    y: rect.top - 35,
                });
                setIsInitialized(true);
            }
        }
    }, [navRefs.current[0], isInitialized, pathname]);

    // Handle path changes
    useEffect(() => {
        if (isInitialized && prevPath !== pathname) {
            // Clear any existing timer to allow interruption
            if (animationTimer.current) {
                clearTimeout(animationTimer.current);
            }
            
            // Update prevPath immediately to allow quick successive clicks
            setPrevPath(pathname);
            setIsAnimating(true);
            
            const activeIndex = links.findIndex(link => link.path === pathname);
            if (activeIndex !== -1 && navRefs.current[activeIndex]) {
                const element = navRefs.current[activeIndex];
                const rect = element?.getBoundingClientRect();
                if (rect) {
                    setBirdPosition({
                        x: rect.left + rect.width / 2 - 20,
                        y: rect.top - 40,
                    });
                }
            }

            animationTimer.current = setTimeout(() => {
                setIsAnimating(false);
            }, 800);
            
            return () => {
                if (animationTimer.current) {
                    clearTimeout(animationTimer.current);
                }
            };
        }
    }, [pathname, prevPath, isInitialized]);

  return (
    <>
      <nav className='flex gap-8 relative'>
          {links.map((link, index) => (
              <Link
                  href={link.path}
                  key={index}
                  ref={(el) => { navRefs.current[index] = el; }}
                  className={`${
                      link.path === pathname && "text-accent border-b-2 border-accent"
                  } capitalize font-medium hover:text-accent transition-all relative z-10`}
              >
                  {link.name}
              </Link>
          ))}
      </nav>

      {/* Swift Bird - Stays on active nav item */}
      {showBird && (
        <motion.div
          key={pathname}
          className="fixed pointer-events-none"
          style={{
            zIndex: 1000,
            left: 0,
            top: 0,
          }}
          initial={false}
          animate={{
            x: birdPosition.x,
            y: birdPosition.y,
            scale: isAnimating ? [0, 1.5, 0.8, 0.6] : 0.6,
            rotate: isAnimating ? [-180, 0, 10, 0] : 0,
          }}
          transition={{
            duration: isAnimating ? 0.8 : 0.3,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >

            {/* Swift Bird */}
            <motion.svg
              width="40px"
              height="40px"
              viewBox="-3.2 -3.2 38.40 38.40"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="relative"
              animate={isAnimating ? {
                rotate: [0, -10, 5, 0],
              } : {}}
              transition={{
                duration: 0.3,
                delay: 0.7,
                ease: "easeInOut",
              }}
            >
              <defs>
                <linearGradient id="swift-gradient" x1="-134.494" y1="-171.82" x2="-134.497" y2="-171.89" gradientTransform="matrix(240, 0, 0, -205.6, 32295, -35312.585)" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f88535"></stop>
                  <stop offset="1" stopColor="#fd2221"></stop>
                </linearGradient>
              </defs>
              <motion.path
                d="M19.422,4.007s6.217,3.554,7.844,9.2c1.466,5.1.292,7.534.292,7.534a8.915,8.915,0,0,1,1.742,2.8,4.825,4.825,0,0,1,.29,4.453s-.1-2.08-3.2-2.511c-2.841-.4-3.874,2.366-9.3,2.232A18.435,18.435,0,0,1,2,19.354C4.651,20.8,8.124,23.045,12.449,22.7s5.228-1.674,5.228-1.674A66.9,66.9,0,0,1,4.891,7.643c3.4,2.845,11.822,8.507,11.626,8.363A75.826,75.826,0,0,1,8.092,6.24S20.728,16.629,21.745,16.563c.418-.861,2.579-5.318-2.324-12.557Z"
                fill="url(#swift-gradient)"
              />
            </motion.svg>


          </motion.div>
        )}
    </>
  )
}
