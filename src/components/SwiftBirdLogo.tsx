import { motion } from 'framer-motion'

interface SwiftBirdLogoProps {
  width?: string
  height?: string
  gradientId?: string
  animate?: boolean
  isAnimating?: boolean
}

export default function SwiftBirdLogo({ 
  width = "40px", 
  height = "40px", 
  gradientId = "swift-gradient",
  animate = false,
  isAnimating = false
}: SwiftBirdLogoProps) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="-3.2 -3.2 38.40 38.40"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="relative"
      animate={animate && isAnimating ? {
        rotate: [0, -10, 5, 0],
      } : {}}
      transition={{
        duration: 0.3,
        delay: 0.7,
        ease: "easeInOut",
      }}
    >
      <defs>
        <linearGradient 
          id={gradientId} 
          x1="-134.494" 
          y1="-171.82" 
          x2="-134.497" 
          y2="-171.89" 
          gradientTransform="matrix(240, 0, 0, -205.6, 32295, -35312.585)" 
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f88535"></stop>
          <stop offset="1" stopColor="#fd2221"></stop>
        </linearGradient>
      </defs>
      <path
        d="M19.422,4.007s6.217,3.554,7.844,9.2c1.466,5.1.292,7.534.292,7.534a8.915,8.915,0,0,1,1.742,2.8,4.825,4.825,0,0,1,.29,4.453s-.1-2.08-3.2-2.511c-2.841-.4-3.874,2.366-9.3,2.232A18.435,18.435,0,0,1,2,19.354C4.651,20.8,8.124,23.045,12.449,22.7s5.228-1.674,5.228-1.674A66.9,66.9,0,0,1,4.891,7.643c3.4,2.845,11.822,8.507,11.626,8.363A75.826,75.826,0,0,1,8.092,6.24S20.728,16.629,21.745,16.563c.418-.861,2.579-5.318-2.324-12.557Z"
        fill={`url(#${gradientId})`}
      />
    </motion.svg>
  )
}

