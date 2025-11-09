import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          {/* Icon */}
          <div className="w-[100px] h-[100px] xl:w-[120px] xl:h-[120px] bg-[#27272c] text-accent rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-[50px] xl:text-[60px]" />
          </div>
          
          {/* 404 Text */}
          <div>
            <h1 className="text-[80px] xl:text-[120px] font-bold leading-none mb-4">
              <span className="text-accent">404</span>
            </h1>
            <h2 className="text-2xl xl:text-4xl font-semibold mb-4">
              Page Not Found
            </h2>
            <p className="max-w-[600px] text-white/60 mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button
                size="lg"
                className="flex items-center gap-2"
              >
                <FaHome className="text-xl" />
                <span>Go Home</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <span>Contact</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
