'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CiMenuFries } from 'react-icons/ci'

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

export default function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    
    return <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className='flex justify-center items-center'>
            <CiMenuFries className='text-[32px] text-accent' />
        </SheetTrigger>
        <SheetContent className='flex flex-col p-4'>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className='mt-32 mb-40 text-center text-2xl'>
                <Link href='/' onClick={() => setOpen(false)}>
                    <h1 className='text-4xl font-semibold'>
                        Swiftymo<span className='text-accent'>.</span>
                    </h1>
                </Link>
            </div>
            <nav className='flex flex-col justify-center items-center gap-8'>
                {links.map((link, index) => (
                    <Link 
                    href={link.path} 
                    key={index}
                    onClick={() => setOpen(false)}
                    className={`${link.path === pathname && 'text-accent border-b-2'} text-xl capitalize hover:text-accent transition-all`}>
                        {link.name}
                    </Link>
                ))}
            </nav>
        </SheetContent>
    </Sheet>
}
