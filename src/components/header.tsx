import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import Nav from './nav'

export default function header() {
  return (
    <header className='py-8 xl:py-12 text-white'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link href='/'>
                <h1 className='text-4xl font-semibold'>
                    Swiftymo<span className='text-accent'>.</span>
                </h1>
            </Link>
            
            {/* Desktop Nav */}
            <div className='hidden xl:flex items-center gap-8'>
                <Nav />
                <Link href='/contact'>
                    <Button>Hire me</Button>
                </Link>
            </div>

            {/* Mobile Nav */}
            <div className='xl:hidden'>
                mobile nav
            </div>
        </div>
    </header>
  )
}
