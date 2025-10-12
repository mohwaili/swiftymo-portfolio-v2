'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import SwiftBirdLogo from './SwiftBirdLogo'

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
    const [isMounted, setIsMounted] = useState(false);
    const [birdOffset, setBirdOffset] = useState({ x: 0, y: -40 });
    const [prevPath, setPrevPath] = useState(pathname);
    const [isInitialized, setIsInitialized] = useState(false);
    const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const navContainerRef = useRef<HTMLElement>(null);
    const animationTimer = useRef<NodeJS.Timeout | null>(null);

    // Handle client-side mounting
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Function to update bird position relative to nav container
    const updateBirdPosition = () => {
        const activeIndex = links.findIndex(link => link.path === pathname);
        const targetIndex = activeIndex !== -1 ? activeIndex : 0;
        
        const navElement = navRefs.current[targetIndex];
        const container = navContainerRef.current;
        
        if (navElement && container) {
            const navRect = navElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            setBirdOffset({
                x: navRect.left - containerRect.left + navRect.width / 2 - 20,
                y: -40,
            });
        }
    };

    // Initialize bird position on mount
    useEffect(() => {
        if (!isInitialized && navRefs.current[0]) {
            updateBirdPosition();
            setIsInitialized(true);
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
            
            updateBirdPosition();

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
    <nav ref={navContainerRef} className='flex gap-8 relative'>
        {links.map((link, index) => (
            <Link
                href={link.path}
                key={index}
                ref={(el) => { navRefs.current[index] = el; }}
                className={`${
                    link.path === pathname && "text-accent"
                } capitalize font-medium hover:text-accent transition-all relative z-10`}
            >
                {link.name}
            </Link>
        ))}

        {/* Swift Bird - Stays on active nav item */}
        {isMounted && (
          <motion.div
            key={pathname}
            className="absolute pointer-events-none"
            style={{
              zIndex: 1000,
              left: 0,
              top: 0,
            }}
            initial={false}
            animate={{
              x: birdOffset.x,
              y: birdOffset.y,
              scale: isAnimating ? [0, 1.5, 0.8, 0.6] : 0.6,
              rotate: isAnimating ? [-180, 0, 10, 0] : 0,
            }}
            transition={{
              duration: isAnimating ? 0.8 : 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
              <SwiftBirdLogo 
                width="40px" 
                height="40px" 
                gradientId="swift-gradient-nav"
                animate={true}
                isAnimating={isAnimating}
              />
            </motion.div>
          )}
    </nav>
  )
}
