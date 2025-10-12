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
    const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (prevPath !== pathname) {
            setIsAnimating(true);
            
            const activeIndex = links.findIndex(link => link.path === pathname);
            if (activeIndex !== -1 && navRefs.current[activeIndex]) {
                const element = navRefs.current[activeIndex];
                const rect = element?.getBoundingClientRect();
                if (rect) {
                    setBirdPosition({
                        x: rect.left + rect.width / 2 - 15, // Center the bird
                        y: rect.top - 35, // Position above the text
                    });
                }
            }

            const timer = setTimeout(() => {
                setIsAnimating(false);
                setPrevPath(pathname);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [pathname, prevPath]);

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
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
              <motion.path
                d="M17.09,19.72a9.92,9.92,0,0,1-8.86.1A13.81,13.81,0,0,1,2,14.5a11.2,11.2,0,0,0,2.3,1.4c3.37,1.57,6.73,1.46,9.1,0A48.49,48.49,0,0,1,5,7.19,10,10,0,0,1,3.91,5.68c8.28,6.05,7.92,7.59,2.41-1a57,57,0,0,0,9.43,7.74l.36.22a6.48,6.48,0,0,0,.26-.78A10.53,10.53,0,0,0,14.29,3c4.55,2.75,7.25,7.91,6.12,12.24a1.09,1.09,0,0,0-.05.39c2.24,2.83,1.64,5.78,1.35,5.22-1.21-2.39-3.48-1.65-4.62-1.17Z"
                fill="var(--accent)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  filter: "drop-shadow(0 0 8px var(--accent))",
                }}
              />
            </motion.svg>


          </motion.div>
        )}
    </>
  )
}
